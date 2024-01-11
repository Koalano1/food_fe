import { AiOutlineCloseCircle, AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  message
} from 'antd'
import { ICategory, IProduct, IProductUpload } from '~/types'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { categoryApi, productApi } from '~/apis'
import { handleDeleteProduct, handleUploadImage } from './utils'
import { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

export const ProductFeature = () => {
  const [form] = Form.useForm()
  const [products, setProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [isUpload, setIsUpload] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openDrawer, setOpenDrawer] = useState<IProductUpload>({
    visible: false,
    type: 'create', // create | update
    id: ''
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getProducts()
        setProducts(response.data.data.reverse())
      } catch (error) {
        message.error('Lỗi kết nối đến server')
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const featchCategories = async () => {
      const res = await categoryApi.getCategories()
      if (res.data) {
        setCategories(res.data.data)
      }
    }
    featchCategories()
  }, [])

  const productData = products.map((product: IProduct, index: number) => ({
    ...product,
    index: index + 1,
    key: uuidv4()
  }))

  useEffect(() => {
    if (openDrawer.id) {
      const product = products.find((product: IProduct) => product._id === openDrawer.id)
      if (product) {
        form.setFieldsValue({
          title: product.title,
          category: product.category._id,
          price: product.price,
          sale: product.sale,
          quantity: product.quantity,
          description: product.description,
          size: product.size
        })
        setThumbnail(product.thumbnail)
      }
    }
  }, [openDrawer.id])

  const columns: any = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 50
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
      width: 400,
      render: (_: string, product: IProduct) => (
        <div className='relative flex gap-x-3'>
          <img src={product.thumbnail} alt={product.title} className='h-[80px] w-[80px] object-cover rounded-md' />
          <div className='flex flex-col justify-center gap-1'>
            <Tag className='text-sm cursor-pointer line-clamp-2 w-fit' color='blue'>
              {product.category.name}
            </Tag>
            <p className='text-sm font-semibold cursor-pointer line-clamp-2 hover:underline'>{product.title}</p>
            <div className='flex gap-x-5'>
              <p className={`text-xs ${product.sale > 0 ? 'line-through text-gray-400' : ''}`}>
                {product.price.toLocaleString()}vnđ
              </p>
              {product.sale > 0 && <p className='text-xs'>{(product.price - product.sale).toLocaleString()}vnđ</p>}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Mã giảm giá',
      dataIndex: 'sale',
      key: 'sale',
      render: (sale: number) => <p className=''>{sale.toLocaleString()}vnđ</p>
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      fixed: 'right',
      width: 100,
      render: (_: any, product: IProduct) => (
        <Space>
          <Button
            icon={<AiOutlineEdit />}
            type='primary'
            onClick={() =>
              setOpenDrawer({
                visible: true,
                type: 'update',
                id: product._id
              })
            }
          />
          <Popconfirm
            title={'Bạn có chắc chắn muốn xóa sản phẩm này không?'}
            onConfirm={() => deleteProduct(product._id)}
            okText='Có'
            cancelText='Hủy'
          >
            <Button icon={<AiOutlineDelete />} danger />
          </Popconfirm>
        </Space>
      )
    }
  ]

  /* delete product */
  const deleteProduct = async (id: string) => {
    const newProduct = await handleDeleteProduct(id, products)
    if (!newProduct) return message.error('Lỗi kết nối đến server')
    setProducts(newProduct)
  }

  /* upload image */
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    setIsUpload(false)
    const newThumbnail = await handleUploadImage(e)
    setThumbnail(newThumbnail)
    setIsLoading(false)
    setIsUpload(true)
  }

  const handleSubmitForm = async (values: any) => {
    /* validate sale < price */
    if (values.sale > values.price) return message.error('Giá khuyến mại phải nhỏ hơn giá sản phẩm')

    if (!thumbnail) return message.error('Bạn chưa chọn hình ảnh sản phẩm')
    if (openDrawer.type === 'update') {
      const sizes = values.size.map((size: any) => ({ name: size.name, price: size.price }))
      const data = { ...values, thumbnail, size: sizes }
      try {
        const response = await productApi.updateProduct(openDrawer.id, data)
        if (response.data) {
          message.success('Cập nhật sản phẩm thành công')
          const products = await productApi.getProducts()
          setProducts(products.data.data.reverse())
          setOpenDrawer({ ...openDrawer, visible: false, id: '' })
        }
      } catch (error) {
        message.error('Lỗi kết nối đến server')
      }
      return
    }
    const data = { ...values, thumbnail }
    try {
      const response = await productApi.createProduct(data)
      if (response.data) {
        const productResponse = await productApi.getProducts()
        message.success('Thêm sản phẩm thành công')
        setProducts(productResponse.data.data.reverse())
        setOpenDrawer({ ...openDrawer, visible: false })
      }
    } catch (error) {
      message.error('Lỗi kết nối đến server')
    }
  }

  return (
    <>
      <Row>
        <Col span={24} className='mb-6'>
          <Button
            icon={<AiOutlinePlus />}
            className='flex items-center justify-between'
            type='primary'
            onClick={() => setOpenDrawer({ ...openDrawer, visible: true, type: 'create' })}
          >
            Thêm sản phẩm
          </Button>
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={productData}
            pagination={{
              defaultPageSize: 5,
              pageSizeOptions: ['5', '10', '20', '50', '100'],
              showSizeChanger: true,
              locale: { items_per_page: '/ trang' }
            }}
          />
        </Col>
      </Row>

      <Drawer
        title={openDrawer.type === 'create' ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
        width={720}
        placement='right'
        onClose={() => setOpenDrawer({ ...openDrawer, visible: false })}
        open={openDrawer.visible}
        extra={
          <Space>
            <label
              className='px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600'
              htmlFor='btn-submit'
            >
              {openDrawer.type === 'create' ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
            </label>
          </Space>
        }
      >
        <Form layout='vertical' form={form} onFinish={handleSubmitForm} autoComplete='off'>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='title'
                label='Tên sản phẩm'
                rules={[{ required: true, message: 'Không được để trống tên sản phẩm' }]}
              >
                <Input placeholder='Tên sản phẩm' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='category'
                label='Danh mục sản phẩm'
                rules={[{ required: true, message: 'Không được để trống danh mục sản phẩm' }]}
              >
                <Select placeholder='Danh mục sản phẩm'>
                  {categories &&
                    categories.length > 0 &&
                    categories.map((category: ICategory) => (
                      <Select.Option key={category._id} value={category._id}>
                        <span className='capitalize'>{category.name}</span>
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='price'
                label='Giá sản phẩm'
                rules={[{ required: true, message: 'Không được để trống giá sản phẩm' }]}
              >
                <Input placeholder='Giá sản phẩm' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='sale'
                className='w-full'
                label='Giá khuyến mại sản phẩm'
                rules={[{ required: true, message: 'Không được để trống giá sản phẩm' }]}
              >
                <InputNumber className='w-full' placeholder='Giá khuyến mại sản phẩm' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='quantity'
                className='w-full'
                label='Số lượng sản phẩm'
                rules={[{ required: true, message: 'Không được để trống số lượng sản phẩm' }]}
              >
                <InputNumber className='w-full' placeholder='Số lượng sản phẩm' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='quantity'
                className='w-full'
                label='Size sản phẩm'
                rules={[{ required: true, message: 'Không được để trống size sản phẩm' }]}
              >
                <Form.List name='size'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: 'Tên size là bắt buộc' }]}
                          >
                            <Input placeholder='tên size' />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'price']}
                            rules={[{ required: true, message: 'Giá size là bắt buộc' }]}
                          >
                            <Input placeholder='Giá size của sản phẩm' />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                          Add field
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {!isUpload && !isLoading && (
                <Form.Item
                  name='thumbnail'
                  className='w-full'
                  label='Hình ảnh sản phẩm'
                  rules={[
                    {
                      required: openDrawer.type === 'update' ? false : true,
                      message: 'Không được để trống hình ảnh sản phẩm'
                    }
                  ]}
                >
                  <input type='file' onChange={(e) => uploadImage(e)} id='thumbnail' multiple className='!hidden' />
                  <label
                    htmlFor='thumbnail'
                    className='rounded-xl flex-col items-center justify-center inline-block h-[150px] w-full gap-3 p-5 border border-gray-400 border-dashed'
                  >
                    <p className='text-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z'
                        />
                      </svg>
                    </p>
                    <p className='text-center ant-upload-text'>Tải hình ảnh</p>
                  </label>
                </Form.Item>
              )}
              {isUpload && !isLoading && (
                <div className='rounded-xl flex-col items-center justify-center flex h-[150px] w-full gap-3 p-5 border border-gray-300 relative'>
                  <div className='h-[80px] w-[80px] object-cover rounded-md'>
                    <img
                      src={thumbnail ? thumbnail : ''}
                      alt=''
                      className='object-cover w-full h-full border rounded-md shadow'
                    />
                  </div>
                  <div
                    className='absolute flex items-center justify-center w-4 h-4 cursor-pointer top-4 left-4'
                    onClick={() => setIsUpload(false)}
                  >
                    <AiOutlineCloseCircle />
                  </div>
                </div>
              )}
              {isLoading && (
                <div className='rounded-xl flex-col items-center justify-center flex h-[150px] w-full gap-3 p-5 border border-gray-300 relative'>
                  <Spin size='large' />
                </div>
              )}
              {openDrawer.type === 'update' && !isUpload && (
                <div className='rounded-xl flex-col items-start justify-start flex h-[150px] w-full gap-3 p-5 border border-gray-300 relative'>
                  <p className='text-left'>Hoặc giữ lại ảnh cũ</p>
                  <div className='h-[80px] w-[80px] object-cover rounded-md'>
                    <img
                      src={thumbnail ? thumbnail : ''}
                      alt=''
                      className='object-cover w-full h-full border rounded-md shadow'
                    />
                  </div>
                </div>
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='description'
                label='Mô tả sản phẩm'
                rules={[
                  {
                    required: true,
                    message: 'Không được để trống mô tả sản phẩm'
                  }
                ]}
              >
                <Input.TextArea rows={4} placeholder='Mô tả sản phẩm' />
              </Form.Item>
            </Col>
            <input type='submit' id='btn-submit' value={'submit'} className='hidden' />
          </Row>
        </Form>
      </Drawer>
    </>
  )
}
