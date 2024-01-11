import { useEffect, useState } from 'react'

import { CategoryFeature } from '~/features'
import { ICategory } from '~/types'
import { categoryApi } from '~/apis'
import { message } from 'antd'

export default function CategoryPage() {
  const [categories, setCategories] = useState<ICategory[]>([])
  useEffect(() => {
    const featchCategories = async () => {
      try {
        const response = await categoryApi.getCategories()
        setCategories(response.data.data.reverse())
      } catch (error) {
        message.error('Lỗi tải danh mục')
      }
    }
    featchCategories()
  }, [])
  return <CategoryFeature data={categories.reverse()} setCategories={setCategories} />
}
