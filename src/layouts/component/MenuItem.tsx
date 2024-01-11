import { BarChartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { FaClipboardList, FaUserFriends } from 'react-icons/fa'

import { AiOutlineControl } from 'react-icons/ai'
import { BiSolidCategoryAlt } from 'react-icons/bi'
import type { MenuProps } from 'antd'
import { NavLink } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

export const items: MenuProps['items'] = [
  // giao diên chính
  // getItem(<NavLink to={`/admin/home`}>Dashboard</NavLink>, 'home', <BarChartOutlined />),

  // quản lý đơn hàng
  getItem(<NavLink to={`/admin/orders`}>Đơn hàng</NavLink>, 'orders', <FaClipboardList />),

  // quản lý sản phẩm
  getItem('Quản lý', 'admin', <AiOutlineControl className='!text-base' />, [
    getItem(<NavLink to={`/admin/products`}>Sản phẩm</NavLink>, 'product', <ShoppingOutlined />),
    getItem(<NavLink to={`/admin/categories`}>Danh mục</NavLink>, 'categories', <BiSolidCategoryAlt />)
  ]),

  // quản lý người dùng

  getItem(<NavLink to={`/admin/users`}>Khách hàng</NavLink>, 'customers', <FaUserFriends />),
  getItem(<NavLink to={`/`}>Xem Website</NavLink>, '', null)
]
