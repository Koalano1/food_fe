import { Button, Form, Popconfirm, Space, Table, message } from 'antd'

import { RefetchOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import purchaseApi from '~/apis/cart.api'
import DetailOrder from '~/components/Drawn/DetailOrder'
import { useLogout } from '~/hooks/Logout/Logout'
import { IOrder } from '~/types/order'

export default function ListPendingOrders({
  orderList,
  refetch
}: {
  orderList: IOrder[]
  refetch: (options?: RefetchOptions | undefined) => void
}) {
  const [opent, setOpent] = useState(false)

  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const { logoutMutate } = useLogout()
  const cancelOrderMutation = useMutation({
    mutationFn: purchaseApi.canelOrder,
    onSuccess: () => {
      refetch()
    }
  })

  const doneOrderMutation = useMutation({
    mutationFn: purchaseApi.orderChangeStatus,
    onSuccess: () => {
      refetch()
    }
  })

  const handleCancel = (id: string) => {
    cancelOrderMutation.mutate(id, {
      onSuccess: () => {
        message.success('Hủy đơn thành công')
        queryClient.invalidateQueries({ queryKey: ['order'] })
      },
      onError() {
        message.error('Có lỗi xảy ra, vui lòng thử lại sau!')

        logoutMutate()
      }
    })
  }
  const handleChangeDone = (id: string) => {
    doneOrderMutation.mutate(
      { id, status: 'Done' },
      {
        onSuccess: () => {
          message.success('Xác nhận đơn hàng thành công')

          queryClient && queryClient?.invalidateQueries({ queryKey: ['order'] })
        },
        onError() {
          message.error('Có lỗi xảy ra, vui lòng thử lại sau!')

          logoutMutate()
        }
      }
    )
  }

  const onClose = () => {
    setOpent(false)
  }
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
      render: (data) => {
        return (
          <Space size='middle'>
            <Popconfirm
              title='Xác nhận đơn hàng'
              description='Bạn có chắc muốn xác nhận đơn hàng này không?'
              onConfirm={() => handleChangeDone(orderList[data.key]._id)}
              okText='Đúng'
              cancelText='Hủy'
            >
              <Button type='primary' className='bg-blue-600' size='middle'>
                Xác nhận
              </Button>
            </Popconfirm>
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
            <Popconfirm
              title='Hủy đơn hàng'
              description='Are you sure to delete this task?'
              onConfirm={() => handleCancel(orderList[data.key!]._id)}
              okText='Đúng'
              cancelText='Hủy'
            >
              <Button danger type='primary' className='flex items-center justify-center'>
                Hủy đơn
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  const data =
    orderList &&
    orderList.map((item: any, index: number) => ({
      key: index,
      orderBy: item.orderByUser?.userName,

      currency: item.totalPrice,
      image: item.products[0].product.thumbnail,
      paymentMethod: 'COD'
    }))

  return (
    <>
      <Table columns={columns} dataSource={data} />
      {form.getFieldValue('keyOrder') && (
        <DetailOrder
          handleChangeDone={handleChangeDone}
          handleCancel={handleCancel}
          open={opent}
          orderData={orderList[form.getFieldValue('keyOrder') - 1]}
          onClose={onClose}
        />
      )}
    </>
  )
}
