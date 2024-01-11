import { IProduct } from '.'

export interface ICartList {
  message: string
  data: {
    _id: string
    products: ICart[]
    totalPrice: number
    user: string
    createdAt: string
    updatedAt: string
  }
}

export interface ICart {
  product: IProduct
  count: number
  price: number
  _id: string
}
export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: string
  user: string
  product: IProduct
  createdAt: string
  updatedAt: string
}

export interface ExtendedPurchase extends ICart {
  disabled: boolean
  checked: boolean
}
