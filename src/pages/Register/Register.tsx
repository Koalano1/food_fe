import { yupResolver } from '@hookform/resolvers/yup'
import { Spin, message } from 'antd'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '~/apis/auth'
import { IRegister, RegiseterSchema } from '~/utils/validate'

export default function Regiseter() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRegister>({
    mode: 'onChange',
    resolver: yupResolver(RegiseterSchema)
  })

  const onLogin = async (loginData: IRegister) => {
    try {
      setLoading(true)
      const { data } = await authApi.registerAccount(loginData)
      if (data) {
        setLoading(false)
        message.success('Register successfully')
        navigate('/login')
      }
    } catch (error: any) {
      setLoading(false)
      message.error(error.response.data.message ?? ' Register Fail')
    }
  }

  return (
    <div className='bg-[#d5e2f9] h-screen'>
      <div className='flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0'>
        {loading ? (
          <Spin />
        ) : (
          <>
            <div className='flex mb-6 p-2 text-2xl font-semibold text-gray-900 '>Food</div>
            <div className='w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-gray-700'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <div className='mt-2  text-center'>
                  <p className='text-muted'>Regiseter to your account.</p>
                </div>
                <form onSubmit={handleSubmit(onLogin)} className='space-y-3 md:space-y-5'>
                  <div>
                    <label htmlFor='userName' className='block mb-2 text-sm font-medium text-gray-900  '>
                      User Name
                    </label>
                    <input
                      id='userName'
                      className='bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     placeholder-gray-400      ring-blue-500 border-blue-500'
                      placeholder='Nguyen ..'
                      {...register('userName')}
                    />
                    {errors.userName && (
                      <span className='text-red-500 text-[13px] self-start'>{errors.userName.message}</span>
                    )}
                  </div>
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
                      {...register('passwordName')}
                    />
                    {errors.passwordName && (
                      <span className='text-red-500 text-[13px] self-start'>{errors.passwordName.message}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor='password_confirm' className='block mb-2 text-sm font-medium text-gray-90'>
                      Confirm Password
                    </label>
                    <input
                      type='password'
                      id='password_confirm'
                      placeholder='••••••••'
                      className='  border   text-gray-900 sm:text-sm rounded-lg  ring-primary-600 border-primary-600 block w-full p-2.5   placeholder-gray-400   ring-blue-500 border-blue-500'
                      {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                      <span className='text-red-500 text-[13px] self-start'>{errors.confirmPassword.message}</span>
                    )}
                  </div>

                  <button
                    type='submit'
                    className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-primary-700 focus:ring-primary-800'
                  >
                    Sign up
                  </button>

                  <p className='text-sm font-light text-gray-500  flex justify-center items-center '>
                    <span> Do have an account yet?</span>
                    <Link to='/login' className='font-medium   p-2   text-primary-600 hover:underline '>
                      Sign in
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
