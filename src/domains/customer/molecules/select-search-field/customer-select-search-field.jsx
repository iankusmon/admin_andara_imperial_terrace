import CustomersApiV2 from 'api/v2/admins/customers-api-v2'
import { SelectSearchField } from 'components'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'


const propTypes = {
  name     : PropTypes.string,
  label    : PropTypes.string,
  required : PropTypes.bool
}

const defaultProps = {
  name     : '',
  label    : '',
  required : true
}

/**
 * Search field to select customer by customer code.
 * @param {string} name - Formik field name
 * @param {string} label - Field Label
 * @param {bool} required - It will show required badge if it set `true`
 */
const CustomerSelectSearchField = ({
  name,
  label,
  required,
  ...props
}) => {

  const { setFieldError, setFieldTouched, submitForm } = useFormikContext()

  const [ searchCustomers, setSearchCustomers ] = useState([])
  const [ isSearchLoading, setSearchLoading ]   = useState(false)
  var customerSearchTimeout                     = null

  // search customers by similar email or mobile number
  const getCustomers = (email_or_phone_number) => {
    setSearchLoading(true)
    const additionalFilters = {}

    if (Number.isInteger(parseInt(email_or_phone_number))){
      additionalFilters ['mobile'] = email_or_phone_number
    }
    else {
      additionalFilters ['email'] = email_or_phone_number
    }

    CustomersApiV2.get({ additionalFilters: additionalFilters })
      .then((response) => {
        setSearchCustomers(response.data.customers)
      })
      .catch(() => {
        setFieldError(name, 'Searching for Customers failed.')
        setFieldTouched(name, true, false)
      })
      .finally(() => setSearchLoading(false))
  }

  // The presentation of option label when dropdown is open
  const getOptionLabel = (option) => (
    <>
      <span className='mr-3'>{ option.email }</span>
      <span className='mr-3'>{ '-' }</span>
      <span className='mr-3'>{ option.name }</span>
      <span className='mr-3'>{ `${option.mobile === null ? '(No Phone Number)' :  `(${option.mobile})` }` } </span>
    </>
  )

  // handler to search customers
  const handleSelectSearchOnChange = (event) => {
    const searchText = event.target.value
    if (customerSearchTimeout) clearTimeout(customerSearchTimeout)
    customerSearchTimeout = setTimeout(() => {
      getCustomers(searchText)
    }, 700)
  }

  return (
    <SelectSearchField
      type='text'
      name={ name }
      label={ label }
      placeholder='Search with customer Email or Phone'
      dataList={ searchCustomers }
      onSearchChange={ handleSelectSearchOnChange }
      getOptionLabel={ getOptionLabel }
      isLoading={ isSearchLoading }
      required={ required }
      onSelect={ submitForm }
      { ...props }
    />
  )
}

CustomerSelectSearchField.propTypes    = propTypes
CustomerSelectSearchField.defaultProps = defaultProps

export default CustomerSelectSearchField
