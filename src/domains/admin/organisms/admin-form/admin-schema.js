import * as Yup from 'yup'

const adminSchema = Yup.object().shape({

  name: Yup.string()
    .min(2, 'At least 2 characters')
    .required('Required'),

  email: Yup.string()
    .min(2, 'At least 2 characters')
    .email('Invalid email')
    .required('Required')
    .matches(/@tinkerlust.com+$/, 'Only accept tinkerlust email'),

  access: Yup.string()
    .required('Required'),

  password: Yup.string()
    .min(8, 'At least 8 characters')
    .required('Required'),

  password_confirmation: Yup.string()
    .oneOf([ Yup.ref('password'), null ], 'Passwords don\'t match')
    .required('Required'),

  active_status: Yup.string()
    .required('Required')
})

export default adminSchema