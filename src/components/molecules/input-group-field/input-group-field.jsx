import React from 'react'
import { useField } from 'formik'
import {
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Badge,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from 'reactstrap'
import PropTypes from 'prop-types'


const propTypes = {
  label              : PropTypes.string,
  type               : PropTypes.string,
  placeholder        : PropTypes.string,
  formText           : PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  formGroupClassName : PropTypes.string,
  required           : PropTypes.bool,
  id                 : PropTypes.string,
  name               : PropTypes.string,
  inputGroupText     : PropTypes.string,
  addonType          : PropTypes.string,
  children           : PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ])
}

const defaultProps = {
  label              : '',
  type               : '',
  placeholder        : '',
  formText           : '',
  formGroupClassName : '',
  required           : false,
  id                 : '',
  name               : '',
  inputGroupText     : '',
  addonType          : 'prepend',
  children           : undefined
}


/**
 * Input field hooked up to Formik (only to be used within a Formik component)
 * Allow user input that calls a function that calls an endpoint to search for data
 *
 * @param {string} label - name of label
 * @param {booelan} required - Display a Required badge next to label
 * @param {func} formText - Description field
 * @param {func} formGroupClassName - Extended class name for `<FormGroup>`
 * @param {object} props - handles `id`, `name`, disabled prop.
 */
const InputGroupField = ({
  label,
  required,
  formText,
  formGroupClassName,
  inputGroupText,
  addonType,
  children,
  ...props
}) => {

  const [ field, meta ]           = useField(props)
  const valid                     = meta.touched && !meta.error
  const invalid                   = meta.touched && !!meta.error
  const { value, ...restOfField } = field

  // write console if we forget to set default values for this field
  if (value === undefined) console.log(`${field.name} was passed with an undefined value. Please include an initial value in your Formik implementation`)

  return (
    <FormGroup className={ formGroupClassName }>
      {
        label && (
          <Label
            for={ props.id || props.name }
            className='text-gray-light text-capitalize'
          >
            <strong>{ label }</strong>
          </Label>
        )
      }
      {
        required && (
          <Badge color='warning' className='ml-1'><i className='fas fa-asterisk' /></Badge>
        )
      }
      <InputGroup>
        {
          addonType === 'prepend' && (
            <InputGroupAddon addonType="prepend">
              <InputGroupText>{ inputGroupText }</InputGroupText>
            </InputGroupAddon>
          )
        }

        <Input
          type={ props.type }
          placeholder={ props.placeholder }
          valid={ valid }
          invalid={ invalid }
          value={ value }
          { ...restOfField }
          { ...props }
        />

        {
          addonType === 'append' && (
            <InputGroupAddon addonType="append">
              <InputGroupText>{ inputGroupText }</InputGroupText>
            </InputGroupAddon>
          )
        }
        { meta.error && <FormFeedback>{ meta.error }</FormFeedback> }
        { formText &&
          <div className='w-100'>
            <FormText>{ formText }</FormText>
          </div>
        }
      </InputGroup>
      { children }

    </FormGroup>
  )
}

InputGroupField.propTypes    = propTypes
InputGroupField.defaultProps = defaultProps

export default InputGroupField
