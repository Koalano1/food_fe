import { ICategory } from '~/types'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

type Props = {
  categories: ICategory[]
  onClick: (idCategory: string) => void
}

export const Sidebar = ({ categories, onClick }: Props) => {
  const [active, setActive] = useState<number | null>(null)
  return (
    <nav className='flex-shrink w-[246px] bg-white' style={{ height: 346 }}>
      <h3 className='flex flex-c' style={{ padding: '15px 15px 10px 15px' }}>
        <NavLink to=''>
          <img
            src='https://www.foody.vn/asset/styles/images/icons/icon-foody-60x60.png'
            alt='ahihi'
            width='28px'
            height='28px'
            style={{ backgroundColor: 'red', padding: 6, marginRight: 5 }}
          />
        </NavLink>
        Khám Phá
      </h3>
      <div className=''>
        <div
          className={`bg-[#f7f7f7] flex cursor-pointer justify-between items-center text-black hover:text-[#cf2127] py-2.5 px-4 ${
            active === null && 'text-[#cf2127] !bg-gray-200'
          }`}
          onClick={() => {
            onClick(''), setActive(null)
          }}
        >
          Tất cả sản phẩm
          <span className='mt-[3px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </span>
        </div>
        {categories.map((category, index) => (
          <div
            className={`bg-[#f7f7f7] flex cursor-pointer justify-between items-center text-black hover:text-[#cf2127] py-2.5 px-4
            ${active === index && 'text-[#cf2127] !bg-gray-200'}`}
            key={category._id}
            onClick={() => {
              setActive(index), onClick(category._id)
            }}
          >
            {category.name}
            <span className='mt-[3px]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </nav>
  )
}
