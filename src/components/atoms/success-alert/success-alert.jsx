import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'


const propTypes = {
  /** Message of the alert */
  message: PropTypes.string,

  /** Set true will open the alert. otherwise, it is close */
  isOpen: PropTypes.bool.isRequired,

  /** Handler to dismiss the alert */
  onDismiss: PropTypes.func,

  /** Button component. Typically for directing to certain page */
  buttonComp: PropTypes.element
}

/** Display success alert to user */
const SuccessAlert = ({
  message,
  isOpen,
  onDismiss,
  buttonComp
}) => (
  <Alert color='success' isOpen={ isOpen } toggle={ onDismiss } >
    <span className='mr-1'>
      <strong>Success! &nbsp;</strong>{ message } { buttonComp ? buttonComp : null }
    </span>
  </Alert>
)

SuccessAlert.propTypes = propTypes

export default SuccessAlert
