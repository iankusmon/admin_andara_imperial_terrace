import { CardLoader } from 'components/organisms'
import withLoader from 'hocs/with-loader'
import PropTypes from 'prop-types'
import React from 'react'
import { Card, CardHeader, Table } from 'reactstrap'


const propTypes = {
  customer: PropTypes.shape({
    id     : PropTypes.number,
    name   : PropTypes.string,
    email  : PropTypes.string,
    mobile : PropTypes.string
  })
}

/**
 * @param {object} customer
 */
const CustomerDetailCard = ({ customer }) => (
  <Card>
    <CardHeader>
      <div>
        <span className='small text-uppercase text-light font-weight-bolder'>
          { 'Customer' }
        </span>
        <h2>
          <span className='mr-3'>{ customer?.name }</span>
        </h2>
      </div>
    </CardHeader>

    <Table size='sm' responsive hover className='mb-0'>
      <tbody>
        <tr>
          <th scope='row'>ID</th>
          <td>{ customer?.id }</td>
        </tr>
        <tr>
          <th scope='row'>Email</th>
          <td>{ customer?.email }</td>
        </tr>
        <tr>
          <th scope='row'>Phone Number</th>
          <td>{ customer?.mobile }</td>
        </tr>
      </tbody>
    </Table>
  </Card>
)

CustomerDetailCard.propTypes = propTypes

export default withLoader(CustomerDetailCard, CardLoader)
