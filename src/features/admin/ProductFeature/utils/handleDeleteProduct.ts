import { IProduct } from '~/types'
import { message } from 'antd'
import { productApi } from '~/apis'

export const handleDeleteProduct = async (id: string, products: IProduct[]) => {
  try {
    const response = await productApi.deleteProduct(id)
    message.success(response.data.msg)
    /* fillter product */
    const newProducts = products.filter((product) => product._id !== id)
    return newProducts
  } catch (error) {
    message.error('Xóa sản phẩm thất bại')
  }
}
