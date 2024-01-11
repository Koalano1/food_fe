import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  pageName: string
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className='sm:flex-row sm:items-center sm:justify-between flex flex-col gap-3 mb-3'>
      <nav>
        <ol className='flex items-center gap-2 list-none'>
          <li>
            <Link to='/admin/home'>Dashboard /</Link>
          </li>
          <li className='text-primary'>{pageName}</li>
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumb
