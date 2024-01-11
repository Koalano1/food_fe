import { SuccessResponse } from '~/types/auth'
import http from '~/configs/instances'

const URL = 'order'

const orderApi = {
  getAllOrder(params: { status: any }) {
    return http.get<SuccessResponse<any[]>>(`${URL}`, {
      params
    })
  },

  /* update /admin/order/update-status/ */
  updateOrderConfirm: (id: string, status: string) => {
    return http.put<SuccessResponse<any>>(`/admin/order/update-status/${id}`, {
      status
    })
  }
}

export default orderApi
