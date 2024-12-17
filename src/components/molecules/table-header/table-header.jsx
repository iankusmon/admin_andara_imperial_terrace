import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

/**
 * Table header hooked up to ReactTable (only to be used for ReactTable)
 * It contain table header section
 *
 * @param {array} headerGroups An array of normalized header groups, each containing a flattened array of final column objects for that row.
 *
 * for more detail, see https://react-table.tanstack.com/docs/api/useTable
 */
const TableHeader = ({
  headerGroups
}) => (
  <thead className="thead-light">
    { // Loop over the header rows
      headerGroups.map((headerGroup, i) => (
        // Apply the header row props
        <Fragment key={ `header-group-${i}` }>
          <tr { ...headerGroup.getHeaderGroupProps() }>
            { // Loop over the headers in each row
              headerGroup.headers.map((column) => (
                // Apply the header cell props
                <th
                  className='font-weight-bold text-center'
                  key={ `table-header-group-header-${column.id}` }
                  { ...column.getHeaderProps() }
                >
                  <h5>
                    { column.render('Header') }
                  </h5>
                  <div>{ column.canFilter ? column.render('Filter') : null }</div>
                </th>
              )) }
          </tr>

        </Fragment>
      ))
    }
  </thead>
)

TableHeader.propTypes = {
  headerGroups: PropTypes.array
}

export default TableHeader