import { ICategory } from '~/types'
import { categoryApi } from '~/apis'
import { message } from 'antd'

export const handleDeleteCategory = async (
  id: string,
  categories: ICategory[],
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>
) => {
  try {
    const response = await categoryApi.deleteCategory(id)
    if (response.status === 200) {
      message.success('Xóa danh mục thành công')
    }
    /* filter */
    const newCategories = categories.filter((category) => category._id !== id)
    setCategories(newCategories)
  } catch (error) {
    message.error('Lỗi xóa danh mục')
  }
}
