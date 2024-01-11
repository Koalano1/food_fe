import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios'
import { clearLS, getProfileFromLS } from '~/utils/auth'

const defaultHeader = (token?: string | null) => {
  if (token) {
    const headers: AxiosRequestHeaders = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    } as unknown as AxiosRequestHeaders
    if (token) headers.Authorization = `Bearer ${token}`
    return headers
  } else {
    clearLS()
  }
}
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API,
      timeout: 10000,
      headers: defaultHeader(getProfileFromLS()?.accessToken || null)
    })
  }
}

const http = new Http().instance

export default http
