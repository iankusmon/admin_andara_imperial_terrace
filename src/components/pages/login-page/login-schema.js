import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  email    : Yup.string().required('Please provide your email'),
  password : Yup.string().required('Password cannot be blank')
})

export default loginSchema