import CustomersApiV2 from 'api/v2/admins/customers-api-v2'
import TitlePage from 'components/atoms/title-page'
import { ALERT_TYPES } from 'constants/alert-constants'
import CustomerForm from 'domains/customer/organisms/customer-form'
import PropTypes from 'prop-types'
import React from 'react'
import { Card, CardBody } from 'reactstrap'


const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg    : PropTypes.func,
    setApiErrorMsg : PropTypes.func
  })
}

const CustomerCreatepage = ({ pageUtils }) => {

  const handleSubmitForm = async (values, formikBag) => {

    await CustomersApiV2.create(values)
      .then(() => {
        pageUtils.setAlertMsg('The Customer has been created.', ALERT_TYPES.SUCCESS)
        formikBag.resetForm()
      })
      .catch((error) => {
        formikBag.setErrors(error.response.data.messages)
        pageUtils.setApiErrorMsg(error.response.data)
      })
  }

  return (
    <>
      <TitlePage mainTitle={ 'Customer Create' } />

      <Card>
        <CardBody>
          <CustomerForm
            handleSubmitForm={ handleSubmitForm }
            buttonText={ 'CREATE' }
          />
        </CardBody>

      </Card>
    </>
  )
}

CustomerCreatepage.propTypes = propTypes

export default CustomerCreatepage
