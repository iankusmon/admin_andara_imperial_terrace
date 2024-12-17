import CurrencyInput from 'components/molecules/currency-input'
import { Field } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Badge, FormGroup, FormText, Label } from 'reactstrap'


const propTypes = {
  id                 : PropTypes.string,
  name               : PropTypes.string,
  label              : PropTypes.string,
  formText           : PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  formGroupClassName : PropTypes.string,
  required           : PropTypes.bool
}

/**
 * Currency Input field hooked up to Formik (only to be used within a Formik component)
 *
 * @param {string} name - Field name
 * @param {string} label - name of label
 * @param {string} formText - Description field
 * @param {booelan} required - Display a Required badge next to label
 * @param {func} formGroupClassName - Extended class name for `<FormGroup>`
 * @param {object} props - handles `id`, `name`, disabled prop.
 */
const CurrencyInputField = ({
  name,
  label,
  formText,
  required,
  formGroupClassName,
  ...props
}) => (
  <FormGroup className={ formGroupClassName }>
    {
      label && (
        <Label
          for={ props.id || props.name }
          className='text-gray-light form-control-label font-weight-bold text-capitalize'
        >
          { label }
        </Label>
      )
    }
    {
      required && <Badge color='warning' className='ml-1'><i className='fas fa-asterisk'/></Badge>
    }
    <Field
      component={ CurrencyInput }
      name={ name }
      className="form-control"
      { ...props }
    />
    { formText && <FormText>{ formText }</FormText> }
  </FormGroup>
)

CurrencyInputField.propTypes = propTypes

export default CurrencyInputField