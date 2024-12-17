import PropTypes from 'prop-types'
import React from 'react'
import { useField } from 'formik'
import { FormFeedback, FormGroup, FormText, Label, Badge, Input } from 'reactstrap'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './date-input-field.css'

const propTypes = {
  id                 : PropTypes.string,
  name               : PropTypes.string.isRequired,
  label              : PropTypes.string,
  formText           : PropTypes.string,
  required           : PropTypes.bool,
  formGroupClassName : PropTypes.string
}

/**
 * Date Input field hooked up to Formik (only to be used within a Formik component)
 * Documentation for react-DatePicker : https://www.npmjs.com/package/react-datepicker
 *
 * @param {string} name - Field name
 * @param {string} label - name of label
 * @param {string} formText - Description field
 * @param {booelan} required - Display a Required badge next to label
 * @param {object} props - handles `id`, name, other ReactDatePicker (e.g DateFormat, maxDate, minDate ) props.
 */
const DateInputField = ({
  label,
  formText,
  required,
  formGroupClassName,
  ...props
}) => {
  const [ field, meta, helper ] = useField(props)
  const valid                   = meta.touched && !meta.error
  const invalid                 = meta.touched && !!meta.error

  const CustomInputView = ( props )  => (
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
      <Input
        valid={ valid }
        invalid={ invalid }
        { ...props }
      />

      <FormText>{ formText }</FormText>
      <FormFeedback>{ meta.error }</FormFeedback>
    </FormGroup>
  )

  return (
    <ReactDatePicker
      { ...props }
      selected={ (field.value && new Date(field.value)) || null }
      onChange={ ( value ) => { helper.setValue(value) } }
      customInput={
        <CustomInputView
          value={ field.value }
          { ...props }
        />
      }
    />
  )
}

DateInputField.propTypes = propTypes

export default DateInputField