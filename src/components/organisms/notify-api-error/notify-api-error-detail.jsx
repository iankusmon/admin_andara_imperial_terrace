import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import CardTextData from 'components/molecules/card-text-data'


const propTypes = {
  apiError: PropTypes.shape({
    title       : PropTypes.string,
    status_name : PropTypes.string,
    status      : PropTypes.number,
    code        : PropTypes.string,
    messages    : PropTypes.object,
    server      : PropTypes.string
  })
}

/**
 * Display detail Error message from the backend.
 * @param {object} apiError - Error detail
 */
const NotifyApiErrorDetail = ({ apiError }) => (
  <>
    <CardTextData label='Title' value={ apiError?.title } />
    <CardTextData label='Status Name' value={ apiError?.status_name } />
    <CardTextData label='Status' value={ apiError?.status } />
    <CardTextData label='Code' value={ apiError?.code } />
    <CardTextData label='Messages' value={
      apiError?.messages
        ? (
          <Table
            size='sm'
            bordered
            responsive
            className='text-white'
          >
            <thead>
              <tr>
                <th>Key</th>
                <th>Messages</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(apiError?.messages).map((errorKey) => (
                  <tr key={ `error-${errorKey}` }>
                    <td>{ errorKey }</td>
                    <td>
                      {
                        apiError?.messages[errorKey].map((message, index) => (
                          <li key={ `error-${errorKey}-${index}` }>{ message }</li>
                        ))
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        )
        : null
    }
    />
    <CardTextData label='Server' value={ apiError?.server } />
  </>
)

NotifyApiErrorDetail.propTypes = propTypes

export default NotifyApiErrorDetail
