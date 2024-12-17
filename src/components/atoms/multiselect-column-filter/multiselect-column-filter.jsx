import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'


const propTypes = {
  reactTableColumn: PropTypes.shape({
    filterValue : PropTypes.any,
    setFilter   : PropTypes.func
  }),
  options: PropTypes.array
}

/**
 * Multiselect filter hooked up to ReactTable filter.
 * Allow user input text to filter the records
 *
 * it will pass `column` properties from ReactTable. It consist:
 * @param {func} setFilter  Used to update the filter value for this column
 * @param {func} options  Multiselect options
 *
 */
const MultiselectColumnFilter = ({
  reactTableColumn: {
    setFilter
  },
  options
}) => {
  const [ selectedOptions, setSelectedOptions ] = useState([])

  const transformSelectedOptionsToValues = (event) => event.map((item) => item.value)

  return (
    <>
      <Select
        value={ selectedOptions || [] }
        options={ options }
        isMulti={ true }
        placeholder={ 'Select multi option' }
        onChange={ (event) => {
          setFilter(event ? transformSelectedOptionsToValues(event) : [])
          setSelectedOptions(event)
        } }
      />
    </>
  )
}

MultiselectColumnFilter.propTypes = propTypes

export default MultiselectColumnFilter
