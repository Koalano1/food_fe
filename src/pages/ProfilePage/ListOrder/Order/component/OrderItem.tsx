import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Popconfirm, message } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from '~/apis/cart.api'
import { useLogout } from '~/hooks/Logout/Logout'
import { IOrder } from '~/types/order'
import { formatCurrency } from '~/utils'

export default function OrderItem({ data }: { data: IOrder[] }) {
  const queryClient = useQueryClient()

  const { logoutMutate } = useLogout()
  const cancelOrderMutation = useMutation({
    mutationFn: purchaseApi.canelOrder
  })
  const handleCancel = (id: string) => {
    id &&
      cancelOrderMutation.mutate(id, {
        onSuccess: () => {
          message.success('Hủy đơn thành công')
          queryClient.invalidateQueries({ queryKey: ['order'] })
        },
        onError() {
          logoutMutate()
        }
      })
  }

  return (
    <>
      {data &&
        data.map((item) => (
          <div key={item?._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
            <Link to={`/product/${item.products[0].product._id}`} className='flex'>
              <div className='flex-shrink-0'>
                <img className='h-20 w-20 object-cover' src={item?.products[0].product.thumbnail} />
              </div>
              <div className='ml-3 flex-grow overflow-hidden'>
                <div className='truncate'>{item?.products[0]?.product.title}</div>
                <div className='mt-3'>x{item?.products[0]?.count}</div>
              </div>
              <div className='ml-3 flex-shrink-0'>
                <span className='truncate text-gray-500 line-through'>
                  {formatCurrency(item?.products[0]?.product.price)}
                </span>
                <span className='ml-2 truncate text-[#EE4D2D]'>{formatCurrency(item?.products[0]?.product.price)}</span>
              </div>
            </Link>
            <div
              className={`flex ${item.orderStatus == 'Processing' ? 'justify-between items-center' : 'justify-end'}`}
            >
              {item.orderStatus == 'Processing' && (
                <div className='mt-1 p-2'>
                  <Popconfirm
                    title={'Bạn có chắc chắn muốn xóa sản phẩm này không?'}
                    onConfirm={() => handleCancel(item._id)}
                    okText='Có'
                    cancelText='Hủy'
                  >
                    <Button type='primary' danger ghost>
                      Hủy Đơn
                    </Button>
                  </Popconfirm>
                </div>
              )}
              <div>
                <span>Tổng giá tiền</span>
                <span className='ml-4 text-xl text-[#EE4D2D]'>
                  {formatCurrency(item?.products[0]?.count * item?.products[0]?.product?.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
