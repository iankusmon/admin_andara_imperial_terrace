import PropTypes from 'prop-types'
import React from 'react'
// import NotifyApiErrorDetail from './notify-api-error-detail'
import './notify-api-error.css'


const propTypes = {
  id       : PropTypes.string,
  apiError : PropTypes.oneOfType(
    [
      PropTypes.object,
      PropTypes.string
    ]
  )
}

/**
 * Notify the API error messages and detail
 * @param {object} apiError - Error Object from the Backend
 */
const NotifyApiError = ({ apiError }) => {

  const hasErrorDetails = () => {
    const errorDetails = apiError.messages || {}
    return Object.keys(errorDetails).length > 0
  }

  return (
    <>
      <span className='mr-1 font-weight-bold'>
        { apiError?.title || 'Oops... Something went wrong.' }
      </span>
      {
        hasErrorDetails() && (
          <div className='mt-5'>
            {
              Object.keys(apiError?.messages).map((errorKey) => (
                <ul key={ `error-${errorKey}` }>
                  {
                    apiError?.messages[errorKey].map((message, index) => (
                      <li key={ `error-${errorKey}-${index}` }>{ message }</li>
                    ))
                  }
                </ul>
              ))
            }
          </div>
        )
      }
    </>
  )
}

NotifyApiError.propTypes = propTypes

export default NotifyApiError
