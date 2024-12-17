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
  handleCustomChange : PropTypes.func,
  dataSelected       : PropTypes.array
}

/**
 * Multiselect Async Input field that build with `react-select/async`.
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
 * @param {object} props - handles `name` prop.
 * @param {func} handleCustomChange - customize handle change for specific situation
 * @param {string} dataSelected - selected data from handle custom change func
 */
const ReactAsyncMultiselectField = ({
  label,
  placeholder,
  required,
  isLoading,
  formText,
  formGroupClassName,
  setInputValue,
  getOptionLabel,
  loadOptions,
  handleCustomChange,
  dataSelected,
  ...props
}) => {

  const [ field, meta, helper ] = useField(props)
  const invalid                 = meta.touched && !!meta.error

  const [ selectedOptions, setSelectedOptions ] = useState([])
  const isDataSelected                          = dataSelected ? dataSelected : selectedOptions

  // handle input change event
  const handleInputChange = (value) => {
    setInputValue(value)
  }

  // handle selection
  const handleChange = (options) => {
    // * prevent undefined value
    if (options) {

      // * set specific value to the formikBag.values
      const optionValue = options.map((options) => options.id)
      helper.setValue(optionValue)
    }
    else {
      // * we should keep update the formik value
      // * If user remove all options, we update to empty array
      helper.setValue([])
    }

    setSelectedOptions(options)
  }

  const isHandleCustomChange = handleCustomChange ? handleCustomChange : handleChange

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
          isMulti
          cacheOptions
          value={ isDataSelected }
          getOptionLabel={ getOptionLabel }
          getOptionValue={ (e) => e.id }
          loadOptions={ loadOptions }
          onInputChange={ handleInputChange }
          onChange={ isHandleCustomChange }
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

ReactAsyncMultiselectField.propTypes = propTypes

export default ReactAsyncMultiselectField
