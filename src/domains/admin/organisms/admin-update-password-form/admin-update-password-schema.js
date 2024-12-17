import * as Yup from 'yup'

const adminUpdatePasswordSchema = Yup.object().shape({
  current_password: Yup.string()
    .required('Required'),

  new_password: Yup.string()
    .min(8, 'At least 8 characters')
    .required('Required'),

  password_confirmation: Yup.string()
    .oneOf([ Yup.ref('new_password'), null ], 'Passwords don\'t match')
    .required('Required')
})

export default adminUpdatePasswordSchema