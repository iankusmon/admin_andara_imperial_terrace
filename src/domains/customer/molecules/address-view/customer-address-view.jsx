import { Badge, Button, Table } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  address: PropTypes.shape({
    recipient_name      : PropTypes.string,
    telephone           : PropTypes.string,
    street_address      : PropTypes.string,
    sub_district        : PropTypes.string,
    district            : PropTypes.string,
    city                : PropTypes.string,
    province            : PropTypes.string,
    postal_code         : PropTypes.string,
    is_customer_default : PropTypes.bool,
    alias               : PropTypes.string
  }),
  handleClickEdit: PropTypes.func
}

const CustomerAddressView = ({
  address,
  handleClickEdit
}) => (
  <>
    <div className='d-flex align-items-center mb-3'>
      <h3 className='font-weight-bold mb-0'>{ address.alias || 'Missing Alias' }</h3>
      { address.is_customer_default && <Badge color='primary' className='ml-3'>Default Shipping Address</Badge> }
    </div>

    <Table size='sm' responsive hover bordered>
      <tbody>
        <tr>
          <th scope='row'>Recipient Name</th>
          <td>{ address.recipient_name }</td>
        </tr>
        <tr>
          <th scope='row'>Recipient Phone</th>
          <td>{ address.telephone }</td>
        </tr>
        <tr>
          <th scope='row'>Phone Number</th>
          <td>{ address.street_address }</td>
        </tr>
        <tr>
          <th scope='row'>Sub District</th>
          <td>{ address.sub_district }</td>
        </tr>
        <tr>
          <th scope='row'>District</th>
          <td>{ address.district }</td>
        </tr>
        <tr>
          <th scope='row'>City</th>
          <td>{ address.city }</td>
        </tr>
        <tr>
          <th scope='row'>Province</th>
          <td>{ address.province }</td>
        </tr>
        <tr>
          <th scope='row'>Postal Code</th>
          <td>{ address.postal_code }</td>
        </tr>
      </tbody>
    </Table>

    <div className='text-right'>
      <Button color='primary' onClick={ () => handleClickEdit(address) }>
        { 'Edit' }
      </Button>
    </div>
  </>
)

CustomerAddressView.propTypes = propTypes

export default CustomerAddressView
