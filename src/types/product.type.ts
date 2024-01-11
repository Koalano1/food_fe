import { ICategorRefProduct, ISizeRefProduct } from '.'

export interface IProduct {
  _id: string
  title: string
  description: string
  price: number
  sale: number
  category: ICategorRefProduct
  size: ISizeRefProduct[]
  quantity: number
  thumbnail: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IProductList {
  message: string
  data: IProduct[]
}

export interface IProductUpload {
  visible: boolean
  type: 'create' | 'update'
  id: string
}
