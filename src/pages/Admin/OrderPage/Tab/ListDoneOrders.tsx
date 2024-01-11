import { Button, Form, Space, Table } from 'antd'

import { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import DetailOrder from '~/components/Drawn/DetailOrder'
import { IOrder } from '~/types/order'

export default function ListDoneOrders({ orderList }: { orderList: IOrder[] }) {
  const [opent, setOpent] = useState(false)

  const [form] = Form.useForm()

  const columns: ColumnsType<any> = [
    {
      key: 'orderBy',
      dataIndex: 'orderBy',
      title: 'Order By'
    },
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Image',
      render: (data) => (
        <Space size='middle'>
          <img src={data} className='h-12' alt='' />
        </Space>
      )
    },
    {
      key: 'paymentMethod',
      dataIndex: 'paymentMethod',
      title: 'Payment Method'
    },

    {
      key: 'currency',
      dataIndex: 'currency',
      title: 'Currency'
    },
    {
      key: 'action',
      title: 'Action',
      render: (data) => (
        <Space size='middle'>
          <Button
            type='primary'
            className='bg-blue-600'
            size='middle'
            onClick={() => {
              setOpent(true)

              form.setFieldValue('keyOrder', data.key + 1)
            }}
          >
            Chi tiết
          </Button>
        </Space>
      )
    }
  ]
  const onClose = () => {
    setOpent(false)
  }
  const data =
    orderList &&
    orderList
      .filter((order) => order.orderStatus === 'Done')
      .map((item: any, index: number) => {
        return {
          key: index,
          orderBy: item?.orderByUser?.userName || item.orderByUser?.email,

          currency: item.totalPrice,
          image: item.products[0].product.thumbnail,
          paymentMethod: 'COD'
        }
      })

  return (
    <>
      <Table columns={columns} dataSource={data} />
      {form.getFieldValue('keyOrder') && (
        <DetailOrder open={opent} orderData={orderList[form.getFieldValue('keyOrder') - 1]} onClose={onClose} />
      )}
    </>
  )
}
