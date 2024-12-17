import { useState } from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormFeedback, FormGroup, FormText, Label, Spinner } from 'reactstrap'
import DefaultOptionView from './default-option-view'

const propTypes = {
  label              : PropTypes.string,
  formGroupClassName : PropTypes.string,
  required           : PropTypes.bool,
  formtext           : PropTypes.string,
  getOptionValue     : PropTypes.func,
  getOptionLabel     : PropTypes.func,
  options            : PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.object, PropTypes.string ])
  ),
  isLoading   : PropTypes.bool,
  disabled    : PropTypes.bool,
  OptionView  : PropTypes.func,
  // ...props attributes
  id          : PropTypes.string,
  name        : PropTypes.string.isRequired,
  placeholder : PropTypes.string
}

/**
 * A single option select UI component that will dynamically render your option in a DropdownMenu
 * - must be used within a Formik Form component
 * - handles single option selection
 *
 *
 * @param {string} label - display label for the input
 * @param {string} formGroupClassName - className applied to the wrapper FormGroup
 * @param {booelan} required - user must fill up this filed
 * @param {string} formtext - description of the input, rendered below the input
 * @param {func} getOptionValue - handles getting the value from the option object. Default to setting the entire object to formik value
 * @param {func} getOptionLabel - handles getting display label for the option
 * @param {Array} options - array of objects that represent the options the user can select from the dropdown menu
 * @param {boolean} isLoading - to show if the options are being fetched from API
 * @param {boolean} disabled - disable the dropdown component in this component
 * @param {React.FunctionComponent} OptionView - custom functional comp to render your option. defaults to DefaultOptionView
 * @param {object} props - {`id`, `name`, `disabled` }
 */
const SelectDropdownField = ({
  label,
  formGroupClassName,
  required = false,
  formtext,
  getOptionValue = (option) => option,
  getOptionLabel = (option) => option,
  options,
  isLoading = false,
  disabled = false,
  OptionView = DefaultOptionView,
  ...props
}) => {

  const [ field, meta, helper ] = useField(props)
  const selectedOption          = field.value

  const valid   = meta.touched && !meta.error
  const invalid = meta.touched && !!meta.error

  const validationStyle = valid
    ? 'is-valid'
    : (invalid ? 'is-invalid' : '')

  const [ dropdownOpen, setDropdownOpen ] = useState(false)

  const toggle = () => {
    if (props.disabled) return
    setDropdownOpen((prevState) => !prevState)
  }

  // Compare option.value to determine if we add or remove the selected option from Formik state
  const handleClickOption = (option) => {
    helper.setValue(option)
  }

  return (
    <FormGroup className={ formGroupClassName || '' }>
      { /* Conditionally render label */ }
      {
        label && (
          <Label
            for={ props.id || props.name }
            className='text-capitalize form-control-label font-weight-bold'
          >
            { label }
          </Label>
        )
      }
      {
        required && <Badge color='warning' className='ml-1'><i className='fas fa-asterisk' /></Badge>
      }
      <Dropdown
        isOpen={ dropdownOpen }
        toggle={ toggle }
        className={ 'd-block ' }
      >
        <DropdownToggle
          tag={ 'div' }
          disabled={ disabled }
          className={ `form-control d-flex align-items-center ${validationStyle}` }
        >

          {
            selectedOption
              ? <span>{ getOptionLabel(selectedOption) }</span>
              : <span className='text-muted'>{ props.placeholder || 'Pilih' }</span>
          }

          <i className={ 'ml-auto fas fa-chevron-down text-muted' }/>
        </DropdownToggle>

        <DropdownMenu className='w-100'>

          {
            isLoading && (
              <DropdownItem>
                <Spinner size={ 'sm' } />
                <span>Loading...</span>
              </DropdownItem>
            )
          }
          {
            options.map((option, index) => {
              const isSelected = getOptionValue(selectedOption) === getOptionValue(option)
              return (
                <DropdownItem
                  className='text-wrap'
                  key={ `${props.name}-select-option-${index}` }
                  onClick={ () => handleClickOption(option) }
                  active={ isSelected }
                >
                  <OptionView
                    option={ option }
                    getOptionLabel={ getOptionLabel }
                  />
                </DropdownItem>
              )
            })
          }

        </DropdownMenu>
      </Dropdown>
      { formtext && <FormText>{ formtext }</FormText> }
      { invalid && <FormFeedback className={ 'd-block' }>{ meta.error }</FormFeedback> }
    </FormGroup>
  )
}

SelectDropdownField.propTypes = propTypes

export default SelectDropdownField