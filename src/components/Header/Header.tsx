import { Badge, Dropdown, MenuProps, Space, message } from 'antd'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import purchaseApi, { cartApi } from '~/apis/cart.api'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from '~/ContexData/app.contex'
import { ICart } from '~/types/cart'
import { IProduct } from '~/types'
import { productApi } from '~/apis'
import { useLogout } from '~/hooks/Logout/Logout'
import { useQuery } from '@tanstack/react-query'

export const Header = () => {
  const { logoutMutate } = useLogout()
  const { data: purchasesInCartData, isError } = useQuery({
    queryKey: ['purchases'],
    queryFn: () => purchaseApi.getPurchases()
  })
  const { isAuthenticated, profile } = useContext(AppContext)

  const items: MenuProps['items'] = [
    {
      label: 'Trang cá nhân',
      key: 'profile'
    },
    {
      label: 'Đăng xuất',
      key: 'logout'
    }
  ]
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = ({ key }) => {
    key == 'logout' ? logoutMutate() : navigate(`/${key}`)
  }

  const [listCart, setListCart] = useState<ICart[]>([])
  useEffect(() => {
    cartApi.getCart().then((data) => {
      if (purchasesInCartData) {
        setListCart(purchasesInCartData?.data.data.products)
      }
    })
  }, [purchasesInCartData])

  if (profile && profile.role == 'admin') {
    items.splice(1, 0, {
      label: 'Quản lý cửa hàng',
      key: 'admin'
    })
  }

  const [search, setSearch] = useState<string>('')
  const [products, setProducts] = useState<IProduct[]>([])

  const handleOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { value } = e.target
      setSearch(value)
      const response = await productApi.getProducts(value)
      setProducts(response.data.data)
    } catch (error) {
      message.error('Lỗi tìm kiếm')
    }
  }

  return (
    <>
      <header className='p-relative'>
        <section className='foody__vn p-fixed' style={{ backgroundColor: '#ffffff', paddingTop: 8 }}>
          <nav className='flex-sb flex-c container flex'>
            <ul className='flex-c flex'>
              <li className='style-li p-e mt-1'>
                <NavLink to={`/`}>
                  <img src='https://www.foody.vn/style/images/logo/foody-vn.png' alt='logo' />
                </NavLink>
              </li>
              <li className='flex-c p-e button-header f-14 f-color flex invisible'>
                Hà Nội
                <i className='fa-solid fa-caret-down' style={{ color: '#b3aeae', paddingLeft: 5, fontSize: 13 }} />
              </li>
              <li className='flex-c style-li p-e button-header f-14 f-color flex invisible'>
                Ăn uống
                <i className='fa-solid fa-caret-down' style={{ color: '#b3aeae', paddingLeft: 5, fontSize: 13 }} />
              </li>
              <li className='style-li p-e p-relative'>
                <input
                  className='input-p w__btn--found'
                  value={search}
                  onChange={(e) => handleOnchange(e)}
                  type='text'
                  placeholder='Địa điểm, món ăn, loại hình...'
                />
                {search.trim() !== '' && (
                  <div className='absolute top-[calc(100%_+_4px)] left-0 w-full border border-gray-600'>
                    <div className='shadown flex flex-col w-full bg-white border border-gray-200 rounded'>
                      {products?.map((product) => (
                        <div
                          key={product._id}
                          onClick={() => {
                            navigate(`/product/${product._id}`), setSearch('')
                          }}
                          className='last:not:border-b hover:bg-gray-100 flex justify-between gap-4 p-4 border-gray-500 cursor-pointer'
                        >
                          <img src={product.thumbnail} alt={product.title} className='object-cover w-10 h-10 rounded' />
                          <div className='flex flex-col flex-1'>
                            <span className='f-14'>{product.title}</span>
                            <span className='f-12'>{product.price.toLocaleString()}đ</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
              <li className='style-li p-e button-header ps-1 pe-1 invisible' style={{ padding: '6px 0' }}>
                <i className='fa-solid fa-bars' />
              </li>
              <li className='style-li p-e f-14 button-header ps-1 pe-1 f-color invisible'>
                <i className='fa-solid fa-mobile-screen-button' />
                Apps
              </li>
            </ul>
            <ul className='flex items-center gap-4'>
              <li className='style-li p-s'>
                {isAuthenticated ? (
                  <Dropdown menu={{ items, onClick }}>
                    <Space>
                      <img src='https://picsum.photos/200' alt='' className='w-10 h-10 rounded-full' />
                    </Space>
                  </Dropdown>
                ) : (
                  <Link to='/login' className='f-14'>
                    Đăng nhập
                  </Link>
                )}
              </li>
              <li className='h-7 w-7 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer'>
                <span className='mt-[3px]'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                    />
                  </svg>
                </span>
              </li>
              <Badge count={listCart?.length || 0} showZero>
                {/* <li
                  onClick={() => setOpen(true)}
                  className='h-7 w-7 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer'
                > */}
                <Link
                  className='h-7 w-7 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer'
                  to='/cart'
                >
                  <span className='mt-[3px]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                      />
                    </svg>
                  </span>
                </Link>
              </Badge>
            </ul>
          </nav>
        </section>
      </header>
    </>
  )
}
