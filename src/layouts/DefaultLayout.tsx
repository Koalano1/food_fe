import { Banner, Footer, Header, Sidebar } from '~/components'

import { Outlet } from 'react-router-dom'

export const DefaultLayout = () => {
  return (
    <div className='flex flex-col'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
