import { Tabs } from 'antd'
import ListCancelOrders from './Order/ListCancelOrders'
import ListDoneOrders from './Order/ListDoneOrders'
import ListOrderPending from './Order/ListOrderPending'
import purchaseApi from '~/apis/cart.api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function ListOrder() {
  const status: number = 1
  const queryClient = useQueryClient()
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['order', { status }],
    queryFn: () => purchaseApi.getOrder()
  })

  const purchasesInCart = purchasesInCartData?.data?.data?.docs

  const itemTab = purchasesInCart && [
    { key: '2', label: 'Chờ xác nhận', children: <ListOrderPending orderList={purchasesInCart} /> },

    { key: '3', label: 'Hoàn thành', children: <ListDoneOrders orderList={purchasesInCart} /> },
    { key: '4', label: 'Đã hủy', children: <ListCancelOrders orderList={purchasesInCart} /> }
  ]

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px] '>
          <Tabs
            className='bg-slate-50 ml-4 p-2'
            defaultActiveKey='2'
            tabBarStyle={{ padding: 10, fontSize: 15 }}
            animated={true}
            items={itemTab}
          />
        </div>
      </div>
    </div>
  )
}
