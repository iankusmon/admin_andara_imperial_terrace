import { useField } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select'
import { Badge, FormGroup, Label, FormText } from 'reactstrap'


const propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  name               : PropTypes.string,
  label              : PropTypes.string,
  formGroupClassName : PropTypes.string,
  formText           : PropTypes.string,
  required           : PropTypes.bool,
  dataList           : PropTypes.arrayOf(PropTypes.object),
  isLoading          : PropTypes.bool
}


/**
 * Multiselect Input field that build with `react-select`.
 * Only to be used within a Formik component.
 *
 * @param {string} label - Field label
 * @param {booelan} required - Display a Required badge next to label
 * @param {array} dataList - List options. **Required format**: [ { value: <value>, label: <label }, {...} ]
 * @param {bool} isLoading - Loading when searching the option
 * @param {func} formText - Description field
 * @param {func} formGroupClassName - Extended class name for `<FormGroup>`
 * @param {object} props - handles `name` prop.
 */
const ReactMultiSelectSearchField = ({
  label,
  required,
  dataList,
  isLoading,
  formText,
  formGroupClassName,
  ...props
}) => {
  const [ field, meta, helper ] = useField(props)
  const invalid                 = meta.touched && !!meta.error

  const [ selectedOption, setSelectedOption ] = useState()


  useEffect(() => {
    const value = field.value

    // * skip if the value is undefined
    if (!Array.isArray(value)) return

    // * Since we transform the selected option and only set id/value to the formik values
    // * we want to take the real option object ( { value: <...>, label: < ...> } ) back
    // * if it does not exist, we set to undefined
    const selectedValues = dataList.filter((data) =>  value.includes(data.value))
    setSelectedOption(selectedValues)

  }, [ field.value, dataList ])

  /**
   * Custom handle input change
   * - transform the selected option into array of id and set to the formik
   * - set the selected options to pass to the react select
   * @param {object[]} options - array of option
   */
  const handleInputChange = (options) => {

    // * prevent undefined value
    if (options) {

      // * set specific value to the formikBag.values
      const optionValue = options.map((options) => options.value)
      helper.setValue(optionValue)
    }
    else {
      // * we should keep update the formik value
      // * If user remove all options, we update to empty array
      helper.setValue([])
    }

    setSelectedOption(options)
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
        <Select
          { ...field }
          { ...props }
          id={ field.name }
          value={ selectedOption }
          isMulti={ true }
          options={ dataList }
          isLoading={ isLoading }
          placeholder={ `Select mutliple ${label}` }
          onChange={ handleInputChange }
        />
        <FormText>{ formText }</FormText>
        { invalid && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{ meta.error }</div>
        ) }
      </>

    </FormGroup>
  )
}

ReactMultiSelectSearchField.propTypes = propTypes

export default ReactMultiSelectSearchField
