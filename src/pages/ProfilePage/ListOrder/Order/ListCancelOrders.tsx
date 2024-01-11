import React, { useEffect, useState } from 'react'
import { IOrder } from '~/types/order'
import OrderItem from './component/OrderItem'

interface Props {
  orderList: IOrder[]
}
export default function ListCancelOrders({ orderList }: Props) {
  const [orderPending, setOrderPending] = useState<IOrder[]>([])

  useEffect(() => {
    if (orderList)
      setOrderPending(
        orderList.filter((item) => {
          if (item.orderStatus == 'Cancelled') {
            return item
          }
        })
      )
  }, [orderList])
  return (
    <div>
      <OrderItem data={orderPending} />
    </div>
  )
}
