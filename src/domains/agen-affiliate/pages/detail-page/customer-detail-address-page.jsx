import PropTypes from 'prop-types'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import AddressView from 'domains/customer/molecules/address-view'
import { useHistory } from 'react-router-dom'

const propTypes = {
  customer: PropTypes.object
}

const CustomerDetailAddressPage = ({ customer }) => {
  const history = useHistory()

  const handleClickEditAddress = (address) => {
    history.push({
      pathname : `/app/customer-addresses/${address.id}/edit`,
      state    : { address: address }
    })
  }

  const handleClickNewAddress = () => {
    history.push({ pathname: `/app/customers/${customer.id}/addresses/create` })
  }

  return (
    <>
      <div className='text-right mb-3'>
        <Button
          outline
          color='primary'
          onClick={ () => handleClickNewAddress() }
        >
          <span>New Address</span>
          <i className="fas fa-plus ml-3" />
        </Button>
      </div>
      <ListGroup>
        {
          customer?.addresses && customer.addresses.map((address) => (
            <ListGroupItem key={ `address-list-item-${address.id}` }>
              <AddressView
                address={ address }
                handleClickEdit={ handleClickEditAddress }
              />
            </ListGroupItem>
          ))
        }
      </ListGroup>
    </>
  )
}

CustomerDetailAddressPage.propTypes = propTypes

export default CustomerDetailAddressPage
