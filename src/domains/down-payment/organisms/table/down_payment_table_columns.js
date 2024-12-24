import RowButton from 'components/atoms/row-button';
import React from 'react';
import PropTypes from 'prop-types';

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
const downpaymentTableColumns = ({
  buttonText,
  buttonColour,
  onButtonClick
}) => {

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
        Header   : 'Nomor DP',
        accessor : 'down_payment_number'
      },
      {
        Header   : 'Nomor Pesanan',
        accessor : 'order_number'
      },
      {
        Header   : 'Tipe Pembayaran',
        accessor : 'payment_type'
      },
      {
        Header   : 'Metode Pembayaran',
        accessor : 'payment_method'
      },
      {
        Header   : 'Jumlah Pembayaran',
        accessor : 'payment_amount'
      },
      {
        Header   : 'Tenor',
        accessor : 'tempo_period'
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
        Header   : 'Status Pembayaran',
        accessor : 'status'
      },
      {
        Header : 'Action',
        id     : 'action',
        Cell   : ActionCell
      }
    ]
  )
}

downpaymentTableColumns.propTypes = propTypes

export default downpaymentTableColumns
