import { Card } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  address   : PropTypes.object,
  isLoading : PropTypes.boolean
}

const CustomerAddressCard = ({ address }) => (
  <Card className='small p-3 shadow'>
    {
      <>
        <div className='d-flex justify-content-between mb-3'>
          <div className='text-capitalize text-truncate font-weight-bold'>
            { address.recipient_name }
          </div>
          <div>
            { address.telephone }
          </div>
        </div>
        <div className='text-capitalize'>
          { address.street_address }<br/>
          { address.sub_district }{ ', ' }{ address.district }<br/>
          { address.city }{ ', ' }{ address.province }{ ', ' }{ address.postal_code }<br/>
        </div>
      </>
    }

  </Card>
)

CustomerAddressCard.propTypes = {
  address: PropTypes.shape({
    recipient_name : PropTypes.string,
    telephone      : PropTypes.string,
    street_address : PropTypes.string,
    sub_district   : PropTypes.string,
    district       : PropTypes.string,
    city           : PropTypes.string,
    province       : PropTypes.string,
    postal_code    : PropTypes.string
  })
}

CustomerAddressCard.defaultProps = {
  address: {
    recipient_name : 'default recipient_name',
    telephone      : 'default telephone',
    street_address : 'default street_address',
    sub_district   : 'default sub_district',
    district       : 'default district',
    city           : 'default city',
    province       : 'default province',
    postal_code    : 'default postal_code'
  }
}

CustomerAddressCard.propTypes = propTypes

export default CustomerAddressCard