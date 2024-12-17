import React from 'react'
import PropTypes from 'prop-types'
import { UncontrolledTooltip } from 'reactstrap'


const propTypes = {
  /** Tooltip identifier to show and hide */
  id: PropTypes.string,

  /** Tooltip message */
  message: PropTypes.string
}

/** Display info tooltip */
const InfoToolTip = ({ id, message }) => (
  <div>
    <span id={ id }>
      <i className="fas fa-info-circle 3x" />
    </span>
    <UncontrolledTooltip target={ id }>
      { message }
    </UncontrolledTooltip>
  </div>
)

InfoToolTip.propTypes = propTypes

export default InfoToolTip
