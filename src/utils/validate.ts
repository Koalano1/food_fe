import * as Yup from 'yup'

export const LoginSchema = Yup.object({
  email: Yup.string().trim().required('Email is required'),
  password: Yup.string().trim().required('Password is required'),
  rememberMe: Yup.boolean()
})

export const RegiseterSchema = Yup.object({
  email: Yup.string().email('Email Không  đúng định dạng ').required('Bạn không được để trống'),
  userName: Yup.string().required('Bạn không được để trống'),
  passwordName: Yup.string().required('Bạn không được để trống'),
  confirmPassword: Yup.string()
    .required('không được để trống')
    .oneOf([Yup.ref('passwordName')], 'Nhập lại mật khẩu không khớp')
})

export type IRegister = Yup.InferType<typeof RegiseterSchema>
