import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import { Button, Col, Form, Input, Modal, Popconfirm, Row, Space, Table } from 'antd'
import { handleDeleteCategory, handleSubmit } from './utils'

import { EditCategory } from './components'
import { ICategory } from '~/types'
import { useState } from 'react'

interface CategoryFeatureProps {
  data: ICategory[]
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>
}
export const CategoryFeature = ({ data, setCategories }: CategoryFeatureProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [isModalOpenEdit, setIsModalOpenEdit] = useState({
    isOpen: false,
    idCate: ''
  })

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancelAdd = () => {
    setIsModalOpen(false)
  }

  const showModalEdit = (id: string) => {
    setIsModalOpenEdit({
      isOpen: true,
      idCate: id
    })
  }

  const handleOkEdit = () => {
    setIsModalOpenEdit({
      isOpen: false,
      idCate: ''
    })
  }

  const handleCancel = () => {
    setIsModalOpenEdit({
      isOpen: false,
      idCate: ''
    })
  }

  const categories = data.map((category, index) => ({
    ...category,
    key: category._id,
    index: index + 1
  }))

  const columns = [
    { title: 'STT', dataIndex: 'index', key: 'index', width: 50 },
    { title: 'Tên danh mục', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, category: ICategory) => (
        <Space>
          <Button icon={<AiOutlineEdit />} type='primary' onClick={() => showModalEdit(category._id)} />
          <Popconfirm
            title={'Bạn có chắc chắn muốn xóa danh mục này không?'}
            onConfirm={() => handleDeleteCategory(category._id, data, setCategories)}
            okText='Có'
            cancelText='Hủy'
          >
            <Button icon={<AiOutlineDelete />} danger />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      <Row>
        <Col span={24} className='mb-6'>
          <Button
            icon={<AiOutlinePlus />}
            className='flex items-center justify-between'
            type='primary'
            onClick={showModal}
          >
            Thêm danh mục sản phẩm
          </Button>
        </Col>
        <Col span={24}>
          <Table columns={columns} dataSource={categories} />
        </Col>
      </Row>
      <Modal title='Thêm danh mục sản phẩm' open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancelAdd}>
        <Form
          autoComplete='off'
          form={form}
          onFinish={(value: string) => {
            handleSubmit(value, data, setCategories, setIsModalOpen), form.resetFields()
          }}
          layout='vertical'
        >
          <Form.Item
            label='Tên sanh mục'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input placeholder='Tên danh mục' />
          </Form.Item>
          <div className='flex justify-end'>
            <Button htmlType='submit' className='text-right' type='primary'>
              Thêm danh mục
            </Button>
          </div>
        </Form>
      </Modal>

      <EditCategory
        isModalOpenEdit={isModalOpenEdit}
        handleOk={handleOkEdit}
        handleCancel={handleCancel}
        setCategories={setCategories}
      />
    </>
  )
}
