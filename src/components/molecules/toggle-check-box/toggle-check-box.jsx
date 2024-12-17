import PropTypes from 'prop-types'
import { useState } from 'react'
import { Input, Label } from 'reactstrap'

const propTypes = {
  data     : PropTypes.object.isRequired,
  value    : PropTypes.bool.isRequired,
  onChange : PropTypes.func.isRequired,
  labelOn  : PropTypes.string,
  labelOff : PropTypes.string
}

/**
 * Component toggle check box to display attribute with type boolean
 * @param {object} data - data to be displayed
 * @param {boolean} value - default value of the attribute that will be shown
 * @param {function} onChange - Function that will be called when changing toggle
 * @param {string} labelOn - String to be displayed when toggle option is equal to true
 * @param {string} labelOff - String to be displayed when toggle option is equal to false
 */
const ToggleCheckBox = ({
  data,
  value,
  onChange,
  labelOn = 'Yes',
  labelOff = 'No'
}) => {
  const [ stateValue, setStateValue ] = useState(value)

  const handleChange = () => {
    onChange(data)
    setStateValue((prev) => !prev)
  }

  return (
    <Label className="custom-toggle">
      <Input
        type="checkbox"
        checked={ stateValue }
        onChange={ handleChange }
      />
      <span
        className="custom-toggle-slider rounded-circle text-success"
        data-label-off={ labelOff }
        data-label-on={ labelOn }
      />
    </Label>
  )

}

ToggleCheckBox.propTypes = propTypes

export default ToggleCheckBox
