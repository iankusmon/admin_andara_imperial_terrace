import { InputField, InputSelectOptions } from 'components'
import LoaderButton from 'components/molecules/loader-button'
import AddressFormField from 'domains/address/organisms/address-form-field'
import customerSchema from 'domains/customer/organisms/customer-form/customer-schema'
import { Form, Formik } from 'formik'
import TimeUtil from 'utils/time-util'
import PropTypes from 'prop-types'
import React from 'react'
import { Col, Row } from 'reactstrap'
import { GENDER  } from 'domains/seller/constants'

const propTypes = {
  customer: PropTypes.shape({
    name     : PropTypes.string,
    email    : PropTypes.string,
    mobile : PropTypes.string,
    birthday : PropTypes.date,
    gender   : PropTypes.string,
    address  : PropTypes.shape({
      id                 : PropTypes.number,
      street_address     : PropTypes.string,
      tl_province_id     : PropTypes.number,
      tl_city_id         : PropTypes.number,
      tl_district_id     : PropTypes.number,
      tl_sub_district_id : PropTypes.number,
      postal_code        : PropTypes.string
    })
  }),
  buttonText       : PropTypes.string.isRequired,
  handleSubmitForm : PropTypes.func.isRequired
}

const defaultProps = {
  customer: {
    name     : '',
    email    : '',
    mobile : '',
    birthday : TimeUtil.format('1970-01-01T01:00:01.000'),
    gender   : '',
    address  : {
      id                 : -1,
      street_address     : '',
      tl_province_id     : -1,
      tl_city_id         : -1,
      tl_district_id     : -1,
      tl_sub_district_id : -1,
      postal_code        : ''
    }
  },
  buttonText       : 'Submit',
  handleSubmitForm : () => {}
}

const CustomerForm = ({
  customer,
  buttonText,
  handleSubmitForm
}) => {
  const fieldNames = {
    streetAddress : 'address.street_address',
    provinceId    : 'address.tl_province_id',
    cityId        : 'address.tl_city_id',
    districtId    : 'address.tl_district_id',
    subDistrictId : 'address.tl_sub_district_id',
    postalCode    : 'address.postal_code'
  }


  return (
    <div>
      <Formik
        enableReinitialize= { true }
        initialValues={ customer }
        validationSchema={ customerSchema }
        onSubmit={ (values, formikBag) => handleSubmitForm(values, formikBag) }
      >
        {
          (formikBag) => (
            <Form>
              <Row>
                <Col>
                  <InputField
                    type='text'
                    name='name'
                    label='Name'
                    placeholder='Mariana'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='email'
                    label='Email'
                    placeholder='mariana@gmail.com'
                    required={ true }
                  />
                  <InputField
                    type='tel'
                    name='mobile'
                    label='Mobile'
                    placeholder='62821xxxxxx'
                    required={ true }
                  />
                  <InputField
                    type='date'
                    name='birthday'
                    label='Birthday'
                    required={ true }
                  />
                  <InputField
                    type='select'
                    name='gender'
                    label='Gender'
                    required={ true }
                  >
                    <InputSelectOptions options={ GENDER } keyPrefix={ 'gender' } />
                  </InputField>
                </Col>

                <Col>
                  <AddressFormField
                    formikBag={ formikBag }
                    fieldNames={ fieldNames }
                  />

                  <LoaderButton
                    className='float-right'
                    color='primary'
                    type='submit'
                    onSubmit={ formikBag.submitForm }
                    disabled={ formikBag.isSubmitting }
                    isLoading={ formikBag.isSubmitting }
                    text={ buttonText }
                  />
                </Col>
              </Row>
              <Row>

              </Row>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

CustomerForm.propTypes    = propTypes
CustomerForm.defaultProps = defaultProps

export default CustomerForm