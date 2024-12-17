import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'


/**
 * TODO: we should rename column to reactTableColumn later
 */

const propTypes = {
  /** Object returned by the react table instance. See https://react-table.tanstack.com/docs/api/useFilters#column-properties */
  column: PropTypes.shape({
    /** The current filter value for this column */
    filterValue : PropTypes.any,
    /** Used to update the filter value for this column */
    setFilter   : PropTypes.func
  }).isRequired
}

/** Allow user input text to filter the record. It should be hooked up to ReactTable filter  */
const TextColumnFilter = ({
  column
}) => (
  <Input
    bsSize={ 'sm' }
    value={ column.filterValue || '' }
    onChange={ (e) => {
      column.setFilter(e.target.value || undefined)
    } }
    placeholder={ 'Search...' }
  />
)

TextColumnFilter.propTypes = propTypes

export default TextColumnFilter
