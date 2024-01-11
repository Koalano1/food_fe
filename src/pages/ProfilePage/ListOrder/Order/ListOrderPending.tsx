import { useEffect, useState } from 'react'
import { IOrder } from '~/types/order'
import OrderItem from './component/OrderItem'

interface Props {
  orderList: IOrder[]
}
export default function ListOrderPending({ orderList }: Props) {
  const [orderPending, setOrderPending] = useState<IOrder[]>([])

  useEffect(() => {
    if (orderList)
      setOrderPending(
        orderList.filter((item) => {
          if (item.orderStatus == 'Processing') {
            return item
          }
        })
      )
  }, [orderList])
  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          {/* <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div> */}

          <OrderItem data={orderPending} />
        </div>
      </div>
    </div>
  )
}
