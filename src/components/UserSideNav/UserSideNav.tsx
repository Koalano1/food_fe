import classNames from 'classnames'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AppContext } from '~/ContexData/app.contex'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  console.log('🚀 ~ file: UserSideNav.tsx:8 ~ UserSideNav ~ profile:', profile)
  return (
    <div>
      <div className='flex items-center py-4 border-b border-b-gray-200'>
        <Link to='/profile' className='flex-shrink-0 w-12 h-12 overflow-hidden border rounded-full border-black/10'>
          <img src='https://picsum.photos/200' alt='' className='object-cover w-full h-full' />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 font-semibold text-gray-600 truncate'>{profile?.email}</div>
          <Link to='/profile' className='flex items-center text-gray-500 capitalize'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            classNames('flex items-center capitalize transition-colors', {
              ' text-orange': isActive,
              ' text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='w-full h-full' />
          </div>
          Tài khoản của tôi
        </NavLink>

        <NavLink
          to='/profile/order'
          className={({ isActive }) =>
            classNames('mt-4 flex items-center capitalize transition-colors', {
              ' text-orange': isActive,
              ' text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' className='w-full h-full' />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}
