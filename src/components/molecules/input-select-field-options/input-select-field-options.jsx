import PropTypes from 'prop-types'

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label : PropTypes.string.isRequired,
    value : PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }))
}

/**
 * For input select field Options with Label and Value.
 * @param {arrayofobject} options - Dropdown options. It might be domain constant
 * If Label in Option is empty, InputSelectFieldOptions will display Title Cased Value
 */
const InputSelectFieldOptions = ({ options }) => (
  options.map(
    ({ label, value }) => (
      <option
        key={ `${label}-${value}` }
        label={ label }
        value={ value }
      />
    ))
)

InputSelectFieldOptions.propTypes = propTypes
export default InputSelectFieldOptions