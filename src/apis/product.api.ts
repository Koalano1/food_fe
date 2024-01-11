import { IProduct, IProductList } from '~/types'

import { SuccessResponse } from '~/types/auth'
import http from '~/configs/instances'

export const productApi = {
  getProducts: async (query?: string) => {
    return await http.get<IProductList>(`/products?name=${query ? query : ''}`)
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<IProduct>>(`${URL}/${id}`)
  },

  /* delete product */
  deleteProduct: async (id: string) => {
    return await http.delete<{ msg: string }>(`/product/${id}`)
  },

  /* upload image */
  uploadImage: async (formData: FormData) => {
    return await http.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  /* create product */
  createProduct: async (product: IProduct) => {
    return await http.post('/product', product)
  },

  /* get one */
  getOneProduct: async (id: string) => {
    return await http.get(`/product/${id}`)
  },

  /* update product */
  updateProduct: async (id: string, product: IProduct) => {
    return await http.put(`/product/${id}`, product)
  }
}
