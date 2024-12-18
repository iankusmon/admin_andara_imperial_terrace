import React from 'react'
import PropTypes from 'prop-types'
import { Button  } from 'reactstrap'
import { Form, Formik } from 'formik'
import { InputSelectOptions, InputField } from 'components'
import adminSchema from 'domains/admin/organisms/admin-form/admin-schema'
import { ROLES, ACTIVE_STATUS } from 'domains/admin/constants'

const propTypes = {
  admin: PropTypes.shape({
    name                     : PropTypes.string,
    username                 : PropTypes.string,
    email                    : PropTypes.string,
    roles                    : PropTypes.string,
    mobile                   : PropTypes.string,
    password                 : PropTypes.string,
    password_confirmation    : PropTypes.string,
    photo_profil_url         : PropTypes.string,
    active_status            : PropTypes.string
  }),
  buttonText       : PropTypes.string.isRequired,
  handleSubmitForm : PropTypes.func.isRequired
}

const AdminForm = ({
  handleSubmitForm
}) => {

  const initialValues = {
    name                  : '',
    username              : '',
    email                 : '',
    roles                 : '',
    mobile                : '',
    password              : '',
    password_confirmation : '',
    photo_profil_url      : '',
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
              placeholder='Masukan Nama Anda'
              required={ true }
            />
            <InputField
              type='text'
              name='username'
              label='Username'
              placeholder='Masukan Username Anda'
              required={ true }
            />
            <InputField
              type='email'
              name='email'
              label='Email'
              placeholder='email@gmail.com'
              required={ true }
            />
            <InputField
              type='select'
              name='roles'
              label='Roles'
              required={ true }
            >
            <InputSelectOptions options={ ROLES } keyPrefix={ 'roles' }/>
            </InputField>
            <InputField
              type='number'
              name='mobile'
              label='Nomor Handphone'
              placeholder='08xxxxxxx'
              required={ true }
            />
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
              type='string'
              name='photo_profil_url'
              label='Foto Profil'
              placeholder='Upload Foto'
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
