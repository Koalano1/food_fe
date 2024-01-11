import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { IProduct } from '~/types'
import { ProductDetailFeature } from '~/features'
import { message } from 'antd'
import { productApi } from '~/apis'

export const ProductDetail = () => {
  const [product, setProduct] = useState<IProduct | null>(null)
  const { id } = useParams()
  useEffect(() => {
    if (!id) return
    const fetchProduct = async () => {
      try {
        const respones = await productApi.getOneProduct(id)
        if (respones.status === 200) {
          setProduct(respones.data.data as any)
        }
      } catch (error) {
        message.error('Lỗi tải sản phẩm')
        ;<Navigate to='/' />
      }
    }
    fetchProduct()
  }, [id])
  if (!product) return null
  return <ProductDetailFeature product={product} />
}
