import TextColumnFilter from 'components/atoms/text-column-filter'
import TableBody from 'components/molecules/table-body'
import TableBodyEmptyData from 'components/molecules/table-body-empty-data'
import TableBodyLoading from 'components/molecules/table-body-loading'
import TableHeader from 'components/molecules/table-header'
import TablePagination from 'components/molecules/table-pagination'
import PropTypes from 'prop-types'
import IndeterminateCheckbox from 'components/atoms/indertemindate-checkbox'
import React, { useEffect, useMemo, useCallback } from 'react'
import {
  useAsyncDebounce,
  useFilters,
  usePagination,
  useTable,
  useRowSelect
} from 'react-table'
import { Table } from 'reactstrap'


const proptypes = {
  data              : PropTypes.array.isRequired,
  columns           : PropTypes.array.isRequired,
  isLoading         : PropTypes.bool,
  isAbleToSelectRow : PropTypes.bool,
  pagination        : PropTypes.object.isRequired,
  selectedRows      : PropTypes.object,
  onFetchData       : PropTypes.func.isRequired,
  onSetSelectedRows : PropTypes.func,
  hiddenColumns     : PropTypes.array,
  initialFilter     : PropTypes.array
}

const defaultValues = {
  data              : [],
  columns           : [],
  pagination        : {},
  selectedRows      : {},
  isLoading         : false,
  isAbleToSelectRow : false,
  onFetchData       : () => {},
  onSetSelectedRows : () => {},
  hiddenColumns     : [],
  initialFilter     : []
}


// eslint-disable-next-line react/prop-types
const RowSelectAllColumns = ({ getToggleAllPageRowsSelectedProps }) => <IndeterminateCheckbox className='m-0 p-0' { ...getToggleAllPageRowsSelectedProps() } />

// eslint-disable-next-line react/prop-types
const RowSelectColumn = ({ row }) => <IndeterminateCheckbox className='m-0 p-0' { ...row.getToggleRowSelectedProps() } />

/**
 * Interface table with ReactTable Functionality. Only for presenting data from server-side
 * @param {Array<Object>} data array of seller_inbound objects
 * @param {Array<Object} columns memoized columns array object
 * @param {Object} pagination object of pagination data from endpoint
 * @param {Function} onFetchData function that will call endpoint for data
 * @param {Array<string>} hiddenColumns hide columns not relavant to the page
 */
const DataTable = ({
  data,
  columns,
  isLoading,
  isAbleToSelectRow,
  selectedRows,
  pagination,
  onFetchData,
  onSetSelectedRows,
  hiddenColumns,
  initialFilter
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
      // override the row's internal ID of React table to use server-side data ID
      getRowId     : useCallback((row) => row.id, []),
      defaultColumn,
      initialState : {
        hiddenColumns  : hiddenColumns,
        pageSize       : 10,
        pageIndex      : 0,
        selectedRowIds : selectedRows
      },
      pageCount        : pagination.total_pages,
      // it must be true if we implement filtering/pagination outside the table (i.e server-side)
      manualFilters    : true,
      manualPagination : true
    },
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      // only display checkbox if it's true
      if (isAbleToSelectRow) {
        hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
          {
            id     : 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header : RowSelectAllColumns,
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell   : RowSelectColumn
          },
          ...columns
        ])
      }
    }
  )


  /* Minimum configuration of react table */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    /* final state object of the table
    since we add `initialState`, it should included in the `state`
    {
      filters: [{…}]
      hiddenColumns: []
      ...
      pageIndex: 0
      pageSize: 10
      }
    }
    */
    state: {
      pageIndex,
      pageSize,
      sortBy,
      filters,
      selectedRowIds
    },
    /* pagination */
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    nextPage,
    previousPage,
    setAllFilters
  } = tableInstance
  // set delay every time call onFetchData
  const onFetchDataDebounced = useAsyncDebounce(onFetchData, 200)

  const renderTableBody = () => {
    if (isLoading) {
      return <TableBodyLoading totalColumns={ allColumns.length }/>
    }

    return (
      data.length > 0
        ? (
          <TableBody
            rows={ rows }
            prepareRow={ prepareRow }
            getTableBodyProps={ getTableBodyProps }
          />
        )
        : <TableBodyEmptyData totalColumns={ allColumns.length }/>
    )
  }

  // Server-side fetch data if the pages, sort or filter changes
  useEffect(() => {
    onFetchDataDebounced({ pageIndex, pageSize, sortBy, filters })
  }, [ onFetchDataDebounced, pageIndex, pageSize, sortBy, filters ])

  // Set initial Filter if the pages has initial filter
  useEffect(() => {
    setAllFilters(initialFilter)
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  // to update selected row so the page will always 'remember' the previous value when go to the next page
  useEffect(() => {
    if (onSetSelectedRows) onSetSelectedRows(selectedRowIds)
  }, [ onSetSelectedRows, selectedRowIds ])

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
          renderTableBody()
        }
      </Table>
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
    </>
  )
}

DataTable.propTypes    = proptypes
DataTable.defaultProps = defaultValues

export default DataTable
