import { ICategory } from '~/types'
import { SuccessResponse } from '~/types/auth'
import http from '~/configs/instances'

const URL = 'categories'
export const categoryApi = {
  getCategories: async () => {
    return await http.get<SuccessResponse<ICategory[]>>(URL)
  },

  deleteCategory: async (id: string) => {
    return await http.delete<SuccessResponse<ICategory>>(`/category/${id}`)
  },

  createCategory: async (name: string) => {
    return await http.post<SuccessResponse<ICategory>>(`/category`, name)
  },

  updateCategory: async (id: string, name: string) => {
    return await http.put<SuccessResponse<ICategory>>(`/category/${id}`, name)
  },

  getCategory: async (id: string) => {
    return await http.get<SuccessResponse<ICategory>>(`/category/${id}`)
  }
}
