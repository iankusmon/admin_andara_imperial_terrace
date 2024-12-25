import React from 'react';
import PropTypes from 'prop-types';
import { 
  PAYMENT_TYPE,
  PAYMENT_METHOD,
  STATUS 
} from 'domains/down-payment/constants/down-payment-constant';
import StatusBadge from 'domains/down-payment/atoms/status-badge';
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
const downpaymentTableColumns = ({
  buttonText,
  buttonColour,
  onButtonClick
}) => {

  const DownPaymentStatusFilter = ({ column }) => {
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

  const DownPaymentPaymentTypeFilter = ({ column }) => {
    const options = Object.keys(PAYMENT_TYPE).map((key) => (
      {
        label : PAYMENT_TYPE[key],
        value : PAYMENT_TYPE[key]
      }
    ))
    return (
      <SelectTableFilter reactTableColumn={ column } options={ options } />
    )
  }

  const DownPaymentPaymentMethodFilter = ({ column }) => {
    const options = Object.keys(PAYMENT_METHOD).map((key) => (
      {
        label : PAYMENT_METHOD[key],
        value : PAYMENT_METHOD[key]
      }
    ))
    return (
      <SelectTableFilter reactTableColumn={ column } options={ options } />
    )
  }


  const DownPaymentFeeStatusCell = (row) => <StatusBadge status={ row.cell.value } />

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
        accessor : 'payment_type',
        Filter   : DownPaymentPaymentTypeFilter,
      },
      {
        Header   : 'Metode Pembayaran',
        accessor : 'payment_method',
        Filter   : DownPaymentPaymentMethodFilter,
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
        accessor : 'status',
        Filter   : DownPaymentStatusFilter,
        Cell     : DownPaymentFeeStatusCell
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
