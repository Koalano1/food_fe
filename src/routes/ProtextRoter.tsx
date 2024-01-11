import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from '~/ContexData/app.contex'
import { getProfileFromLS } from '~/utils/auth'

export const ProtextRoter = () => {
  const { isAuthenticated } = useContext(AppContext)
  const user = getProfileFromLS()
  return isAuthenticated || user?.accessToken ? <Outlet /> : <Navigate to='/login' />
}
export const ProtextRoterAdmin = () => {
  const { isAuthenticated, profile } = useContext(AppContext)

  return isAuthenticated && profile && profile.role == 'admin' ? <Outlet /> : <Navigate to='/' />
}
export const RejectRoter = () => {
  const { isAuthenticated } = useContext(AppContext)
  const user = getProfileFromLS()

  return !isAuthenticated || !user ? <Outlet /> : <Navigate to='/' />
}
