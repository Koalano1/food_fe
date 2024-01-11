import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Popconfirm, Table, message } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { AppContext } from '~/ContexData/app.contex'
import { userApi } from '~/apis/user.api'
import { Breadcrumb } from '~/components'
import http from '~/configs/instances'
import { SuccessResponse } from '~/types/auth'
import { User } from '~/types/user'

export default function UserPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { profile } = useContext(AppContext)
  const [form] = Form.useForm()
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    userApi.getAllUser().then((data) => {
      const res = data.data.data.users.docs
      const listExitUser = res.filter((item) => item._id != profile?._id)
      setUsers(listExitUser)
    })
  }, [profile?._id])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const onFinish = async (values: User) => {
    if (editingUser) {
      // Update existing user
      try {
        const { data } = await userApi.updateUser({ ...values, _id: editingUser._id })

        const updatedUsers = users.map((user) => {
          if (user._id == data.data._id) {
            return user?._id == data.data?._id ? data.data : user
          }
          return user
        })
        setEditingUser(null)
        setUsers(updatedUsers)
        message.success('Sửa thông tin  người dùng thành công')
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      // Add new user
      try {
        const response = await http.post<SuccessResponse<{ user: User }>>('/user/create', values)
        const data = response.data.data.user
        setUsers([...users, data])

        message.success('Thêm người dùng thành công')
      } catch (error) {
        message.error('Lỗi rồi')
        console.error('Error:', error)
      }
    }
    setIsModalVisible(false)
    form.resetFields()
    userApi.getAllUser().then((data) => {
      const res = data.data.data.users.docs
      const listExitUser = res.filter((item) => item._id != profile?._id)
      setUsers(listExitUser)
    })
  }

  const editUser = (user: User) => {
    setEditingUser(user)
    form.setFieldsValue(user)
    showModal()
  }
  const deleteUser = async (userId: string) => {
    try {
      await http.delete<SuccessResponse<User>>(`/user/delete/${userId}`)
      const updatedUsers = users.filter((user) => user._id !== userId)
      setUsers(updatedUsers)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const columns = [
    {
      title: 'Tên ',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'mobile',
      key: 'mobile'
      // render: (_: string, user: User) => (user.isActive ? 'Active' : 'IsActive')
    },

    {
      title: '',
      key: 'action',
      render: (_: string, record: User) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => editUser(record)} />

          <Popconfirm
            title={'Bạn có chắc chắn muốn xóa sản phẩm này không?'}
            onConfirm={() => deleteUser(record._id)}
            okText='Có'
            cancelText='Hủy'
          >
            <Button icon={<AiOutlineDelete />} danger />
          </Popconfirm>
        </span>
      )
    }
  ]

  return (
    <div>
      <Breadcrumb pageName='Quản lý người dùng' />

      <div className='items-center justify-between block p-4 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800 sm:flex'>
        <div className='w-full mb-1'>
          <div className='mb-4'>
            <h1 className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl'>Danh sách người dùng</h1>
          </div>
          <div className='sm:flex'>
            <div className='items-center hidden mb-3 dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100'>
              {/* <Form className='lg:pr-3'>
                <Form.Item label='Search'>
                  <Input />
                </Form.Item>
              </Form> */}
            </div>
            <div className='flex items-center ml-auto space-x-2 sm:space-x-3'>
              <Button type='primary' icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
                Thêm
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden shadow'>
              <Table columns={columns} dataSource={users} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={editingUser ? 'Sửa thông tin người dùng' : 'Thêm người dùng'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        <Form layout='vertical' form={form} onFinish={onFinish}>
          <Form.Item name='userName' label='Tên' rules={[{ required: true, message: 'Làm ơn điền đầy đủ họ tên' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name='mobile'
            label='Số điện thoại'
            rules={[
              { required: true, message: 'Please enter the mobile' },
              {
                pattern: /^[0-9]{10,12}$/,
                message: 'Số điện thoại không được để trống'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: 'Làm ơn điền Email' },
              { type: 'email', message: 'Bạn điền chưa đúng định dạng email.' }
            ]}
          >
            <Input disabled={editingUser?._id ? true : false} />
          </Form.Item>
          {editingUser?._id ? (
            <></>
          ) : (
            <Form.Item
              name='password'
              label='Mật khẩu'
              rules={[
                { required: true, message: 'Làm ơn điền mật khẩu' },
                { min: 5, message: 'Mật khẩu lớn hơn 5 kí tự' }
              ]}
            >
              <Input type='password' />
            </Form.Item>
          )}

          <Form.Item name='address' label='Địa chỉ'>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
