import React from 'react'
import PropTypes from 'prop-types'
import './table-body.scss'
/**
 * Table body hooked up to ReactTable (only to be used for ReactTable)
 * It contain table body section
 *
 * @param {array} rows An array of materialized row objects from the original data array and columns passed into the table options
 * @param {func} prepareRow allows only the rows you intend to display to be computed and prepped with the correct state.
 * @param {func} getTableBodyProps used to resolve any props needed for your table wrapper
 * @param {func} getRowProps - function to returns an object to change the <tr> element
 *
 * for more detail, see https://react-table.tanstack.com/docs/api/useTable
 */
const TableBody = ({
  rows,
  prepareRow,
  getTableBodyProps,
  getRowProps = () => { }
}) => (
  <tbody { ...getTableBodyProps() }>
    { // Loop over the table rows
      rows.map((row, i) => {
        // Prepare the row for display
        prepareRow(row)
        return (
          <tr
            key={ i }
            // Apply the row props
            { ...row.getRowProps(getRowProps(row)) }
            className={ `${row.isSelected ? 'bg-gray text-white': ''}` }
          >
            { // Loop over the rows cells
              row.cells.map((cell, j) => (
                <td
                  key={ j }
                  className='td--vertical-middle'
                  // Apply the cell props (
                  { ...cell.getCellProps({
                    style: {
                      minWidth   : cell.column.minWidth,
                      whiteSpace : cell.column.whiteSpace
                    }
                  }) }
                >
                  { // Render the cell contents
                    cell.render('Cell')
                  }
                </td>
              )) }
          </tr>
        )
      })
    }
  </tbody>
)

TableBody.propTypes = {
  rows              : PropTypes.array,
  prepareRow        : PropTypes.func.isRequired,
  getTableBodyProps : PropTypes.func.isRequired,
  getRowProps       : PropTypes.func
}

export default TableBody