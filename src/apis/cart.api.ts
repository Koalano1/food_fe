import http from '~/configs/instances'
import { SuccessResponse } from '~/types/auth'
import { ICartList, Purchase } from '~/types/cart'
import { IListOrder } from '~/types/order'

const URL = 'cart'

export const cartApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<any>>(`${URL}/add`, { products: [{ id: body.product_id, count: body.buy_count }] })
  },
  getCart() {
    return http.get<ICartList>(`${URL}`)
  }
}

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post(`${URL}/add`, { products: [{ id: body.product_id, count: body.buy_count }] })
  },
  getPurchases() {
    return http.get<ICartList>(`${URL}`)
  },
  buyProducts(body: {
    products: {
      product: string
      count: number
    }[]
    totalPrice: number
  }) {
    return http.post<SuccessResponse<any>>(`/orders/create-order`, body)
  },
  updatePurchase(body: { id: string; quantity: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/update`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponse<any>>(`${URL}/delete/${purchaseIds}`)
  },
  getOrder: () => {
    return http.get<SuccessResponse<IListOrder>>(`/orders/my-orders`)
  },
  getOrderAdmin: () => {
    return http.get<SuccessResponse<IListOrder>>(`/admin/all-orders`)
  },
  canelOrder: (id: string) => {
    return http.put<SuccessResponse<IListOrder>>(`/order/cancel/${id}`)
  },
  orderChangeStatus: ({ status, id }: { status: string; id: string }) => {
    return http.put<SuccessResponse<IListOrder>>(`/admin/order/update-status/${id}`, { status })
  }
}

export default purchaseApi
