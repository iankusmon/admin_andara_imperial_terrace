import React from 'react'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'
import StringUtil from 'utils/string-util'


const propTypes = {
  /** Object returned by the react table instance. See https://react-table.tanstack.com/docs/api/useFilters#column-properties */
  reactTableColumn: PropTypes.shape({
    /** The current filter value for this column */
    filterValue : PropTypes.any,
    /** Used to update the filter value for this column */
    setFilter   : PropTypes.func
  }).isRequired,

  /** filter option objects. each object should have `label` and `value` */
  options: PropTypes.arrayOf(PropTypes.shape({
    /** Option label */
    label: PropTypes.string,

    /** Option value */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ])
  })),

  enableAll: PropTypes.bool
}

const defaultProps = {
  enableAll: true
}

/** Allow user input text to filter the record. It should be hooked up to ReactTable filter  */
const SelectTableFilter = ({
  options,
  reactTableColumn,
  enableAll
}) => (
  <Input
    className='form-control-sm'
    type='select'
    value={ reactTableColumn.filterValue }
    onChange={ (event) => {
      reactTableColumn.setFilter(event.target.value || undefined)
    } }
  >
    { enableAll && <option value="">All</option> }
    {
      options.map((option) => (
        <option
          key={ `select-table-filter-option-${option.value}` }
          value={ option.value }
        >
          { StringUtil.titleCase(option.label) }
        </option>
      ))
    }
  </Input>
)

SelectTableFilter.propTypes    = propTypes
SelectTableFilter.defaultProps = defaultProps

export default SelectTableFilter