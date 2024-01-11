import { useQuery } from '@tanstack/react-query'
import { Tabs } from 'antd'
import React from 'react'
import purchaseApi from '~/apis/cart.api'
import { Breadcrumb } from '~/components'
import ListCancelOrders from './Tab/ListCancelOrders'
import ListDoneOrders from './Tab/ListDoneOrders'
import ListPendingOrders from './Tab/ListPendingOrders'

const orderStatus = ['Not processed', 'Cash on delivery', 'Processing', 'Dispatched', 'Cancelled', 'Delivered']

export interface OrderDataType {
  key: React.Key
  orderBy: string
  image: string
  paymentMethod: string
  // cost: number
  currency: string
}

const Order = () => {
  const status: number = 1
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['order', { status }],
    queryFn: () => purchaseApi.getOrderAdmin()
  })
  const purchasesInCart = purchasesInCartData?.data?.data?.docs

  const handeListOrderStatus = (status: string) => {
    const data =
      purchasesInCart &&
      purchasesInCart.filter((item) => {
        return item.orderStatus == status
      })
    return data ? data : []
  }

  const items = [
    {
      key: '2',
      label: 'Chờ xác nhận',
      children: <ListPendingOrders refetch={refetch} orderList={handeListOrderStatus('Processing') || []} />
    },
    // { key: '3', label: 'Đã xác nhận', children: <ListConfirmOrders /> },
    { key: '3', label: 'Hoàn thành', children: <ListDoneOrders orderList={handeListOrderStatus('Done') || []} /> },
    { key: '4', label: 'Đã hủy', children: <ListCancelOrders orderList={handeListOrderStatus('Cancelled') || []} /> }
  ]
  return (
    <div>
      <Breadcrumb pageName='Đơn hàng' />
      <Tabs defaultActiveKey='2' items={items} />
    </div>
  )
}

export default Order
