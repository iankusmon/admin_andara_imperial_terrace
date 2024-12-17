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
    .matches(/^(^62)(\d{8,13})$/, 'Please input valid numbers')
    .required('Required'),
  birthday : Yup.date().required('Required'),
  gender   : Yup.string()
    .required('Required'),
  address: Yup.object().shape({
    street_address: Yup.string()
      .min(5, 'At least 5 characters')
      .required(),
    tl_province_id     : idSchema,
    tl_city_id         : idSchema,
    tl_district_id     : idSchema,
    tl_sub_district_id : idSchema,
    postal_code        : Yup.string()
      .required()
      .matches(/^\d{5}(?:[-\s]\d{4})?$/, 'Invalid postal code')
      .min(5, 'At least 5 digits')
  })
})

export default customerSchema
