import DataTable from 'components/organisms/data-table'
import adminTableColumns from 'domains/admin/organisms/table/admin-table-columns'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

const propTypes = {
  data           : PropTypes.array,
  pagination     : PropTypes.object,
  onFetchData    : PropTypes.func,
  rowButtonProps : PropTypes.object,
  hiddenColumns  : PropTypes.arrayOf(PropTypes.string),
  isLoading      : PropTypes.bool,
  initialFilter  : PropTypes.array
}

const defaultProps = {
  isLoading     : false,
  initialFilter : []
}

/**
 * Table to display specific Customer columns
 * @param {Array<Object>} data - array of customers objects
 * @param {Object} pagination - object of pagination data from endpoint
 * @param {Function} onFetchData - function that will call endpoint for data
 * @param {object} rowButtonProps - Button Props for row button
 * @param {bool} isLoading - loading data from the backend
 * @param {Array<Object>} initialFilter - array of filter and its value from parents
 */

const AdminTable = ({
  data,
  pagination,
  onFetchData,
  rowButtonProps,
  isLoading,
  hiddenColumns,
  initialFilter
}) => {
  const { handleDisableAdmin, handleEnableAdmin } = rowButtonProps

  const columns = useMemo(
    () => adminTableColumns({
      handleDisableAdmin,
      handleEnableAdmin
    }),
    [ handleDisableAdmin, handleEnableAdmin ]
  )

  return (
    <DataTable
      data={ data }
      columns={ columns }
      hiddenColumns={ hiddenColumns }
      pagination={ pagination }
      onFetchData={ onFetchData }
      isLoading={ isLoading }
      initialFilter={ initialFilter }
    />
  )
}

AdminTable.propTypes    = propTypes
AdminTable.defaultProps = defaultProps

export default AdminTable
