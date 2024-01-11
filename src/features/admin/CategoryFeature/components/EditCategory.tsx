import { Button, Form, Input, Modal, message } from 'antd'

import { ICategory } from '~/types'
import { categoryApi } from '~/apis'
import { getCategory } from '../utils'
import { useEffect } from 'react'

type Props = {
  isModalOpenEdit: {
    isOpen: boolean
    idCate: string
  }
  handleOk: () => void
  handleCancel: () => void
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>
}

export const EditCategory = ({ isModalOpenEdit, handleOk, handleCancel, setCategories }: Props) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (!isModalOpenEdit.isOpen) {
      form.resetFields()
    }
    if (!isModalOpenEdit.idCate) return
    const fetchCategory = async () => {
      const category = await getCategory(isModalOpenEdit.idCate)
      if (category) {
        form.setFieldsValue({
          name: category.name
        })
      }
    }
    fetchCategory()
  }, [isModalOpenEdit.idCate, form])

  const handleUpdateCate = async (value: string) => {
    try {
      const response = await categoryApi.updateCategory(isModalOpenEdit.idCate, value)
      if (response.status === 200) {
        message.success('Sửa danh mục thành công')
      }
      const categories = await categoryApi.getCategories()
      setCategories(categories.data.data)
      handleCancel()
    } catch (error) {
      message.error('Lỗi thêm danh mục')
    }
  }

  return (
    <Modal
      title='Chỉnh sửa thông tin danh mục'
      footer={null}
      open={isModalOpenEdit.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form autoComplete='off' form={form} layout='vertical' onFinish={handleUpdateCate}>
        <Form.Item
          label='Tên sanh mục'
          name='name'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên danh mục'
            }
          ]}
        >
          <Input placeholder='Tên danh mục' />
        </Form.Item>
        <div className='flex justify-end'>
          <Button htmlType='submit' className='text-right' type='primary'>
            Chỉnh sửa danh mục
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
