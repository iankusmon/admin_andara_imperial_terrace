import InvalidFeedback from 'components/atoms/invalid-feedback'
import { useField } from 'formik'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import FieldLabel from 'components/atoms/field-label'
import { FormGroup, FormText } from 'reactstrap'

const propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  isMulti            : PropTypes.bool,
  name               : PropTypes.string,
  label              : PropTypes.string,
  placeholder        : PropTypes.string,
  formGroupClassName : PropTypes.string,
  formText           : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  required     : PropTypes.bool,
  defaultValue : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  defaultOptions  : PropTypes.array,
  onFilterOptions : PropTypes.func,
  onChange        : PropTypes.func,
  isDisabled      : PropTypes.bool
}

const defaultProps = {
  defaultOptions : [],
  isMulti        : false,
  isClearable    : true,
  onChange       : () => { }
}

/**
 * Select field hooked up to Formik. it build in by react async select
 * @param {string} name - Formik field name
 * @param {string} label - Field Label
 * @param {string} placeholder - Placeholder field
 * @param {bool} required - It will show required badge if it set `true`
 * @param {bool} formText - description text for provide information about the field
 * @param {object, array} defaultValue - default value of the option. Mostly it used when edit process
 * @param {func} defaultOptions - default options
 * @param {func} onFilterOptions - Handler to filter options
 * @param {string} formGroupClassName - FormGroup class name
 */
const SelectField = ({
  label,
  isMulti,
  placeholder,
  required,
  formText,
  defaultValue,
  defaultOptions,
  onFilterOptions,
  formGroupClassName,
  onChange,
  ...props
}) => {

  const [ field, meta, helper ]               = useField(props)
  const [ selectedOption, setSelectedOption ] = useState()
  const invalid                               = meta.touched && !!meta.error

  useEffect(() => {
    /** Responsible of setting the selected option to default value props */
    setSelectedOption(defaultValue)
  }, [ defaultValue ])

  useEffect(() => {
    /**
     * Responsible of changing selected option state to empy state ([] or '')
     * if Formik field is empty
     */
    if (isMulti && isEmpty(field.value)) {
      setSelectedOption([])
    }
    else if (!field.value && field.value !== false) {
      setSelectedOption('')
    }
  }, [ field.value, isMulti ])

  /**
   * Custom handle change to able to set the selected option to the Formik
   * @param {object, array} option - selected option
   */
  const handleOnChange = (option) => {
    if (option) {
      helper.setValue(
        isMulti
          ? option.map((item) => item.value)
          : option.value
      )
    }
    else {
      // If user remove the option, we need update to default empty value
      helper.setValue(
        isMulti
          ? []
          : ''
      )
    }

    onChange(option)
    setSelectedOption(option)
  }

  /**
   * Custom handleOnblur to solve onBlur issue on react-select when integrate with formik
   * source: https://gist.github.com/hubgit/e394e9be07d95cd5e774989178139ae8#gistcomment-3061735
   * @param {object} event - event
   */
  const handleOnBlur = (event) => {
    event.target.name = field.name
    field.onBlur(event)
  }

  /**
   * Custom asynchronously load options. provide custom filter options
   * ! Trigered at first time rendering AND user type
   * @param {string} inputValue - Input value from the user type
   */
  const promiseOptions = (inputValue) => new Promise((resolve) => {
    resolve(onFilterOptions(inputValue))
  })

  /** Set custom style to similar with ReactStrap Input */
  const customStyles = {
    control: (styles) => ({
      ...styles,
      boxShadow   : 'none',
      cursor      : props.isDisabled ? 'not-allowed' : 'default',
      borderColor : invalid ? '#fb6340' : styles['borderColor']
    })
  }

  return (
    <FormGroup className={ formGroupClassName }>
      {
        label && (
          <FieldLabel
            id={ props.id }
            name={ field.name }
            label={ label }
            required={ required }
          />
        )
      }
      <AsyncSelect
        { ...field }
        { ...props }
        className="react-select success"
        classNamePrefix="react-select"
        styles={ customStyles }
        cacheOptions
        defaultOptions={ defaultOptions }
        id={ field.name }
        isMulti={ isMulti }
        value={ selectedOption }
        loadOptions={ promiseOptions }
        onChange={ handleOnChange }
        onBlur={ handleOnBlur }
        placeholder={ placeholder }
      />
      { formText && <FormText>{ formText }</FormText> }
      { invalid &&  <InvalidFeedback error={ meta.error } /> }

    </FormGroup>
  )
}

SelectField.propTypes    = propTypes
SelectField.defaultProps = defaultProps

export default SelectField
