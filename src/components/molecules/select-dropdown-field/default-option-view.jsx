import PropTypes from 'prop-types'

const propTypes = {
  option: PropTypes.oneOfType([
    PropTypes.option,
    PropTypes.string,
    PropTypes.shape({
      id      : PropTypes.number,
      value   : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
      label   : PropTypes.string.isRequired,
      details : PropTypes.arrayOf(PropTypes.string)
    })
  ]),
  getOptionLabel: PropTypes.func.isRequired
}

const defaultProps = {
  option: {
    id      : 0,
    label   : '',
    details : []
  },
  getOptionLabel: (option) => option.label
}

const DefaultOptionView = ({
  option,
  getOptionLabel = (option) => option.label
}) => (
  <>{ getOptionLabel(option) }</>
)

DefaultOptionView.propTypes    = propTypes
DefaultOptionView.defaultProps = defaultProps

export default DefaultOptionView