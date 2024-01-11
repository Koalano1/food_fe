import { Button, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { userApi } from '~/apis/user.api'
import { User } from '~/types/user'

export default function ProfilePage() {
  const [user, setUser] = useState<User>()

  const [form] = Form.useForm<User>()
  useEffect(() => {
    userApi.getProfile().then((data: { data: { message: string; data: User } }) => {
      setUser(data.data.data)
      form.setFieldsValue(data.data.data)
    })
  }, [form])

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user)
    }
  }, [form, user])

  const handleFinish = async (data: User) => {
    try {
      await userApi.updateUser({ ...user, ...data })
      message.success('Cập nhập tài khoản thành công')
      window.location.reload()
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    }
  }
  return (
    <div className='px-2 pb-10 bg-white rounded-sm shadow md:px-7 md:pb-20'>
      <div className='py-6 border-b border-b-gray-200'>
        <h1 className='text-lg font-medium text-gray-900 capitalize'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className='flex flex-col-reverse mt-8 md:flex-row md:items-start'>
        <Form
          form={form}
          name='basic'
          initialValues={{ remember: true }}
          className='flex-grow mt-6 md:mt-0 md:pr-12'
          onFinish={handleFinish}
        >
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{user?.email}</div>
            </div>
          </div>
          <div className='flex flex-col flex-wrap mt-6 sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <Form.Item
              name='userName'
              className='sm:w-[80%] sm:pl-5'
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input className='px-3 py-2 ' />
            </Form.Item>
          </div>
          <div className='flex flex-col flex-wrap mt-2 sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <Form.Item
              name='mobile'
              className='sm:w-[80%] sm:pl-5'
              rules={[
                {
                  pattern: /^[0-9]{10,12}$/,
                  message: 'Please enter a valid phone number'
                }
              ]}
            >
              <Input className='px-3 py-2 w' />
            </Form.Item>
          </div>
          <div className='flex flex-col flex-wrap mt-2 sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <Form.Item name='address' className='sm:w-[80%] sm:pl-5'>
              <Input className='px-3 py-2' name='address' value={user?.address} />
            </Form.Item>
          </div>
          <div className='sm:w-[80%] sm:pl-5 flex justify-center mt-2 p-2'>
            <Button
              htmlType='submit'
              className='flex items-center p-3 px-5 text-center text-white bg-orange-500 rounded-md h-9 hover:bg-orange-300/80 text-md '
            >
              Lưu
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
