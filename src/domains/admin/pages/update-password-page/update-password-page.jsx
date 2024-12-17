import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'reactstrap'
import TitlePage from 'components/atoms/title-page'
import { ALERT_TYPES } from 'constants/alert-constants'
import AdminsApiV2 from 'api/v2/admins-api-v2'
import AdminUpdatePasswordForm from 'domains/admin/organisms/admin-update-password-form'


const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg    : PropTypes.func,
    setApiErrorMsg : PropTypes.func
  })
}

const UpdatePasswordPage = ({ pageUtils }) => {

  const handleSubmitForm = async (values, formikBag) => {

    await AdminsApiV2.updatePassword(values)
      .then(() => {
        pageUtils.setAlertMsg('Password has been changed.', ALERT_TYPES.SUCCESS)
        formikBag.resetForm()
      })
      .catch((error) => {
        formikBag.setErrors(error.response.data.messages)
        pageUtils.setApiErrorMsg(error.response.data)
      })
  }

  return (
    <>
      <TitlePage mainTitle={ 'Update' } subTitle={ 'Password' } />

      <Card body>
        <AdminUpdatePasswordForm
          handleSubmitForm={ handleSubmitForm }
        />
      </Card>
    </>
  )
}

UpdatePasswordPage.propTypes = propTypes

export default UpdatePasswordPage