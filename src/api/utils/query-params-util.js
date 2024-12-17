import ReactTableUtil from 'utils/react-table-util'

// Provide utility to create query params
const QueryParamsUtil = {
  /**
   * Tranform tableState and additionalFilter into query params for GET request
   * @param {object} state - ReactTable's final state
   * @param {object} additionalFilters - custome javascript object for filtering
   * e.i
   * {
   *  <id>: <value>,
   *  code: 123,
   *  curation_status: 'received,
   *  ...
   * }
   * @return {object} Javascript object
   */
  format: (tableState, additionalFilters = {}) => {
    let filterObj = {}

    if (tableState) filterObj = ReactTableUtil.transformState(tableState)

    //* exclude pageSize and pageIndex properties
    const { pageIndex, pageSize, ...otherFilter } = filterObj

    //! additionalFilter will overwrite same key in filterObj
    //! We should put additionalFilter at the bottom to get the flexibility of additional filters
    filterObj = {
      ...otherFilter,
      //* Set the default value for pagination value
      per_page : !isNaN(pageSize) ? pageSize : 10,
      page     : !isNaN(pageIndex) ? pageIndex + 1 : 1,
      ...additionalFilters
    }

    return filterObj
  }
}

export default QueryParamsUtil
