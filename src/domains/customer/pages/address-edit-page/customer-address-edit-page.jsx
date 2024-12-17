// import UserAddressesApiV2 from 'api/v2/admins/user-addresses-api-v2'
import TitlePage from 'components/atoms/title-page'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Card, Col, Row } from 'reactstrap'
import CustomerAddressForm from 'domains/customer/organisms/address-form'
import { useHistory } from 'react-router-dom'
import { ALERT_TYPES } from 'constants/alert-constants'
import PropTypes from 'prop-types'

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg    : PropTypes.func,
    setApiErrorMsg : PropTypes.func
  })
}

const defaultProps = {
  pageUtils: {
    setAlertMsg    : () => {},
    setApiErrorMsg : () => {}
  }
}

const CustomerAddressEditPage = ({ pageUtils }) => {
  const [ address, setAddress ] = useState({})

  const { address_id } = useParams()
  const history        = useHistory({})

  // useEffect(() => {
  //   UserAddressesApiV2.show(address_id)
  //     .then((response) => {
  //       setAddress(response.data.address)
  //     })
  //     .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
  // }, [ address_id ]) // eslint-disable-line react-hooks/exhaustive-deps

  // const handleUpdateAddress = async (values, formikBag) => {
  //   await UserAddressesApiV2.updateAddress(address_id, values)
  //     .then(() => {
  //       pageUtils.setAlertMsg('Sucessfully update customer address!', ALERT_TYPES.SUCCESS)
  //       setTimeout(() => history.goBack(), 2000)
  //     })
  //     .catch((error) => {
  //       formikBag.setErrors(error.response.data.messages)
  //       pageUtils.setApiErrorMsg(error.response.data)
  //     })
  // }

  return (
    <>
      <TitlePage mainTitle={ 'Customer Address' } subTitle='Edit' />
      <Row>
        <Col md='9'>
          <Card body>
            {/* <CustomerAddressForm
              handleSubmit={ handleUpdateAddress }
              address={ address }
            /> */}
          </Card>
        </Col>
      </Row>

    </>
  )
}

CustomerAddressEditPage.propTypes    = propTypes
CustomerAddressEditPage.defaultProps = defaultProps

export default CustomerAddressEditPage
