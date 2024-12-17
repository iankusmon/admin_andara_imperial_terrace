import React from 'react'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const propTypes = {
  column: PropTypes.shape({
    filterValue : PropTypes.any,
    setFilter   : PropTypes.func
  })
}

/**
 * Input filter hooked up to ReactTable filter.
 * Allow user input date range to filter the records
 *
 * @param {object} columns - Columns
 * @param {*} columns.filterValue - Filter value
 * @param {func} columns.setFilter - Set filter to the ReactTable
 */
const DateColumnFilter = ({
  column: {
    filterValue,
    setFilter
  }
}) => {
  const CustomInputView = ( props ) => (
    <Input
      type='text'
      size='sm'
      { ...props }
    />
  )

  return (
    <>
      <ReactDatePicker
        dateFormat="dd/MM/yyyy"
        selected={ (filterValue && new Date(filterValue)) || null }
        onChange={ ( value ) => {
          setFilter(value && value.toString()|| undefined)
        } }
        customInput={
          <CustomInputView
            value={ filterValue }
          />
        }
      />
    </>
  )
}

DateColumnFilter.propTypes = propTypes

export default DateColumnFilter