import { ICategory } from '~/types'
import { categoryApi } from '~/apis'
import { message } from 'antd'

export const handleSubmit = async (
  value: string,
  categories: ICategory[],
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await categoryApi.createCategory(value)
    if (response.status === 200) {
      message.success('Thêm danh mục thành công')
      setCategories([...categories, response.data.data].reverse())
    }
    setIsModalOpen(false)
  } catch (error) {
    message.error('Lỗi thêm danh mục')
  }
}

export const handleUpdateCate = async () => {}
