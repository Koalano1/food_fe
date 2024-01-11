import React, { useEffect, useState } from 'react'
import { IOrder } from '~/types/order'
import OrderItem from './component/OrderItem'

interface Props {
  orderList: any
}

export default function ListDoneOrders({ orderList }: Props) {
  const [orderPending, setOrderPending] = useState<IOrder[]>([])

  useEffect(() => {
    if (orderList)
      setOrderPending(
        orderList.filter((item: any) => {
          if (item.orderStatus == 'Done') {
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
