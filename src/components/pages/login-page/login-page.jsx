import AdminsApiV2 from 'api/v2/admins-api-v2'
import InputField from 'components/molecules/input-field'
import PublicHeader from 'components/organisms/public-header'
import PublicPageTemplate from 'components/templates/public-page-template'
import { Form, Formik } from 'formik'
import { useAuth } from 'providers/auth-provider'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Button, Card, CardBody } from 'reactstrap'
import loginSchema from './login-schema'

const LoginPage = () => {
  useEffect(() => {
    document.body.classList.add('bg-default')
    return (() => {
      document.body.classList.remove('bg-default')
    })
  }, [])

  const authContext = useAuth()
  const history     = useHistory()
  useEffect(() => {
    if (authContext.isAuth) history.push('/app')
  },[ authContext.isAuth ]) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   *
   * @param {Object} values - object with values of inputs in form
   * @param {Object} actions - actions that can be operated on formik
   */
  const handleSubmit = async (values, actions) => {
    await AdminsApiV2.loginAdmin(values.email, values.password)
      .then((response) => {
        const admin = response.data.admin
        authContext.onLogin({
          name : admin.name,
          role : admin.access
        })
      })
      .catch((error) => {
        actions.setSubmitting(false)
        alert(error.message)
      })
  }

  return (
    <PublicPageTemplate
      header={ <PublicHeader title='Andara Imperial Terrace' lead='Admin Dashboard'/> }
    >
      <Card className="bg-secondary border-0 mb-0">
        <CardBody className="px-lg-5 py-lg-5">
          <Formik
            initialValues={{
              email    : '',
              password : ''
            }}
            validationSchema={ loginSchema }
            onSubmit={ handleSubmit }
          >
            { (formikProps) => (
              <Form>
                <InputField
                  type='email'
                  name='email'
                  placeholder='Emailll'
                />
                <InputField
                  type='password'
                  name='password'
                  placeholder='password'
                />
                <Button
                  block
                  color='primary'
                  type='submit'
                  disabled={ formikProps.isSubmitting }
                >
                Submit
                </Button>
              </Form>
            ) }

          </Formik>


        </CardBody>
      </Card>


    </PublicPageTemplate>
  )
}

export default LoginPage