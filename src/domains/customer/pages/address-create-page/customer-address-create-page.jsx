// import CustomersApiV2 from 'api/v2/admins/customers-api-v2'
// import UsersApiV2 from 'api/v2/admins/users-api-v2'
// import UserAddressesApiV2 from 'api/v2/admins/user-addresses-api-v2'
// import TitlePage from 'components/atoms/title-page'
// import React, { useState, useEffect } from 'react'=
// import { useParams } from 'react-router'
// import { Card, Col, Row } from 'reactstrap'
// import CustomerAddressForm from 'domains/customer/organisms/address-form'
// import { useHistory } from 'react-router-dom'
// import { ALERT_TYPES } from 'constants/alert-constants'
import PropTypes from 'prop-types'
// import CustomerDetailCard from 'domains/customer/organisms/detail-card'

// const propTypes = {
//   pageUtils: PropTypes.shape({
//     setAlertMsg    : PropTypes.func,
//     setApiErrorMsg : PropTypes.func
//   })
// }

const CustomerAddressCreatePage = ({ pageUtils }) => {
  // const [ customer, setCustomer ]   = useState({})
  // const [ isLoading, setIsLoading ] = useState(true)

  // const history         = useHistory({})
  // const { customer_id } = useParams()

  // const fetchCustomer = async () => {
  //   setIsLoading(true)
  //   await CustomersApiV2.show(customer_id)
  //     .then((response) => {
  //       const customer = response.data.customer
  //       setCustomer(customer)
  //       setuserId(customer.user_id)
  //     })
  //     .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
  //     .finally(() => setIsLoading(false))
  // }

  // const fetchUser = async () => {
  //   await UsersApiV2.show(userId)
  //     .then((response) => {
  //       setuserId(response.data.customer.user_id)
  //     })
  // }

  // useEffect(() => {
  //   // Fetch address first to set default address to state
  //   fetchCustomer()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ customer_id ])

  // const [ userId, setuserId ] = useState(null)
  // useEffect(() => {
  //   // Fetch address first to set default address to state
  //   if (userId) fetchUser()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ userId ])

  // const handleCreateAddress = async (values, formikBag) => {
  //   const params = {
  //     user_id: userId,
  //     ...values
  //   }
  //   await UserAddressesApiV2.createAddress(params)
  //     .then(() => {
  //       pageUtils.setAlertMsg('Sucessfully created new customer address!', ALERT_TYPES.SUCCESS)
  //       setTimeout(() => history.goBack(), 2000)
  //     })
  //     .catch((error) => {
  //       formikBag.setErrors(error.response.data.messages)
  //       pageUtils.setApiErrorMsg(error.response.data)
  //     })
  // }

  // return (
  //   <>
  //     <TitlePage mainTitle={ 'Customer Address' } subTitle='Create' />
  //     <Row>
  //       <Col md='9'>
  //         <Card body>
  //           <CustomerAddressForm
  //             handleSubmit={ handleCreateAddress }
  //             address={{}}
  //           />
  //         </Card>
  //       </Col>
  //       <Col md='3'>
  //         <CustomerDetailCard
  //           isLoading={ isLoading }
  //           customer={ customer }
  //         />
  //       </Col>
  //     </Row>
  //   </>
  // )
}

CustomerAddressCreatePage.propTypes = propTypes

export default CustomerAddressCreatePage
