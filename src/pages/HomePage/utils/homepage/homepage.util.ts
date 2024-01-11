import { categoryApi, productApi } from '~/apis'

import { IProduct } from '~/types'
import { message } from 'antd'

export const getAllProducts = async () => {
  try {
    const response = await productApi.getProducts()
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    message.error('Something went wrong!')
  }
}

export const getCategories = async () => {
  try {
    const response = await categoryApi.getCategories()
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    message.error('Something went wrong!')
  }
}
