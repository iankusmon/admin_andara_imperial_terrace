import PropTypes from 'prop-types'
import React from 'react'
import { useField } from 'formik'
import { InputGroup, InputGroupText, InputGroupAddon, FormGroup, FormText, Label, Badge, Input } from 'reactstrap'

const propTypes = {
  id                 : PropTypes.string,
  name               : PropTypes.string.isRequired,
  label              : PropTypes.string,
  formText           : PropTypes.string,
  required           : PropTypes.bool,
  formGroupClassName : PropTypes.string
}

/**
 * Colour Input field hooked up to Formik (only to be used within a Formik component)
 * Documentation for react-DatePicker : https://www.npmjs.com/package/react-input-color
 *
 * @param {string} name - Field name
 * @param {string} label - name of label
 * @param {string} formText - Description field
 * @param {booelan} required - Display a Required badge next to label
 * @param {object} props - handles `id`, name props.
 */
const ColourInputField = ({
  label,
  formText,
  required,
  formGroupClassName,
  ...props
}) => {
  const [ field, meta, helper ] = useField(props)
  const valid                   = meta.touched && !meta.error
  const invalid                 = meta.touched && !!meta.error

  return (
    <FormGroup className={ formGroupClassName }>
      {
        label
          ? (
            <Label
              for={ props.id || props.name }
              className='text-gray-light text-capitalize'
            >
              <strong>{ label }</strong>
              {
                required ? <Badge color='warning' className='ml-1'>Required</Badge> : null
              }
            </Label>
          )
          : null
      }

      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <input
              type="color"
              value={ field.value }
              onChange={ (event) => helper.setValue(event.target.value) }
            />
          </InputGroupText>
        </InputGroupAddon>

        <Input
          valid={ valid }
          invalid={ invalid }
          value={ field.value }
          onChange={ (event) => helper.setValue(event.target.value) }
          { ...props }
        />
      </InputGroup>
      <div className='text-danger'>{ meta.error }</div>
      <FormText>{ formText }</FormText>
    </FormGroup>
  )
}

ColourInputField.propTypes = propTypes

export default ColourInputField