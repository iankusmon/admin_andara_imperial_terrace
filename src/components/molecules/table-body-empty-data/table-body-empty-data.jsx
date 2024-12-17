import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
  totalColumns: PropTypes.number
}

/**
 * Table body to show empty data in the table
 * @param {array} totalColumns - Total of table columns
 */
const TableBodyEmptyData = ({ totalColumns }) => (
  <tbody>
    <tr>
      <td colSpan={ totalColumns }>
        <div className='py-2 text-center'>
          <div className='mb-3'>
            <i className="fas fa-exclamation-triangle fa-3x"></i>
          </div>
            No records available to display
        </div>
      </td>
    </tr>
  </tbody>
)

TableBodyEmptyData.propTypes = propTypes

export default TableBodyEmptyData
