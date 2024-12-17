import PropTypes from 'prop-types'
import { Badge, Button, Card, Col, CustomInput, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

const propTypes = {
  address         : PropTypes.object,
  isSelected      : PropTypes.boolean,
  handleClickEdit : PropTypes.func,
  handleSelect    : PropTypes.func
}


const CustomerAddressCardRadio = ({
  address,
  isSelected,
  handleSelect
}) => (
  <div className='mb-3'>
    <div className='d-flex justify-content-between'>
      <div>
        <label className='font-weight-bold'>{ address.alias }</label>
        {
          address.is_customer_shipping_default ? <Badge className='ml-3'>Default</Badge> : null
        }
      </div>
      <Button
        size='sm'
        color='warning'
        tag={ Link }
        to={ `/app/customer-addresses/${address.id}/edit` }
      >
        { 'Edit' }
      </Button>
    </div>
    <Card
      className='p-3 shadow'
      onClick={ () => handleSelect(address) }
    >
      <Row>

        <Col xs={ 1 } className='d-flex align-'>
          <CustomInput
            id={ `address-card-radio-${ address.id }` }
            type='radio'
            className='text-capitalize text-truncate font-weight-bold '
            checked={ isSelected }
            // empty function so we dont get uncontrolled error
            onChange={ () => { } }
          />
        </Col>

        <Col>
          <div className='d-flex justify-content-between mb-3'>
            <strong>{ address.recipient_name }</strong>
            { address.telephone }
          </div>

          <Row className='small'>
            <Col>
              { address.street_address }<br/>
              { address.sub_district }{ ', ' }{ address.district }<br/>
              { address.city }{ ', ' }{ address.province }{ ', ' }{ address.postal_code }<br/>
            </Col>
          </Row>
        </Col>
      </Row>

    </Card>
  </div>
)

CustomerAddressCardRadio.propTypes = {
  address: PropTypes.shape({
    id                           : PropTypes.number,
    is_customer_shipping_default : PropTypes.bool,
    alias                        : PropTypes.string,
    recipient_name               : PropTypes.string,
    telephone                    : PropTypes.string,
    street_address               : PropTypes.string,
    sub_district                 : PropTypes.string,
    district                     : PropTypes.string,
    city                         : PropTypes.string,
    province                     : PropTypes.string,
    postal_code                  : PropTypes.string
  })
}

CustomerAddressCardRadio.defaultProps = {
  address: {
    id                           : -1,
    is_customer_shipping_default : true,
    alias                        : 'default alias',
    recipient_name               : 'default recipient_name',
    telephone                    : 'default telephone',
    street_address               : 'default street_address',
    sub_district                 : 'default sub_district',
    district                     : 'default district',
    city                         : 'default city',
    province                     : 'default province',
    postal_code                  : 'default postal_code'
  }
}

CustomerAddressCardRadio.propTypes = propTypes

export default CustomerAddressCardRadio