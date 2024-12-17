import React from 'react'
import PropTypes from 'prop-types'
import { Input, InputGroup, InputGroupText, InputGroupAddon, FormFeedback } from  'reactstrap'
import { getIn } from 'formik'

const propTypes = {
  field: PropTypes.shape({
    name     : PropTypes.string,
    value    : PropTypes.any,
    onChange : PropTypes.func,
    onBlur   : PropTypes.func
  }).isRequired,
  form: PropTypes.shape({
    touched       : PropTypes.object,
    errors        : PropTypes.object,
    setFieldValue : PropTypes.func
  }).isRequired,
  children: PropTypes.element
}

/**
 * Currency input that hooked up to Formik (only to be used within a Formik component)
 * It is used for
 * - `CurrencyInputField`
 * - Custome `TableField` component
 *
 * @param {object} field - Formik Field. consist of `value`, `name`, `onChange` and `onBlur`
 * @param {object} form - FormikBag. also provide values, setXXXX, handleXXXX, dirty, isValid, status, etc.
 * @param {object} form.touched - Formikbag `touched`
 * @param {object} form.errors - FormikBag `errors`
 */
const CurrencyInput = ({
  field,
  form: { touched, errors, setFieldValue },
  ...props
}) => {

  // * deeply get the value by given Field Name
  const getError   = getIn(errors, field.name)
  const getTouched = getIn(touched, field.name)

  const valid   = getTouched && !getError
  const invalid = getTouched && !!getError

  // Overwrite onChange to create custom handle change
  const handleChange = (event) => {
    const value       = event.target.value
    const parsedValue = value.replace(/\./g,'')
    // * Set to empty string if there's no value in Input field
    if (parsedValue === '') {
      event.target.value = ''

      setFieldValue(field.name, 0)
      return
    }

    // * Only update Formik value if value is a number
    if (!isNaN(parsedValue)) {
      const valueAsNumber = stringToNumber(value)
      setFieldValue(field.name, valueAsNumber)
    }
  }


  /**
   * Format input string to currecny format
   * @param {string} value - input value
   */
  const formattedValue = (value) => {
    if (!value) return '0'

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  /**
  * convert input string to integer
  * @param {value} value - input value
  */
  const stringToNumber = (value) => parseInt(value.replace(/\./g, ''), 10)

  return (
    <InputGroup>

      <InputGroupAddon addonType="prepend">
        <InputGroupText>Rp</InputGroupText>
      </InputGroupAddon>

      <Input
        { ...props }
        name={ field.name }
        valid={ valid }
        invalid={ invalid }
        type='text'
        value={ formattedValue(field.value) }
        onChange={ handleChange }
        onBlur={ field.onBlur }
      />
      <FormFeedback>{ getError }</FormFeedback>

    </InputGroup>
  )
}

CurrencyInput.propTypes = propTypes

export default CurrencyInput
