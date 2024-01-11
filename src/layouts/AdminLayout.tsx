import { useState } from 'react'

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Dropdown, Layout, Menu, theme } from 'antd'

import { Link, Outlet } from 'react-router-dom'
import { items } from './component/MenuItem'

import { useLogout } from '~/hooks/Logout/Logout'

const { Header, Sider, Content } = Layout

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const { logoutMutate } = useLogout()

  return (
    <Layout className='h-screen overflow-y-hidden'>
      <Sider
        trigger={null}
        width={265}
        collapsible
        collapsed={collapsed}
        className='shadow-shadowRight h-screen overflow-y-auto'
      >
        {/* <div className='demo-logo-vertical' /> */}
        <Link
          to='/admin/dashboard'
          className='border-b-gray-100 bg-cyan-500 flex-shrink-1 block border-b'
          style={{ padding: '16px 0' }}
        >
          <p className='text-2xl font-bold text-center text-gray-700'>
            <span className='text-green-400'>F</span>ood
          </p>
        </Link>
        <Menu theme='dark' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline' items={items} />
      </Sider>
      <Layout className='min-h-screen '>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className='flex items-center justify-between w-full'>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />

            <div className='flex items-center gap-6 mr-4'>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: '1',
                      icon: <LogoutOutlined rev={undefined} />,
                      label: <span onClick={logoutMutate}>Logout</span>
                    }
                  ]
                }}
              >
                <div className='cursor-pointer mt-2 mr-2'>
                  <img src='https://picsum.photos/200/300' className='w-10 h-10 rounded-full' />
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
          className='overflow-y-auto'
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
