import React from 'react'
import PropTypes from 'prop-types'
import { Label, Badge } from 'reactstrap'


const propTypes = {
  id       : PropTypes.number,
  name     : PropTypes.string,
  label    : PropTypes.string,
  required : PropTypes.bool
}

/**
 * field label
 * @param {string} name - field identity
 * @param {string} label - field of the label
 * @param {bool} required - required label state to display
 */
const FieldLabel = ({
  name,
  label,
  required
}) => (
  <Label
    for={ name }
    className='text-gray-light text-capitalize font-weight-bolder'
  >
    { label }
    {
      required && (
        <Badge color='warning ml-1'>
          <i className='fas fa-asterisk' />
        </Badge>
      )
    }
  </Label>
)

FieldLabel.propTypes = propTypes

export default FieldLabel
