import http from '~/configs/instances'
import { AuthResponse, ILogin } from '~/types/auth'
import { IRegister } from '~/utils/validate'

export const URL_LOGIN = 'signin'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'

const authApi = {
  registerAccount(body: IRegister) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  login(body: ILogin) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  }
}

export default authApi
