import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import purchaseApi from '~/apis/cart.api'
import { IProduct } from '~/types'
import { formatCurrency } from '~/utils'
import { AppContext } from '~/ContexData/app.contex'

export const HomeFeature = ({ products }: { products: IProduct[] }) => {
  const { profile } = useContext(AppContext)
  const [limit, setLimit] = useState(12)

  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })
  const navigate = useNavigate()
  const buyNow = async (product: any) => {
    if (!profile) {
      navigate('/login')
      return
    }
    const res = await addToCartMutation.mutateAsync({ product_id: product._id, buy_count: 1 })
    const purchase = res.data.data
    navigate('/cart', {
      state: {
        purchaseId: purchase._id
      }
    })
  }
  return (
    <div className='flex flex-col gap-6'>
      <section className='grid grid-cols-4 gap-3'>
        {products &&
          products.length > 0 &&
          products.slice(0, limit).map((product: IProduct) => (
            <div className='relative card' key={product._id}>
              <div className='card__image card__image--hover p-relative'>
                <NavLink to={`/product/${product._id}`}>
                  <img src={product.thumbnail} alt={product.title} />
                </NavLink>
              </div>
              <div className='px-2 my-3'>
                <Link to={`/product/${product._id}`} className='inline-block w-full text-black capitalize truncate'>
                  {product.title}
                </Link>
                <div className='flex items-center justify-between my-2'>
                  <p className={`text-xs ${product.sale > 0 ? 'line-through text-gray-400' : ''}`}>
                    {formatCurrency(product.price)}
                  </p>
                  {product.sale > 0 && <p className='text-xs'>{formatCurrency(product.price - product.sale)}</p>}
                </div>
              </div>
              <div style={{ borderBottom: '1px solid #eee' }} />
              <div className='flex flex-c flex-sb p'>
                <div className='action__food f-12' style={{ color: '#888' }}>
                  <span style={{ marginRight: 10 }}>
                    <i className='fa-solid fa-comment' /> 19
                  </span>
                  <span>
                    <i className='fa-solid fa-camera' /> 86
                  </span>
                </div>
                <div
                  onClick={() => buyNow(product)}
                  className='cursor-pointer save__food f-12'
                  style={{ color: '#888' }}
                >
                  <i className='fa-solid fa-bookmark' />
                  Đặt hàng
                </div>
              </div>
            </div>
          ))}
      </section>
      <div
        className='px-5 py-3 text-center text-white bg-blue-400 rounded-lg cursor-pointer'
        onClick={() => setLimit(limit + 4)}
      >
        Xem thêm
      </div>
    </div>
  )
}
