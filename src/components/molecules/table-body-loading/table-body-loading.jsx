import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
  totalColumns: PropTypes.number
}

/**
 * Table body to show empty data in the table
 * @param {array} totalColumns - Total of table columns
 */
const TableBodyLoading = ({ totalColumns }) => (
  <tbody>
    <tr>
      <td colSpan={ totalColumns }>
        <div
          className='text-center d-flex justify-content-center align-items-center flex-column'
          style={{
            minHeight: '300px'
          }}
        >
          <div>
            <i className="fas fa-cog fa-spin fa-3x"></i>
          </div>
            Loading data, mohon tunggu...
        </div>
      </td>
    </tr>
  </tbody>
)

TableBodyLoading.propTypes = propTypes

export default TableBodyLoading
