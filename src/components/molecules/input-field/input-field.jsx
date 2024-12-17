import React from 'react'
import { useField } from 'formik'
import PropTypes from 'prop-types'
import { FormFeedback, FormGroup, FormText, Input, Label, Badge } from 'reactstrap'


const propTypes = {
  label       : PropTypes.string,
  type        : PropTypes.string,
  placeholder : PropTypes.string,
  formText    : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  formGroupClassName : PropTypes.string,
  labelClassName     : PropTypes.string,
  required           : PropTypes.bool,
  id                 : PropTypes.string,
  name               : PropTypes.string,
  children           : PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  onChange    : PropTypes.func,
  formatValue : PropTypes.func
}

const defaultProps = {
  labelClassName: 'text-gray-light text-capitalize'
}

/**
 * Input field hooked up to Formik (only to be used within a Formik component)
 * Allow user input that calls a function that calls an endpoint to search for data
 *
 * @param {string} label - name of label
 * @param {booelan} required - Display a Required badge next to label
 * @param {string} formText - Description field
 * @param {func} formGroupClassName - Extended class name for `<FormGroup>`
 * @param {func} labelClassName - Extended class name for `<Label>`
 * @param {object} props - handles `id`, `name`, disabled prop.
 */
const InputField = ({
  label,
  required,
  formText,
  formGroupClassName,
  labelClassName,
  children,
  formatValue = (value) => value,
  ...props
}) => {

  const [ field, meta ]           = useField(props)
  const valid                     = meta.touched && !meta.error
  const invalid                   = meta.touched && !!meta.error
  const { value, ...restOfField } = field

  // write console if we forget to set default values for this field
  if (value === undefined) console.log(`${field.name} was passed with an undefined value. Please include an initial value in your Formik implementation`)

  const sanitize = (event) => {
    event.target.value = formatValue(event.target.value)
    return event
  }

  const handleChange = (event) => {
    const sanitizedEvent = sanitize(event)

    if (props.onChange) {
      props.onChange(event)
    }
    else {
      field.onChange(sanitizedEvent)
    }
  }

  return (
    <FormGroup className={ formGroupClassName }>
      {
        label && (
          <Label
            for={ props.id || props.name }
            className={ labelClassName }
          >
            <strong>{ label }</strong>
          </Label>
        )
      }
      {
        required &&
        <Badge color='warning' className='ml-1'><i className='fas fa-asterisk' /></Badge>
      }
      <Input
        type={ props.type }
        placeholder={ props.placeholder }
        valid={ valid }
        invalid={ invalid }
        value={ formatValue(value) } // format display value in the frontend
        { ...restOfField } // provides `name` prop
        { ...props }
        onChange={ handleChange }  // to override existing `onChange` from `restOfField`
      >
        { children }
      </Input>

      { meta.error && <FormFeedback>{ meta.error }</FormFeedback> }
      { formText && <FormText>{ formText }</FormText> }
    </FormGroup>
  )
}

InputField.propTypes    = propTypes
InputField.defaultProps = defaultProps

export default InputField