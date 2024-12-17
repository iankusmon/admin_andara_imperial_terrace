import { SelectSearchField } from 'components'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import AdminsApiV2 from 'api/v2/admins-api-v2'


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
 * Search field to select admin by email.
 * @param {string} name - Formik field name
 * @param {string} label - Field Label
 * @param {bool} required - It will show required badge if it set `true`
 */
const AdminSelectSearchField = ({
  name,
  label,
  required,
  ...props
}) => {

  const { setFieldError, setFieldTouched, submitForm } = useFormikContext()

  const [ searchAdmins, setSearchAdmins ]     = useState([])
  const [ isSearchLoading, setSearchLoading ] = useState(false)
  let userSearchTimeout                       = null

  // search user by similar email
  const getUsers = (email) => {
    setSearchLoading(true)
    let additionalFilters = {
      email: email
    }

    AdminsApiV2.get({
      tableState : null,
      filters    : additionalFilters
    })
      .then((response) => {
        setSearchAdmins(response.data.admins)
      })
      .catch(() => {
        setFieldError(name, 'Searching for Admin failed.')
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
    </>
  )

  // handler to search admins
  const handleSelectSearchOnChange = (event) => {
    const searchText = event.target.value
    if (userSearchTimeout) clearTimeout(userSearchTimeout)
    userSearchTimeout = setTimeout(() => {
      getUsers(searchText)
    }, 700)
  }

  return (
    <SelectSearchField
      type='text'
      name={ name }
      label={ label }
      placeholder='Search with admin Email'
      dataList={ searchAdmins }
      onSearchChange={ handleSelectSearchOnChange }
      getOptionLabel={ getOptionLabel }
      isLoading={ isSearchLoading }
      required={ required }
      onSelect={ submitForm }
      { ...props }
    />
  )
}

AdminSelectSearchField.propTypes    = propTypes
AdminSelectSearchField.defaultProps = defaultProps

export default AdminSelectSearchField
