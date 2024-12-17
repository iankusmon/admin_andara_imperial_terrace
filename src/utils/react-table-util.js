/**
 * Define an "interface" to handle React Tables State into an application consistent data structure/object
 */
const ReactTableUtil = {
  /**
   * Transform `tableState` into a simple object
   * @param {object} tableState - ReactTable's Final State
   * @return {object} simple object, i.e:
   * {
   *  code: 123,
   *  curation_status: 'curated',
   *  pageIndex: 1,
   *  pageSize: 3,
   *  ...
   * }
   */
  transformState: (tableState) => {
    let filterObj = {}

    // transform tableState.filters
    tableState.filters.map((filter) => filterObj[filter.id] = filter.value)

    // handle page params
    return {
      ...filterObj,
      // TODO: uncomment this in case we want to apply sortBy filter from the backend
      // sortBy : tableState.sortBy,
      pageIndex : tableState.pageIndex,
      pageSize  : tableState.pageSize
    }
  }
}

export default ReactTableUtil
