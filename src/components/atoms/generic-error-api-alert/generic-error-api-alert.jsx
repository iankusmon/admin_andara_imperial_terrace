import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'

const propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired
}

/**
 * Show generic error alert to user
 * @param {array} messages - Message of the alert
 */
const GenericErrorApiAlert = ({ messages }) => {
  const [ isOpen, setIsOpen ] = useState(false)

  const onDismiss = () => setIsOpen(false)

  // automatically Open Alert if messages is not empty
  useEffect(() => {
    if (Array.isArray(messages) && messages.length ) { setIsOpen(true) }
  }, [ messages ])

  return (
    <Alert color='danger' isOpen={ isOpen } toggle={ onDismiss } >
      <span className='mr-1'>
        <strong>Error! &nbsp;</strong>
        <ul>
          {
            messages.map((msg, index) => (
              <li key={ index }>
                { msg }
              </li>
            ))
          }
        </ul>
      </span>
    </Alert>
  )
}

GenericErrorApiAlert.propTypes = propTypes

export default GenericErrorApiAlert
