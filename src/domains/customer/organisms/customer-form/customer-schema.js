import * as Yup from 'yup'

// id's are set to negative if not selected
const idSchema = Yup.number()
  .positive('Required')
  .required()

const customerSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'Only letters allowed')
    .min(2, 'At least 2 characters')
    .required('Required'),
  email: Yup.string()
    .min(2, 'At least 2 characters')
    .email('Invalid email')
    .required('Required'),
  mobile: Yup.string()
    .min(10, 'At least 10 digits')
    .max(13, 'Maximal 13 digits') // since using 62 in backend validation
    .required('Required')
})

export default customerSchema
