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
  isLoading          : PropTypes.bool,
  getOptions         : PropTypes.func
}

const defaultProps = {
  getOptions: (options) => options
}

/**
 * select Input field that build with `react-select`.
 * Only to be used within a Formik component.
 *
 * @param {string} label - Field label
 * @param {booelan} required - Display a Required badge next to label
 * @param {array} dataList - List options. **Required format**: [ { value: <value>, label: <label }, {...} ]
 * @param {bool} isLoading - Loading when searching the option
 * @param {func} formText - Description field
 * @param {func} formGroupClassName - Extended class name for `<FormGroup>`
 * @param {func}   getOptions, - Function to make get options when `dataList` use grouped format
 * @param {object} props - handles `name` prop.
 */
const ReactSelectSearchField = ({
  label,
  required,
  dataList,
  isLoading,
  formText,
  getOptions,
  formGroupClassName,
  ...props
}) => {
  const [ field, meta, helper ] = useField(props)
  const invalid                 = meta.touched && !!meta.error

  const [ selectedOption, setSelectedOption ] = useState()


  useEffect(() => {
    const value = field.value

    // * skip if the value is undefined
    if (!value) return

    /**
     * Since we transform the selected option and only set id/value to the formik values,
     * we want display selected options with react-select default format option
     * {
     *   value: <...>,
     *   label: < ...>
     * }
     * if it does not exist, we set to undefined
     */
    const options       = getOptions(dataList)
    const selectedValue = options.find((data) => data.value === Number(value))

    setSelectedOption(selectedValue)
  }, [
    field.value,
    dataList,
    getOptions
  ])

  /**
   * Custom handle input change
   * - transform the selected option into id and set to the formik
   * - set the selected options to pass to the react select
   * @param {object[]} options - array of option
   */
  const handleInputChange = (option) => {

    // * prevent undefined value
    if (option) {

      // * set specific value to the formikBag.values
      const optionValue = option.value
      helper.setValue(optionValue)
    }
    else {
      // * we should keep update the formik value
      // * If user is remove option, we update to empty string
      helper.setValue('')
    }

    setSelectedOption(option)
  }

  return (
    <FormGroup className={ formGroupClassName }>
      {
        label && (
          <Label
            for={ props.id || props.name }
            className='text-gray-light text-capitalize font-weight-bolder'
          >
            { label }
          </Label>
        )
      }
      {
        required && (
          <Badge color='warning' className='ml-1'>
            <i className='fas fa-asterisk' />
          </Badge>
        )
      }

      <>
        <Select
          { ...field }
          { ...props }
          id={ field.name }
          value={ selectedOption }
          options={ dataList }
          isLoading={ isLoading }
          isMulti={ false }
          placeholder={ `Select ${label}` }
          onChange={ handleInputChange }
        />
        <FormText>{ formText }</FormText>
        {
          invalid && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>{ meta.error }</div>
          )
        }
      </>

    </FormGroup>
  )
}

ReactSelectSearchField.propTypes    = propTypes
ReactSelectSearchField.defaultProps = defaultProps

export default ReactSelectSearchField
