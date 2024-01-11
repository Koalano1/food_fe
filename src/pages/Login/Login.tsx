import { yupResolver } from '@hookform/resolvers/yup'
import { Spin, message } from 'antd'
import { useContext, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '~/ContexData/app.contex'
import authApi from '~/apis/auth'
import { ILogin } from '~/types/auth'
import { setProfileToLS } from '~/utils/auth'
import { LoginSchema } from '~/utils/validate'

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ILogin>({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema)
  })

  const onLogin = async (loginData: ILogin) => {
    try {
      setLoading(true)
      const { data } = await authApi.login(loginData)
      if (data) {
        setProfileToLS(data.data.user)
        setIsAuthenticated(true)
        setProfile(data.data.user)
        setLoading(false)

        if (loginData.rememberMe) {
          localStorage.remeberme = loginData.email
        }
        message.success('Đăng nhập thành công')
        data.data.user?.role == 'admin' ? navigate('/admin') : navigate('/')
        window.location.reload()
      }
    } catch (error: any) {
      setLoading(false)
      message.error(error?.response?.data.message ?? 'Đăng nhập thất bại')
    }
  }

  const rememberMe = localStorage.getItem('remeberme')
  useEffect(() => {
    if (rememberMe) {
      setValue('email', rememberMe)
    }
  }, [rememberMe, setValue])
  return (
    <div className='bg-[#d5e2f9] h-screen'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        {loading ? (
          <Spin />
        ) : (
          <>
            <div className='flex   mb-6 p-2 text-2xl font-semibold text-gray-900 '>
              {/* <img
            className='w-8 h-8 mr-2'
            src=' '
            alt='logo'
          /> */}
              Food
            </div>
            <div className='w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-gray-700'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <div className='mt-2  text-center'>
                  <h5 className=' text-2xl mb-3 text-primary text-[#5b73E8]'>Welcome back.</h5>
                  <p className='text-muted'>Please login to your account.</p>
                </div>
                <form onSubmit={handleSubmit(onLogin)} className='space-y-4 md:space-y-6'>
                  <div>
                    <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900  '>
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     placeholder-gray-400      ring-blue-500 border-blue-500'
                      placeholder='name@company.com'
                      {...register('email')}
                    />
                    {errors.email && (
                      <span className='text-red-500 text-[13px] self-start'>{errors.email.message}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-90'>
                      Password
                    </label>
                    <input
                      type='password'
                      id='password'
                      placeholder='••••••••'
                      className='  border   text-gray-900 sm:text-sm rounded-lg  ring-primary-600 border-primary-600 block w-full p-2.5   placeholder-gray-400   ring-blue-500 border-blue-500'
                      {...register('password')}
                    />
                    {errors.password && (
                      <span className='text-red-500 text-[13px] self-start'>{errors.password.message}</span>
                    )}
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-start'>
                      <div className='flex items-center h-5'>
                        <input
                          id='remember'
                          aria-describedby='remember'
                          type='checkbox'
                          className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300'
                          {...register('rememberMe')}
                        />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label htmlFor='remember' className='text-gray-500  '>
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-primary-700 focus:ring-primary-800'
                  >
                    Sign in
                  </button>

                  <p className='text-sm font-light text-gray-500  flex justify-center items-center '>
                    <span> Don’t have an account yet?</span>
                    <Link to='/register' className='font-medium   p-2   text-primary-600 hover:underline '>
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
