import React from 'react'
import PropTypes from 'prop-types'
import { Button  } from 'reactstrap'
import { Form, Formik } from 'formik'
import { InputSelectOptions, InputField } from 'components'
import adminSchema from 'domains/admin/organisms/admin-form/admin-schema'
import { ACCESS, ACTIVE_STATUS } from 'domains/admin/constants'

const propTypes = {
  admin: PropTypes.shape({
    name                  : PropTypes.string,
    email                 : PropTypes.string,
    access                : PropTypes.string,
    password              : PropTypes.string,
    password_confirmation : PropTypes.string,
    active_status         : PropTypes.string
  }),
  buttonText       : PropTypes.string.isRequired,
  handleSubmitForm : PropTypes.func.isRequired
}

const AdminForm = ({
  handleSubmitForm
}) => {

  const initialValues = {
    name                  : '',
    email                 : '',
    access                : '',
    password              : '',
    password_confirmation : '',
    active_status         : ''
  }

  return (
    <Formik
      enableReinitialize= { true }
      initialValues={ initialValues }
      validationSchema={ adminSchema }
      onSubmit={ (values, formikBag) => handleSubmitForm(values, formikBag) }
    >
      {
        (formikBag) => (
          <Form>
            <InputField
              type='text'
              name='name'
              label='Name'
              placeholder='Tinkerlust'
              required={ true }
            />
            <InputField
              type='email'
              name='email'
              label='Email'
              placeholder='email@tinkerlust.com'
              required={ true }
            />
            <InputField
              type='select'
              name='access'
              label='Access'
              required={ true }
            >
              <InputSelectOptions options={ ACCESS } keyPrefix={ 'access' } />
            </InputField>
            <InputField
              type='password'
              name='password'
              label='Password'
              required={ true }
            />
            <InputField
              type='password'
              name='password_confirmation'
              label='Password Confirmation'
              required={ true }
            />
            <InputField
              type='select'
              name='active_status'
              label='Active Status'
              required={ true }
            >
              <InputSelectOptions options={ ACTIVE_STATUS } keyPrefix={ 'active_status' } />
            </InputField>
            <Button
              color='primary'
              disabled={ formikBag.isSubmitting }
              onClick={ () => formikBag.submitForm() }
            >
              { 'Create Admin' }
            </Button>
          </Form>
        )
      }
    </Formik>
  )
}

AdminForm.propTypes = propTypes

export default AdminForm
