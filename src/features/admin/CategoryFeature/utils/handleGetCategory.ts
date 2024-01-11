import { categoryApi } from '~/apis'
import { message } from 'antd'

export const getCategory = async (id: string) => {
  try {
    const response = await categoryApi.getCategory(id)
    return response.data.data
  } catch (error) {
    message.error('Lỗi lấy danh mục')
  }
}
