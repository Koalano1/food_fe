import { Banner, Sidebar } from '~/components'
import { ICategory, IProduct } from '~/types'
import { getAllProducts, getCategories } from './utils'
import { useEffect, useState } from 'react'

import { HomeFeature } from '~/features'

export const HomePage = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const product = await getAllProducts()
      const category = await getCategories()
      if (product && category) {
        setProducts(product.data)
        setCategories(category.data)
      }
    }
    fetchData()
  }, [])

  const handleFillterProductWithCategory = async (idCategory: string) => {
    const product = await getAllProducts()
    if (!product) return
    const products = product.data
    if (idCategory === '') {
      setProducts(products)
      return
    }
    const filterProduct = products.filter((product) => product.category._id === idCategory)
    setProducts(filterProduct)
  }

  return (
    <>
      <Banner />
      <div className='flex gap-5 px-12 py-5'>
        <section className='container discover'>
          <Sidebar categories={categories} onClick={handleFillterProductWithCategory} />
          <HomeFeature products={products} />
        </section>
      </div>
    </>
  )
}
