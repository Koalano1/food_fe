import { NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer>
      <div className='container flex'>
        <nav>
          <h5>Khám phá</h5>
          <ul>
            <li className='style-li'>
              <NavLink to=''>Ứng dụng Mobile</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>Tạo bộ sưu tập</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>Bảo mật thông tin</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>Quy định</NavLink>
            </li>
          </ul>
        </nav>
        <nav>
          <h5>Công ty</h5>
          <ul>
            <li className='style-li'>
              <NavLink to=''>Giới thiệu</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>Trợ giúp</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>Việc làm</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>Quy chế</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''> Thỏa thuận sử dụng dịch vụ</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>Liên hệ</NavLink>
            </li>
          </ul>
        </nav>
        <nav>
          <h5>Tham gia trên</h5>
          <ul>
            <li className='style-li'>
              <NavLink to=''>Facebook</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>Instagram</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>Youtube</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>Google</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>ShopeeFood.vn - giao đồ ăn tận nơi</NavLink>
            </li>
          </ul>
        </nav>
        <nav>
          <h5>Giấy phép</h5>
          <ul>
            <li className='style-li'>
              <NavLink to=''>JGF 123/ND-HMTTDH</NavLink>
            </li>
            <li className='style-li'>
              <NavLink to=''>
                <img width='160px' height='60px' src='https://www.foody.vn/style/images/gov_seals.jpg' alt='' />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className='text-center footer__content'></div>
    </footer>
  )
}
