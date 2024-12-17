import { CardLoader } from 'components/organisms'
import withLoader from 'hocs/with-loader'
import PropTypes from 'prop-types'
import React from 'react'
import { Card, CardHeader, Table } from 'reactstrap'


const propTypes = {
  admin: PropTypes.shape({
    id    : PropTypes.number,
    name  : PropTypes.string,
    email : PropTypes.string
  })
}

/**
 * @param {object} admin
 */
const AdminDetailCard = ({ admin }) => (
  <Card>
    <CardHeader>
      <div>
        <span className='small text-uppercase text-light font-weight-bolder'>
          { 'Sales Admin' }
        </span>
      </div>
    </CardHeader>
    <Table size='sm' responsive hover className='mb-0'>
      <tbody>
        <tr>
          <th scope='row'>ID</th>
          <td>{ admin?.id }</td>
        </tr>
        <tr>
          <th scope='row'>Name</th>
          <td>{ admin?.name }</td>
        </tr>
        <tr>
          <th scope='row'>Email</th>
          <td>{ admin?.email }</td>
        </tr>
      </tbody>
    </Table>
  </Card>
)

AdminDetailCard.propTypes = propTypes

export default withLoader(AdminDetailCard, CardLoader)
