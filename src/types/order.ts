import { IProduct } from '.'
import { User } from './user'

export interface IOrder {
  _id: string
  orderByUser: string | User
  orderStatus: string
  paymentIntent: string
  products: {
    product: IProduct
    count: number
    _id: string
  }[]
  totalPrice: number
  createdAt: string
  updatedAt: string
}

export interface IListOrder {
  docs: IOrder[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number
  nextPage: number
}
