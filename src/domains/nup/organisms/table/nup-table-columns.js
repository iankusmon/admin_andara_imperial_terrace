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
const nupTableColumns = ({
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
        Header   : 'NUP Customer',
        accessor : 'nup_number'
      },
      {
        Header   : 'Nomor Pesanan',
        accessor : 'order_number'
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
        Header   : 'Metode Pembayaran',
        accessor : 'payment_method'
      },
      {
        Header   : 'Villa Yang Diinginkan',
        accessor : 'villa_desired'
      },
      {
        Header   : 'Paket',
        accessor : 'package'
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

nupTableColumns.propTypes = propTypes;

export default nupTableColumns;
