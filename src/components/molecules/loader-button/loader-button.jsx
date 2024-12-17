import React from 'react'
import PropTypes from 'prop-types'
import { Button, Spinner } from 'reactstrap'


const propTypes = {
  text      : PropTypes.string,
  props     : PropTypes.object,
  isLoading : PropTypes.bool,
  disabled  : PropTypes.bool
}

const defaultValues = {
  isLoading : false,
  disabled  : false,
  text      : 'Submit'
}

/**
 * Button action for row in the ReactTable. It used to execute certain action by id at single rows
 * @param {string} text text of the button
 * @param {boolean} isLoading text of the button
 * @param {object} props props
 */
const LoaderButton = ({
  isLoading,
  disabled,
  text,
  ...props
}) => (
  <Button
    disabled={ disabled || isLoading }
    { ...props }
  >
    { isLoading ? <Spinner className='mr-1' size="sm" color="secondary" /> : null }
    { text }
  </Button>
)

LoaderButton.propTypes    = propTypes
LoaderButton.defaultProps = defaultValues

export default LoaderButton