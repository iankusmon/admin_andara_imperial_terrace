import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  error: PropTypes.string
}

const style = {
  width     : '100%',
  marginTop : '0.25rem',
  fontSize  : '80%',
  color     : '#fb6340'
}

/**
 * imitate FormFeedback style
 * @param {string} error - error message
 */
const InvalidFeedback = ({ error }) => <div style={ style }>{ error }</div>

InvalidFeedback.propTypes = propTypes

export default InvalidFeedback
