import React from 'react'
import PropTypes from 'prop-types'
import { Input } from  'reactstrap'
import { getIn } from 'formik'

const propTypes = {
  field: PropTypes.shape({
    name     : PropTypes.string,
    value    : PropTypes.any,
    onChange : PropTypes.func,
    onBlur   : PropTypes.func
  }).isRequired,
  form: PropTypes.shape({
    touched : PropTypes.object,
    errors  : PropTypes.object
  }).isRequired,
  type: PropTypes.string.isRequired
}

/**
 * plain input that hooked up to Formik (only to be used within a Formik component)
 * It is used for
 * - `TableField`
 * - as Custom input in `TableField` component
 *
 * @param {string} type - input type could be text, number
 * @param {object} field - Formik Field. consist of `value`, `name`, `onChange` and `onBlur`
 * @param {object} form - FormikBag. also provide values, setXXXX, handleXXXX, dirty, isValid, status, etc.
 * @param {object} form.touched - Formikbag `touched`
 * @param {object} form.errors - FormikBag `errors`
 */
const InputPlainField = ({
  type,
  field,
  form: { touched, errors },
  ...props
}) => {

  // * deeply get the value by given Field Name
  const getError   = getIn(errors, field.name)
  const getTouched = getIn(touched, field.name)

  const valid   = getTouched && !getError
  const invalid = getTouched && !!getError

  return (
    <>
      <Input
        type={ type }
        { ...field }
        { ...props }
        valid={ valid }
        invalid={ invalid }
      />
    </>
  )
}

InputPlainField.propTypes = propTypes

export default InputPlainField
