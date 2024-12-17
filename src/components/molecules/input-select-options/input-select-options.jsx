import React from 'react'
import PropTypes from 'prop-types'
import StringUtil from 'utils/string-util'

const proptypes = {
  options    : PropTypes.object,
  keyPrefix  : PropTypes.string,
  stringUtil : PropTypes.func
}

const defaultProps = {
  stringUtil: StringUtil.titleCase
}

/**
 * Dyanamic options for dropdown input field.
 * @param {object} options - Dropdown options. It might be domain constant
 * @param {string} keyPrefix - Key prefix for each option. It should `<key prefix>-option-<option key>`. i.e `delivery-method-option-pickup`
 * @param {string} stringUtil - String util to parse label. Default: `stringUtil.titleCase`
 */
const InputSelectOptions = ({ options, keyPrefix, stringUtil }) => {
  const optionsComponent = Object.keys(options).map((key) => {
    let label = options[ key ]
    let value = options[ key ]
    if (typeof options[ key ] == 'object'){
      label = options[ key ].label
      value = options[ key ].value
    }
    return (
      <option
        key={ `${keyPrefix}-option-${value}` }
        value={ value }
      >
        { stringUtil(label) }
      </option>
    )
  })

  return (
    <>
      <option key='' value=''>Choose one</option>
      { optionsComponent }
    </>
  )
}

InputSelectOptions.propTypes    = proptypes
InputSelectOptions.defaultProps = defaultProps

export default InputSelectOptions