import { Button, Col, Drawer, Row, Space, Table } from 'antd'

import { ColumnsType } from 'antd/es/table'
import { IOrder } from '~/types/order'
import { User } from '~/types/user'
import { formatCurrency } from '~/utils'

type DetailOrderProps = {
  open: boolean
  orderData: IOrder
  onClose: () => void
  handleCancel?: (id: string) => void
  handleChangeDone?: (id: string) => void
}

const DetailOrder = ({ open, orderData, handleCancel, handleChangeDone, onClose }: DetailOrderProps) => {
  const columns: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img className='w-[100px]' src={image} />
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (title: string) => <span className='text-base font-semibold'>{title ? title : '???'}</span>
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span className='text-base font-semibold'>{formatCurrency(price)}</span>
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => <span className='text-base font-semibold'>{quantity}</span>
    }
  ]
  const orderProducts = orderData?.products?.map((item: any, index: number) => {
    return {
      key: item._id,
      index: index + 1,
      productName: item.product.title,
      quantity: item?.count,
      image: item.product.thumbnail,
      price: item.product.price
    }
  })

  const footerContent = () => {
    return (
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h1 className='text-lg font-semibold'>Tổng quan đơn hàng</h1>
        </Col>
        <Col span={12}>
          <span className='text-base'>Phí vận chuyển:</span>
        </Col>
        <Col span={12}>
          <span className='block font-semibold text-right'>{formatCurrency(0)}</span>
        </Col>
        <Col span={12}>
          <span className='text-base'>Voucher:</span>
        </Col>
        <Col span={12}>
          <span className='block text-base font-semibold text-right'>-{formatCurrency(0)}</span>
        </Col>
        <Col span={12}>
          <span className='text-base'>Tổng tiền: </span>
        </Col>
        <Col span={12}>
          <span className='block text-xl font-bold text-right'>{formatCurrency(orderData.totalPrice)}</span>
        </Col>
      </Row>
    )
  }
  return (
    <>
      {orderData && (
        <Drawer
          title={<h1 className='text-2xl'>Chi tiết đơn hàng</h1>}
          placement='top'
          size='large'
          destroyOnClose
          width={1000}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              {orderData?.orderStatus == 'Processing' && (
                <Button
                  className={`${orderData?.orderStatus === 'Processing' ? '' : 'hidden'}`}
                  onClick={() => handleChangeDone && handleChangeDone(orderData._id)}
                >
                  Hoàn thành
                </Button>
              )}
              {/* <Button
              type='primary'
              className={`bg-blue-600 
                ${
                  orderData.orderStatus === 'confirmed' ||
                  orderData.orderStatus === 'Done' ||
                  orderData.orderStatus === 'Cancelled'
                    ? 'hidden'
                    : ''
                }`}
              onClick={() => handleCancel(orderData._id)}
            >
              Xác nhận
            </Button> */}

              <Button
                type='primary'
                danger
                className={`${
                  orderData?.orderStatus === 'Cancelled' ||
                  orderData?.orderStatus === 'Done' ||
                  orderData?.orderStatus === 'Dispatched'
                    ? 'hidden'
                    : ''
                }`}
                onClick={() => {
                  handleCancel && handleCancel(orderData._id)
                  close()
                }}
              >
                Hủy đơn
              </Button>
            </Space>
          }
        >
          <Row className='mb-5' gutter={[0, 24]}>
            <Col span={24}>
              <h1 className='text-xl font-semibold text-black dark:text-white'>Thông tin khách hàng</h1>
            </Col>
            <Col span={10}>
              <div className='flex flex-col gap-y-5'>
                <div className='flex gap-x-5'>
                  <img className='w-[100px] h-[100px]' src='https://picsum.photos/200' alt='' />
                  <span className='text-lg font-semibold dark:text-white'>
                    {(orderData.orderByUser as User)?.userName}
                  </span>
                </div>
                <div>
                  <span className='font-medium text-black dark:text-white'>
                    Điện thoại: {(orderData?.orderByUser as User)?.mobile}
                  </span>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className='flex flex-col gap-y-5'>
                <div className='flex text-base gap-x-2'>
                  <span>Địa chỉ: </span>
                  <span className='font-semibold text-black dark:text-white'>
                    {(orderData?.orderByUser as User)?.address}
                  </span>
                </div>
                <div>
                  <span>Thanh toán: </span>
                  <span className='font-semibold text-black uppercase dark:text-white'>{orderData?.paymentIntent}</span>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className='flex flex-col gap-y-5'>
                <div className='flex text-base gap-x-2'>
                  {/* <span className=''></span> */}
                  <div className='flex gap-x-2'>
                    <span className='min-w-max'>Ghi chú: </span>
                    {/* <span className='text-base font-semibold text-black dark:text-white'>
                    {orderData.note || orderData.note === ' ' ? orderData.note : 'Không có ghi chú!'}
                  </span> */}
                  </div>
                </div>
                <div className='flex items-center text-base gap-x-2'>
                  <span>Trạng thái:</span>
                  <span
                    className={` capitalize font-semibold ${
                      orderData.orderStatus === 'Cancelled'
                        ? 'bg-meta-1'
                        : orderData.orderStatus === 'Processing'
                        ? 'bg-meta-6'
                        : orderData.orderStatus === 'Done'
                        ? 'bg-meta-3'
                        : 'bg-meta-5'
                    } rounded inline-block px-2 py-1`}
                  >
                    {orderData.orderStatus}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table bordered dataSource={orderProducts} columns={columns} pagination={false} footer={footerContent} />
            </Col>
          </Row>
        </Drawer>
      )}
    </>
  )
}

export default DetailOrder
