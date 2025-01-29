import CustomersApiV2 from 'api/v2/admins/customers-api-v2'
import PropTypes from 'prop-types'
import { Card } from 'reactstrap'
import ProfileForm from 'domains/customer/organisms/profile-form'
import { ALERT_TYPES } from 'constants/alert-constants'

const propTypes = {
  customer            : PropTypes.object,
  handleFetchCustomer : PropTypes.func,
  pageUtils           : PropTypes.shape({
    setAlertMsg    : PropTypes.func,
    setApiErrorMsg : PropTypes.func
  })
}

const CustomerDetailProfilePage = ({
  pageUtils,
  customer,
  handleFetchCustomer
}) => {
  const handleSubmitForm = async (values, formikBag) => {
    await CustomersApiV2.update(customer.id, values)
      .then(() => {
        pageUtils.setAlertMsg('The Customer Profile data has been updated.', ALERT_TYPES.SUCCESS)
        handleFetchCustomer()
      })
      .catch((error) => {
        formikBag.setErrors(error.response.data.messages)
        pageUtils.setApiErrorMsg(error.response.data)
      })
  }

  return (
    <Card body>
      <ProfileForm
        customer={ customer }
        handleSubmitForm={ handleSubmitForm }
      />
    </Card>
  )
}

CustomerDetailProfilePage.propTypes = propTypes

export default CustomerDetailProfilePage
