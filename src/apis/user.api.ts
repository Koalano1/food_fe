import http from '~/configs/instances'
import { SuccessResponse } from '~/types/auth'
import { IResUser, User } from '~/types/user'

export const userApi = {
  getAllUser: () => {
    return http.get<SuccessResponse<IResUser>>('/users')
  },
  getProfile: () => {
    return http.get<SuccessResponse<User>>('user')
  },
  updateUser: (body: User) => {
    return http.put<SuccessResponse<User>>('user/update/' + body._id, body)
  },
  uploadAvatar: (body: FormData) => {
    return http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
