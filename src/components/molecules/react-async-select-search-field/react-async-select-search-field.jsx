import React, { useState } from 'react'
import { Badge, FormGroup, Label, FormText } from 'reactstrap'
import { useField } from 'formik'
import AsyncSelect from 'react-select/async'
import PropTypes from 'prop-types'


const propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  name               : PropTypes.string,
  label              : PropTypes.string,
  placeholder        : PropTypes.string,
  formGroupClassName : PropTypes.string,
  formText           : PropTypes.string,
  required           : PropTypes.bool,
  isLoading          : PropTypes.bool,
  setInputValue      : PropTypes.func,
  getOptionLabel     : PropTypes.func,
  loadOptions        : PropTypes.func,
  currentValue       : PropTypes.object
}

/**
 * Select search Async Input field that build with `react-select/async`.
 * Only to be used within a Formik component.
 *
 * @param {string} label - Field label
 * @param {string} placeholder - Field placeholder
 * @param {booelan} required - Display a Required badge next to label
 * @param {bool} isLoading - Loading when searching the option
 * @param {func} formText - Description field
 * @param {func} formGroupClassName - Extended class name for `<FormGroup>`
 * @param {func} setInputValue - function to set input value to state
 * @param {func} getOptionLabel - function that returns label to display the option object
 * @param {func} loadOptions - async function called when input changed
 * @param {Object} currentValue - Current formik value
 * @param {Object} props - handles `name` prop.
 */
const ReactAsyncSelectSearchField = ({
  label,
  placeholder,
  required,
  isLoading,
  formText,
  formGroupClassName,
  setInputValue,
  getOptionLabel,
  loadOptions,
  currentValue,
  ...props
}) => {

  const [ field, meta, helper ] = useField(props)
  const invalid                 = meta.touched && !!meta.error

  const [ selectedOption, setSelectedOption ] = useState('')

  const value = currentValue ? currentValue : selectedOption

  // handle input change event
  const handleInputChange = (value) => {
    setInputValue(value)
  }

  // handle selection
  const handleChange = (option) => {
    // * prevent undefined value
    if (option) {

      // * set specific value to the formikBag.values
      const optionValue = option.id
      helper.setValue(optionValue)
    }
    else {
      // * we should keep update the formik value
      // * If user remove the option, we update to empty string
      helper.setValue('')
    }

    setSelectedOption(option)
  }


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

      <>
        <AsyncSelect
          { ...field }
          { ...props }
          id={ field.name }
          isLoading={ isLoading }
          isMulti={ false }
          cacheOptions
          value={ value }
          getOptionLabel={ getOptionLabel }
          getOptionValue={ (e) => e.id }
          loadOptions={ loadOptions }
          onInputChange={ handleInputChange }
          onChange={ handleChange }
          placeholder={ placeholder }
        />
        <FormText>{ formText }</FormText>
        { invalid && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{ meta.error }</div>
        ) }
      </>

    </FormGroup>
  )
}

ReactAsyncSelectSearchField.propTypes = propTypes

export default ReactAsyncSelectSearchField
