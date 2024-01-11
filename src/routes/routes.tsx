import { ProtectRouter, RejectRoter } from './ProtectRouter'

import AdminLayout from '~/layouts/AdminLayout'
import CartPage from '~/pages/CartPage/CartPage'
import CategoryPage from '~/pages/Admin/CategoryPage/CategoryPage'
import Dashboard from '~/pages/Admin/Dashboard/Dashboard'
import { DefaultLayout } from '~/layouts'
import { HomePage } from '~/pages/HomePage'
import ListOrder from '~/pages/ProfilePage/ListOrder/ListOrder'
import Login from '~/pages/Login/Login'
import NotFound from '~/pages/NotFound/NotFound'
import OrderPage from '~/pages/Admin/OrderPage/OrderPage'
import { ProductDetail } from '~/pages'
import ProductPage from '~/pages/Admin/ProductPage/ProductPage'
import ProfilePage from '~/pages/ProfilePage/ProfilePage'
import { ProtextRoterAdmin } from './ProtextRoter'
import Regiseter from '~/pages/Register/Register'
import UserLayout from '~/layouts/LayoutProfileUser'
import UserPage from '~/pages/Admin/UserPage/UserPage'
import { createBrowserRouter } from 'react-router-dom'

export const routes = createBrowserRouter([
  {
    path: '',
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: '',
            index: true,
            element: <HomePage />
          },
          {
            path: 'product/:id',
            element: <ProductDetail />
          }
        ]
      }
    ]
  },
  {
    path: 'cart',
    element: <ProtectRouter />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: '',
            element: <CartPage />
          }
        ]
      }
    ]
  },
  {
    path: '/',
    element: <ProtectRouter />,
    children: [
      {
        path: 'profile',
        element: <UserLayout />,
        children: [
          {
            path: '',
            element: <ProfilePage />
          },
          {
            path: 'order',
            element: <ListOrder />
          }
        ]
      },
      {
        path: '',
        // element: <ProtextRoterAdmin />,
        children: [
          {
            path: 'admin',
            element: <AdminLayout />,
            children: [
              { path: 'home', element: <Dashboard /> },
              { path: 'products', element: <ProductPage /> },
              { path: 'users', element: <UserPage /> },
              { path: 'categories', element: <CategoryPage /> },
              { path: 'orders', element: <OrderPage /> }
            ]
          }
        ]
      }
    ]
  },

  {
    path: '',
    element: <RejectRoter />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Regiseter />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
