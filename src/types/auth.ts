import { User } from './user'

export interface ErrorReponse<Data> {
  message: string
  data?: Data
}

export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ILogin {
  email: string
  password: string
  rememberMe?: boolean
}

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expires: number
  user: User
}>

export type RefreshTokenReponse = SuccessResponse<{ access_token: string }>
