import React from 'react'
import PropTypes from 'prop-types'
import { STATUS } from 'domains/ppjb-document/constants/ppjb-document-constant'
import StatusBadge from 'domains/down-payment/atoms/status-badge'
import { RowButton, SelectTableFilter } from 'components/atoms'

const propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonColour: PropTypes.string.isRequired,
    isButtonDisabled : PropTypes.func,
  onButtonClick: PropTypes.func.isRequired
}

const actionCellPropTypes = {
  cell: PropTypes.shape({
    row: PropTypes.shape({
      original: PropTypes.object.isRequired,
    })
  })
};

/**
 * Columns definition for NUP Table
 * @param {string} buttonText - The text that appears at the button on each row
 * @param {string} buttonColour - Bootstrap button type class name (e.g., primary)
 * @param {Function} onButtonClick - Function that will run when the button is clicked
 */
const ppjbdocumentTableColumns = ({
  buttonText,
  buttonColour,
  onButtonClick
}) => {

  const PpjbDocumentStatusFilter = ({ column }) => {
    const options = Object.keys(STATUS).map((key) => (
      {
        label : STATUS[key],
        value : STATUS[key]
      }
    ))
    return (
      <SelectTableFilter reactTableColumn={ column } options={ options } />
    )
  }

  const PpjbDocumentStatusCell = (row) => <StatusBadge status={ row.cell.value } />

  const ActionCell = ({ cell: { row } }) => (
    <RowButton
      data={row.original}
      color={buttonColour}
      onClick={onButtonClick}
      text={buttonText}
    />
  )

  ActionCell.propTypes = actionCellPropTypes

  return (
    [
      {
        Header   : 'Nomor PPJB',
        accessor : 'ppjb_number'
      },
      {
        Header   : 'Nomor Booking Fee',
        accessor : 'booking_fee_number'
      },
      {
        Header   : 'Nomor Down Payment',
        accessor : 'down_payment_number'
      },
      {
        Header   : 'Nomor Pesanan',
        accessor : 'order_number'
      },
      {
        Header   : 'Unit Villa Yang Dibooking',
        accessor : 'villa_booked_unit'
      },
      {
        Header   : 'Jalan Villa Yang Dibooking',
        accessor : 'villa_booked_street'
      },
      {
        Header   : 'Nama Lengkap',
        accessor : 'fullname'
      },
      {
        Header   : 'NIK',
        accessor : 'nik'
      },
      {
        Header   : 'Pekerjaan',
        accessor : 'occupation'
      },
      {
        Header   : 'Foto Dokumentasi',
        accessor : 'documentation_photo'
      },
      {
        Header   : 'Scan Dokuemn AJB',
        accessor : 'scan_ajb_document'
      },
      {
        Header   : 'Status',
        accessor : 'status',
        Filter   : PpjbDocumentStatusFilter,
        Cell     : PpjbDocumentStatusCell
      },
      {
        Header : 'Action',
        id     : 'action',
        Cell   : ActionCell
      }
    ]
  )
}

ppjbdocumentTableColumns.propTypes = propTypes

export default ppjbdocumentTableColumns
