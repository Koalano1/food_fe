import { useNavigate } from 'react-router-dom'
import { clearLS } from '~/utils/auth'

export const useLogout = () => {
  const router = useNavigate()
  const logoutMutate = async () => {
    clearLS()
    router('/login')
  }
  return {
    logoutMutate
  }
}
