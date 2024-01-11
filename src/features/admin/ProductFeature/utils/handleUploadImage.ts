import { message } from 'antd'
import { productApi } from '~/apis'

export const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files

  if (!files) return message.error('Không có hình ảnh nào được chọn')

  const formData = new FormData()

  for (const file of files) {
    formData.append('images', file)
    const response = await productApi.uploadImage(formData)
    if (response.status === 200) {
      return response.data.url
    }
  }
}
