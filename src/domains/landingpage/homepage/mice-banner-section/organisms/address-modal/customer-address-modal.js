import CustomerAddressCardRadio from 'domains/customer/organisms/address-card-radio'
import AddressForm  from 'domains/customer/organisms/address-form'
import { useState } from 'react'
import { Alert, Button, Modal, ModalBody } from 'reactstrap'
import CustomerApiV2 from 'api/v2/admins/customer-api-v2'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const propTypes = {
  toggle              : PropTypes.func,
  isModalOpen         : PropTypes.boolean,
  customerId          : PropTypes.number,
  addresses           : PropTypes.array,
  selectedAddress     : PropTypes.object,
  fetchAddresses      : PropTypes.func,
  handleSelectAddress : PropTypes.func
}


const FORM_ACTION = {
  UPDATE : 'update',
  CREATE : 'create'
}

const CustomerAddressModal = ({
  toggle,
  isModalOpen,
  customerId,
  addresses,
  selectedAddress,
  fetchAddresses,
  handleSelectAddress
}) => {

  const [ isListVisible, setIsListVisible ]   = useState(true)
  const [ editAddress, setEditAddress ]       = useState({})
  const [ formButtonText, setFormButtonText ] = useState(FORM_ACTION.UPDATE)
  const [ formAction, setFormAction ]         = useState(null)

  const createAddress = (address) => {
    CustomerApiV2.updateAddress(address)
      .then(() => {
        fetchAddresses()
        setIsListVisible(true)
        setFormButtonText(FORM_ACTION.UPDATE)
      })
      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }

  const updateAddress = (address) => {

    CustomerApiV2.updateAddress(address)
      .then(() => {
        fetchAddresses()
        setIsListVisible(true)
      })
      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }

  const handleClickEditAddress = (editAddress) => {
    setEditAddress(editAddress)
    setFormAction(FORM_ACTION.UPDATE)
    setIsListVisible(false)
  }

  const handleClickFormCancel = () => {
    setIsListVisible(true)
  }

  /**
   * Close modal if we AddressList visible
   * Back to AddressList if Form visible
   */
  const handleClickBack = () => {
    if (isListVisible) {
      toggle()
    } else {
      setIsListVisible(true)
      setFormAction(null)
    }
  }

  const handleSubmitForm = (address) => {
    if (formAction == FORM_ACTION.CREATE) createAddress(address)
    if (formAction == FORM_ACTION.UPDATE) updateAddress(address)
  }

  const Header = () => (
    <div className='d-flex align-items-center mb-4'>
      <i className='fas fa-chevron-left'
        onClick={ () => handleClickBack() }
      />
    </div>
  )

  const CheckoutAddressList = () => {
    if (addresses.length === 0) {
      return <Alert color='info'><i className='fas fa-info-circle mr-2'/>You have no addresses saved.</Alert>
    }
    else {
      return (
        addresses.map((address) => (
          <CustomerAddressCardRadio
            key={ `checkout-address-card-radio-${address.id}` }
            address={ address }
            isSelected={ selectedAddress.id == address.id }
            handleClickEdit={ handleClickEditAddress }
            handleSelect={ handleSelectAddress }
          />
        ))
      )
    }
  }

  return (
    <Modal
      scrollable
      centered
      isOpen={ isModalOpen }
      toggle={ () => toggle(!isModalOpen) }
      className='mx-auto my-auto'
    >
      <ModalBody>

        <Header />
        {
          isListVisible
            ? (
              <>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                  <h4 className='my-0'>Addresses</h4>
                  <Button
                    size='sm'
                    color='success'
                    tag={ Link }
                    to={ `/app/customers/${customerId}/addresses/create` }
                  >
                    { 'Create Address' }
                  </Button>
                </div>
                <CheckoutAddressList/>
              </>
            )
            : (
              <AddressForm
                address={ editAddress }
                buttonText={ formButtonText }
                handleSubmitForm={ handleSubmitForm }
                handleCancel={ handleClickFormCancel }
              />
            )
        }

      </ModalBody>
    </Modal>
  )
}

CustomerAddressModal.propTypes = propTypes

export default CustomerAddressModal