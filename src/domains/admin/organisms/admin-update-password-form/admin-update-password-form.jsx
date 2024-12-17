import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import { Form, Formik } from 'formik'
import { InputField } from 'components'
import adminUpdatePasswordSchema from 'domains/admin/organisms/admin-update-password-form/admin-update-password-schema'

const propTypes = {
  admin: PropTypes.shape({
    current_password      : PropTypes.string,
    new_password          : PropTypes.string,
    password_confirmation : PropTypes.string
  }),
  buttonText       : PropTypes.string.isRequired,
  handleSubmitForm : PropTypes.func.isRequired
}

const AdminForm = ({
  handleSubmitForm
}) => {

  const initialValues = {
    current_password      : '',
    new_password          : '',
    password_confirmation : ''
  }

  return (
    <Formik
      enableReinitialize= { true }
      initialValues={ initialValues }
      validationSchema={ adminUpdatePasswordSchema }
      onSubmit={ (values, formikBag) => handleSubmitForm(values, formikBag) }
    >
      {
        (formikBag) => (
          <Form>
            <InputField
              type='password'
              name='current_password'
              label='Current Password'
              required={ true }
            />
            <InputField
              type='password'
              name='new_password'
              label='New Password'
              required={ true }
            />
            <InputField
              type='password'
              name='password_confirmation'
              label='Password Confirmation'
              required={ true }
            />
            <Button
              color='primary'
              disabled={ formikBag.isSubmitting }
              onClick={ () => formikBag.submitForm() }
            >
              { 'Update Password' }
            </Button>
          </Form>
        )
      }
    </Formik>
  )
}

AdminForm.propTypes = propTypes

export default AdminForm
