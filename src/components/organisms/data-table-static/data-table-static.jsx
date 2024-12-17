import TextColumnFilter from 'components/atoms/text-column-filter'
import TableBody from 'components/molecules/table-body'
import TableBodyEmptyData from 'components/molecules/table-body-empty-data'
import TableHeader from 'components/molecules/table-header'
import TablePagination from 'components/molecules/table-pagination'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import {
  useFilters,
  usePagination, useTable
} from 'react-table'
import { Table } from 'reactstrap'


const proptypes = {
  data            : PropTypes.array.isRequired,
  columns         : PropTypes.array.isRequired,
  hiddenColumns   : PropTypes.array,
  showPagination  : PropTypes.bool,
  defaultPageSize : PropTypes.number,
  getRowProps     : PropTypes.func
}

const defaultValues = {
  data            : [],
  columns         : [],
  hiddenColumns   : [],
  showPagination  : true,
  defaultPageSize : 10,
  getRowProps     : () => { }
}

/**
 * Interface table with ReactTable Functionality. Only for static data (no fetch data from server)
 * @param {Array<Object>} data array of seller_inbound objects
 * @param {Array<Object} columns memoized columns array object
 * @param {Array<string>} hiddenColumns hide columns not relavant to the page
 * @param {func} getRowProps - function to returns an object to change the <tr> element
 */
const DataTableStatic = ({
  data,
  columns,
  hiddenColumns,
  showPagination,
  defaultPageSize,
  getRowProps
}) => {
  // default filter for all filterable columns
  const defaultColumn = useMemo(
    () => ({
      Filter: TextColumnFilter
    }),
    []
  )

  /* Initialize table instance */
  // useTable at the very least needs to be provided with an object containing the memoized
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        hiddenColumns : hiddenColumns,
        pageSize      : defaultPageSize,
        pageIndex     : 0
      }
    },
    useFilters,
    usePagination
  )

  /* Minimum configuration of react table */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of using 'rows', we'll use page, which has only the rows for the active page
    prepareRow,
    allColumns,
    state: { pageIndex, pageSize },
    /* pagination */
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    nextPage,
    previousPage
  } = tableInstance

  return (
    <>
      <Table
        size='sm'
        hover
        striped
        responsive
        { ...getTableProps() }
      >
        <TableHeader
          headerGroups={ headerGroups }
        />
        {
          data.length > 0
            ? (
              <TableBody
                rows={ page }
                prepareRow={ prepareRow }
                getTableBodyProps={ getTableBodyProps }
                getRowProps={ getRowProps }
              />
            )
            : <TableBodyEmptyData totalColumns={ allColumns.length } />
        }
      </Table>
      {
        showPagination
          ? (
            <div className='p-3'>
              <TablePagination
                canPreviousPage={ canPreviousPage }
                canNextPage={ canNextPage }
                pageCount={ pageCount }
                pageIndex={ pageIndex }
                pageSize={ pageSize }
                gotoPage={ gotoPage }
                setPageSize={ setPageSize }
                nextPage={ nextPage }
                previousPage={ previousPage }
              />
            </div>
          )
          : null
      }
    </>
  )
}

DataTableStatic.propTypes    = proptypes
DataTableStatic.defaultProps = defaultValues

export default DataTableStatic
