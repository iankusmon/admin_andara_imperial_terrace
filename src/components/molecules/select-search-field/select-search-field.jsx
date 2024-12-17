import { useField } from 'formik'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Spinner
} from 'reactstrap'
import './select-search-field.scss'

const propTypes = {
  id                     : PropTypes.string,
  value                  : PropTypes.any,
  name                   : PropTypes.string,
  option                 : PropTypes.object,
  type                   : PropTypes.string,
  label                  : PropTypes.string.isRequired,
  required               : PropTypes.bool,
  placeholder            : PropTypes.string,
  formText               : PropTypes.string,
  onSearchChange         : PropTypes.func.isRequired,
  onSelect               : PropTypes.func,
  getOptionValue         : PropTypes.func,
  getOptionLabel         : PropTypes.func,
  getSelectedOptionLabel : PropTypes.func,
  dataList               : PropTypes.arrayOf(PropTypes.object),
  isLoading              : PropTypes.bool.isRequired,
  disabled               : PropTypes.bool,
  // @todo: temporary solution to not break other components because we should be using field.value to get the initial value
  initialOption          : PropTypes.any
}

/**
 * Select Input hooked up to Formik (only to be used within a Formik component)
 * Allow user input that calls a function that calls an endpoint to search for data
 *
 * @param {string} label - name of label
 * @param {booelan} required - Display a Required badge next to label
 * @param {func} onChangeCallback - Callback function after onChange triggered
 * @param {func} onSearchChange - function to handle when the input changes
 * @param {func} getOptionValue - function to handle getting the value from the option object. Default to setting the entire object to formik value
 * @param {func} getOptionLabel - function that returns DOM to display the option object
 * @param {Array} dataList - array of objects to for the dropdown list.
 * @param {boolean} isLoading - to show a spinner if API call for search has not returned
 * @param {object} props - handles `id`, `name`, disabled prop.
 */
const SelectSearchField = ({
  label,
  required,
  formText,
  onSearchChange,
  onSelect = () => { },
  getOptionValue = (option) => option,
  getOptionLabel,
  getSelectedOptionLabel,
  dataList,
  isLoading,
  // @todo: temporary solution to not break other components because we should be using field.value to get the initial value
  // eslint-disable-next-line no-unused-vars
  initialOption,
  ...props
}) => {
  const [ field, meta, helper ] = useField(props)

  const valid   = meta.touched && !meta.error
  const invalid = meta.touched && !!meta.error

  // Temporary solution handle broken field if initialValue is `{}`, which should be `''`
  // Future works: fix all wrong initialValue implementation before removing this useEffect
  useEffect(() => {
    if (JSON.stringify(field.value) === '{}') {
      helper.setValue('')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [ dropdownOpen, setDropdownOpen ] = useState(false)

  const hasSelectedOption = !!field.value

  const toggle = () => setDropdownOpen((prevState) => !prevState)

  const onChange = (event) => {
    if (!dropdownOpen) setDropdownOpen(true)
    onSearchChange(event)
  }

  const handleClickInputCross = () => {
    helper.setValue('')
  }

  const SearchResults = ({ dataList }) => {
    const isResultsExist = Array.isArray(dataList) && dataList.length

    if (isResultsExist) {
      return (
        dataList.map((datum, index) => (
          <DropdownItem
            key={ `serach-result-datum-${index}` }
            onClick={ () => {
              helper.setValue(getOptionValue(datum))
              onSelect(datum)
            } }
          >
            { getOptionLabel(datum) }
          </DropdownItem>
        ))
      )
    } else {
      return (
        <DropdownItem>
          { 'No Options.' }
        </DropdownItem>
      )
    }
  }

  const SelectedOption = ({ option }) => {

    const isCustomSelectedOptionLabelExist = !!getSelectedOptionLabel

    const optionLabel = isCustomSelectedOptionLabelExist ? getSelectedOptionLabel(option) : getOptionLabel(option)

    return (
      <div
        className='d-flex form-control align-items-center'
        disabled={ props.disabled }
      >
        <span className='mr-3'>{ optionLabel }</span>
        {
          !props.disabled &&
            (
              <i
                className='fas fa-times-circle text-danger'
                style={{ fontSize: '1.2rem' }}
                onClick={ handleClickInputCross }
              />
            )
        }
      </div>
    )
  }

  return (
    <FormGroup>
      <div>
        {
          label && (
            <Label
              for={ props.id || props.name }
              className='text-capitalize font-weight-bolder'
            >
              { label }
            </Label>
          )
        }
        {
          required &&
          <Badge color='warning' className={ 'ml-1' }>
            <i className='fas fa-asterisk'/>
          </Badge>
        }
      </div>

      <Dropdown isOpen={ dropdownOpen } toggle={ !props.disabled ? toggle : undefined } className='d-block'>
        <DropdownToggle tag={ 'div' }>
          {
            hasSelectedOption
              ? <SelectedOption option={ field.value }/>
              :  (
                <>
                  <Input
                    valid={ valid }
                    invalid={ invalid }
                    type={ props.type }
                    placeholder={ props.placeholder }
                    onChange={ onChange }
                    { ...props }
                  />

                  {
                    !dropdownOpen && (
                      <>
                        { formText && <FormText>{ formText }</FormText> }
                        { meta.error && <FormFeedback>{ JSON.stringify(meta.error) }</FormFeedback> }
                      </>
                    )
                  }
                </>
              )
          }


        </DropdownToggle>
        <DropdownMenu
          className='w-100'
          style={  dataList.length ? { height: '400px', overflowY: 'auto' } : {} }
        >
          {
            isLoading
              ? <DropdownItem><Spinner type='grow' size="sm" color="primary" />{ ' Loading...' }</DropdownItem>
              : <SearchResults dataList={ dataList }/>
          }
        </DropdownMenu>
      </Dropdown>

    </FormGroup>
  )
}

SelectSearchField.propTypes = propTypes
export default SelectSearchField