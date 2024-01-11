import { Breadcrumb } from '~/components'
import { ProductFeature } from '~/features'

export default function ProductPage() {
  return (
    <div className='flex flex-col gap-6'>
      <Breadcrumb pageName='Quản lý sản phẩm' />
      <ProductFeature />
    </div>
  )
}
