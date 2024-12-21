import { InputField, InputSelectOptions } from 'components'
import LoaderButton from 'components/molecules/loader-button'
import customerSchema from 'domains/customer/organisms/customer-form/customer-schema'
import { Form, Formik } from 'formik'
import TimeUtil from 'utils/time-util'
import PropTypes from 'prop-types'
import React from 'react'
import { Col, Row } from 'reactstrap'

const propTypes = {
  customer : PropTypes.shape({
    name                     : PropTypes.string,
    username                 : PropTypes.string,
    email                    : PropTypes.string,
    mobile                   : PropTypes.number,
    referreral_code          : PropTypes.string,
    visit_id                 : PropTypes.string,
    kpr_document_id          : PropTypes.string,
    villa_unit_id            : PropTypes.string,
    last_login_at            : PropTypes.string,
    villa_rent_id            : PropTypes.string,
    package_id               : PropTypes.string,
    is_buyer                 : PropTypes.string,
    is_renter                : PropTypes.string,
    is_package               : PropTypes.string,
    is_package_buyer         : PropTypes.string,
    photo_profile_url        : PropTypes.string,
    customer_address_id      : PropTypes.string,
    nik                      : PropTypes.number
  }),
  buttonText       : PropTypes.string.isRequired,
  handleSubmitForm : PropTypes.func.isRequired
}

const defaultProps = {
  customer: {
    name                     : '',
    username                 : '',
    email                    : '',
    mobile                   : '',
    referreral_code          : '',
    visit_id                 : '',
    kpr_document_id          : '',
    villa_unit_id            : '',
    last_login_at            : '',
    villa_rent_id            : '',
    package_id               : '',
    is_buyer                 : '',
    is_renter                : '',
    is_package               : '',
    is_package_buyer         : '',
    photo_profile_url        : '',
    customer_address_id      : '',
    nik                      : ''
   
  },
  buttonText       : 'Submit',
  handleSubmitForm : () => {}
}

const CustomerForm = ({
  customer,
  buttonText,
  handleSubmitForm
}) => {

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
                    placeholder='Nama Anda'
                    required={ true }
                  />
                   <InputField
                    type='text'
                    name='username'
                    label='Username'
                    placeholder='Username Anda'
                    required={ true }
                  />
                  <InputField
                    type='email '
                    name='email'
                    label='Email'
                    placeholder='example@gmail.com'
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
                    type='number'
                    name='nik'
                    label='NIK'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='photo_profile_url'
                    label='Photo Profile URL'
                    required={ true }
                  />
                </Col>
              </Row>
              <LoaderButton
                className='float-left'
                color='primary'
                type='submit'
                onSubmit={ formikBag.submitForm }
                disabled={ formikBag.isSubmitting }
                isLoading={ formikBag.isSubmitting }
                text={ buttonText }
              />
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