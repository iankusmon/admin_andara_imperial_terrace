import React from 'react'
import {
  Input,
  CustomInput,
  Button
} from 'reactstrap'
import PropTypes from 'prop-types'

/**
 * Table pagination hooked up to ReactTable (only to be used for ReactTable)
 * It contain table pagination section
 *
 * @param {bool} canPreviousPage If there are pages and the current pageIndex is greater than 0, this will be `true`.
 * @param {bool} canNextPage If there are pages and the current pageIndex is less than pageCount, this will be `true`.
 * @param {number} pageIndex The index of the page that should be displayed. It from `state.pageIndex`
 * @param {number} pageSize number of records that should be displayed in a page. It from `state.pageSize`
 * @param {number} pageCount Determine the amount of pages available. Required if manualPagination is set to `true`
 * @param {func} gotoPage This function, when called with a valid `pageIndex`, will set `pageIndex` to that value.
 * @param {func} setPageSize Set `state.pageSize` to the new value.
 * @param {func} nextPage Increases `pageIndex` by one.
 * @param {func} previousPage Decreases `pageIndex` by one.
 *
 * for more detail, see https://react-table.tanstack.com/docs/api/usePagination
 */
const TablePagination = ({
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageSize,
  pageCount,
  gotoPage,
  setPageSize,
  nextPage,
  previousPage
}) => {

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value))
  }

  const onChangeInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }

  return (
    <div className='d-flex justify-content-center'>

      <div className='mr-5'>
        <Button
          color="primary"
          onClick={ () => gotoPage(0) }
          disabled={ !canPreviousPage }
        >
          { '<<' }
        </Button>
        <Button
          color="primary"
          onClick={ previousPage }
          disabled={ !canPreviousPage }
        >
          { '<' }
        </Button>
      </div>

      <div className='d-flex align-items-center justify-content-center'>
        <div className='d-flex align-items-center mr-3'>
          <div className='mr-3'>Page</div>
          <Input
            type='number'
            className='mr-3'
            min={ 1 }
            max={ pageCount }
            value={ pageIndex + 1 }
            onChange={ onChangeInput }
          />
          <div style={{ whiteSpace: 'nowrap' }}>of { pageCount }</div>
        </div>
        <div>
          <CustomInput
            id='table-pagination-page-size'
            type='select'
            value={ pageSize }
            onChange={ onChangeInSelect }
          >
            { [ 5, 10, 20, 30, 40, 50 ].map((pageSize) => (
              <option key={ pageSize } value={ pageSize }>
            Show { pageSize }
              </option>
            )) }
          </CustomInput>
        </div>
      </div>

      <div className='ml-5'>
        <Button
          color="primary"
          onClick={ nextPage }
          disabled={ !canNextPage }
        >
          { '>' }
        </Button>
        <Button
          color="primary"
          onClick={ () => gotoPage(pageCount - 1) }
          disabled={ !canNextPage }
        >
          { '>>' }
        </Button>
      </div>
    </div>
  )
}

TablePagination.propTypes = {
  canPreviousPage : PropTypes.bool,
  canNextPage     : PropTypes.bool,
  pageIndex       : PropTypes.number.isRequired,
  pageSize        : PropTypes.number,
  pageCount       : PropTypes.number,
  gotoPage        : PropTypes.func,
  setPageSize     : PropTypes.func,
  nextPage        : PropTypes.func,
  previousPage    : PropTypes.func
}

export default TablePagination