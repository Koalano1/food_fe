import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, message } from 'antd'
import { useContext } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { AppContext } from '~/ContexData/app.contex'
import purchaseApi from '~/apis/cart.api'
import { useLogout } from '~/hooks/Logout/Logout'
import { IProduct } from '~/types'

interface IProductDetailFeatureProps {
  product: IProduct
}
export const ProductDetailFeature = ({ product }: IProductDetailFeatureProps) => {
  const queryClient = useQueryClient()
  const { profile } = useContext(AppContext)
  const { logoutMutate } = useLogout()
  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })
  const handleAddToCart = () => {
    if (profile && profile.accessToken) {
      addToCartMutation.mutate(
        { product_id: product._id, buy_count: 1 },
        {
          onSuccess: () => {
            message.success('Add to cart success')
            queryClient.invalidateQueries({ queryKey: ['purchases'] })
          }
        }
      )
    } else {
      logoutMutate()
    }
  }

  return (
    <div className='my-[60px] flex-1'>
      <main className='h-full bg-white' style={{ marginTop: 0, padding: '30px 0 50px 0' }}>
        <div className='px-4 detail__product container-xl'>
          <div className='object-cover w-full detail__product--image h-96'>
            <img src={product.thumbnail} alt={product.title} className='object-cover w-full h-full' />
          </div>
          <div className='detail__product--info'>
            <ul className='invisible'>
              <li>
                <NavLink to={''}>Home</NavLink>
              </li>
              <li>
                <NavLink to={''}>
                  <i className='fa-solid fa-angles-right' />
                </NavLink>
              </li>
              <li>
                <NavLink to={''}>Hà Nội</NavLink>
              </li>
              <li>
                <NavLink to={''}>
                  <i className='fa-solid fa-angles-right' />
                </NavLink>
              </li>
              <li>
                <NavLink to={''}>Linh - Cari Gà &amp; Ăn Vặt Hàn Quốc</NavLink>
              </li>
            </ul>
            <div className='flex icon flex-c'>
              <button>
                <i className='fa-regular fa-thumbs-up' />
                Yêu thích
              </button>
              <p className='text-lg uppercase'>{product.category.name}</p>
            </div>
           <div className='flex items-center'>
           <h2 className='capitalize'>{product.title}</h2>
            
            <div className='flex items-center'>
              <Button
                icon={<AiOutlineShoppingCart />}
                type='primary'
                danger
                size='large'
                className='flex items-center justify-center'
                onClick={handleAddToCart}
                disabled={addToCartMutation.isPending}
                loading={addToCartMutation.isPending}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
           </div>
            <p className='address' style={{ fontSize: 13 }}>
              {product.description}
            </p>
            <div className='flex stars flex-c' style={{ padding: '5px 0' }}>
              <ul>
                <li>
                  <i className='fa-solid fa-star' />
                </li>
                <li>
                  <i className='fa-solid fa-star' />
                </li>
                <li>
                  <i className='fa-solid fa-star' />
                </li>
                <li>
                  <i className='fa-solid fa-star' />
                </li>
                <li>
                  <i className='fa-regular fa-star-half-stroke' />
                </li>
              </ul>
              <button
                style={{
                  margin: '0 5px',
                  padding: '3px 5px',
                  color: '#fff',
                  backgroundColor: '#ffc107',
                  border: 'none',
                  borderRadius: 5
                }}
              >
                999+
              </button>
              <p style={{ fontSize: 14 }}>đánh giá trên ShopeeFood</p>
            </div>
            <NavLink to={''} style={{ color: '#0288d1', padding: '5px 0 8px 0' }} className='f-14'>
              Xem thêm lượt đánh giá từ Foody
            </NavLink>
            <div style={{ borderBottom: '1px solid #eee' }} />
            <ul style={{ paddingTop: 10 }}>
              <li className='p-relative'>
                <p style={{ color: '#b3aeae', fontSize: 13 }}>Giá sản phẩm</p>
                <strong style={{ paddingTop: 5, display: 'block', color: '#f13233', fontSize: 14 }}>
                  {product.price.toLocaleString()}đ
                </strong>
                <img
                  className='p-absolute'
                  style={{ top: 10, right: '-20px', cursor: 'pointer' }}
                  src='image/detail/qdoitac.png'
                  alt=''
                />
              </li>
              <li style={{ color: '#b3aeae', padding: '0 5px 0 25px' }}>|</li>
              <li>
                <p style={{ color: '#b3aeae', fontSize: 13 }}>Giảm khuyến mại</p>
                <strong style={{ paddingTop: 5, display: 'block', color: '#f13233', fontSize: 14 }}>
                  {product.sale.toLocaleString()}đ
                </strong>
              </li>
            </ul>

           
          </div>
        </div>
      </main>
    </div>
  )
}
