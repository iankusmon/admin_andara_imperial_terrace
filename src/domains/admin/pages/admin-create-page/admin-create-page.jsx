import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'reactstrap'
import RedirectButton from 'components/atoms/redirect-button'
import TitlePage from 'components/atoms/title-page'
import { ALERT_TYPES } from 'constants/alert-constants'
import AdminsApiV2 from 'api/v2/admins-api-v2'
import AdminForm from 'domains/admin/organisms/admin-form/admin-form'


const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg    : PropTypes.func,
    setApiErrorMsg : PropTypes.func
  })
}

const AdminCreatePage = ({ pageUtils }) => {

  const handleSubmitForm = async (values, formikBag) => {

    await AdminsApiV2.create(values)
      .then(() => {
        pageUtils.setAlertMsg('Admin has been created.', ALERT_TYPES.SUCCESS)
        formikBag.resetForm()
      })
      .catch((error) => {
        formikBag.setErrors(error.response.data.messages)
        pageUtils.setApiErrorMsg(error.response.data)
      })
  }

  return (
    <>
      <RedirectButton
        color='primary'
        className='mb-3'
        size='sm'
        text={ 'Back to list' }
        path={ '/app/super_admin/admins' }
      />

      <TitlePage mainTitle={ 'Admin' } subTitle={ 'Create' } />

      <Card body>
        <AdminForm handleSubmitForm={ handleSubmitForm }/>
      </Card>
    </>
  )
}

AdminCreatePage.propTypes = propTypes

export default AdminCreatePage