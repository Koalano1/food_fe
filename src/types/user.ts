type Roles = 'admin' | 'customer'

export interface User {
  _id: string
  userName: string
  email: string
  mobile: string
  role: Roles
  address: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  accessToken: string
}

export interface IResUser {
  users: {
    docs: User[]
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number
    nextPage: number
  }
}
