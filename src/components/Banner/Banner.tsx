import { NavLink } from 'react-router-dom'

export const Banner = () => {
  return (
    <section className='banner mt-[52px]'>
      <div className='container'>
        <div className='text-center banner__img'>
          <NavLink to={''}>
            <img src='https://images.foody.vn/biz_banner/foody-675x355_foodyappbanner-636530746968443602.jpg' alt='' />
          </NavLink>
        </div>
        <div className='text-center banner_title'>
          <strong style={{ color: '#ffffff' }}>Foody App trên mobile</strong>
        </div>
        <div className='text-center banner_title--first'>
          <p style={{ color: '#ffffff' }}>Khám phá, đặt bàn, giao tận nơi</p>
        </div>
      </div>
    </section>
  )
}
