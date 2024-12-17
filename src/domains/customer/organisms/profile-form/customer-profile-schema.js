import * as Yup from 'yup'

const profileSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),

  email: Yup.string().email()
    .required('Required'),

  mobile: Yup.string()
    .min(10, 'At least 10 digits')
    .matches(/^(^62)(\d{8,13})$/, 'Please input a valid mobile number, starting with 62')
    .required('Required'),

  birthday : Yup.date().nullable(),
  gender   : Yup.string()
    .required('Required'),

  customer_type: Yup.string()
    .required('Required')
})

export default profileSchema
