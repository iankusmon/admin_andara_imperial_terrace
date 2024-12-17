import DataTable from 'components/organisms/data-table'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import customerTableColumns from './customer-table-columns'

const propTypes = {
  data           : PropTypes.array,
  pagination     : PropTypes.object,
  onFetchData    : PropTypes.func,
  rowButtonProps : PropTypes.shape({
    buttonText    : PropTypes.string,
    buttonColour  : PropTypes.string,
    onButtonClick : PropTypes.func
  }),
  hiddenColumns : PropTypes.arrayOf(PropTypes.string),
  isLoading     : PropTypes.bool
}

const defaultProps = {
  rowButtonProps: {
    buttonText    : '',
    buttonColour  : '',
    onButtonClick : () => {}
  },
  isLoading: false
}

/**
 * Table to display specific Customer columns
 * @param {Array<Object>} data - array of customers objects
 * @param {Object} pagination - object of pagination data from endpoint
 * @param {Function} onFetchData - function that will call endpoint for data
 * @param {object} rowButtonProps - Button Props for row button
 * @param {array} hiddenColumns - Hide specific columns by id
 */

const CustomerTable = ({
  data,
  pagination,
  onFetchData,
  rowButtonProps,
  hiddenColumns,
  isLoading
}) => {

  const { buttonText, buttonColour, onButtonClick } = rowButtonProps

  const columns = useMemo(
    () => customerTableColumns({
      buttonText,
      buttonColour,
      onButtonClick
    }),
    [
      buttonText,
      buttonColour,
      onButtonClick
    ]
  )

  return (
    <DataTable
      data={ data }
      columns={ columns }
      pagination={ pagination }
      onFetchData={ onFetchData }
      hiddenColumns={ hiddenColumns }
      isLoading={ isLoading }
    />
  )
}

CustomerTable.propTypes    = propTypes
CustomerTable.defaultProps = defaultProps

export default CustomerTable
