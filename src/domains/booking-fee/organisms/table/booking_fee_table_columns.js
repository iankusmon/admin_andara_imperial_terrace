import React from 'react';
import PropTypes from 'prop-types';
import {  
  PAYMENT_TYPE,
  PAYMENT_METHOD,
  CASH_TEMPO_PERIOD,
  KPR_TENOR_PERIOD,
  STATUS
} from 'domains/booking-fee/constants/booking-fee-constant';
import StatusBadge from 'domains/booking-fee/atoms/status-badge';
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
 * Columns definition for BookingFee Table
 * @param {string} buttonText - The text that appears at the button on each row
 * @param {string} buttonColour - Bootstrap button type class name (e.g., primary)
 * @param {Function} onButtonClick - Function that will run when the button is clicked
 */
const bookingfeeTableColumns = ({
  buttonText,
  buttonColour,
  onButtonClick
}) => {

  const BookingFeeStatusFilter = ({ column }) => {
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

  const BookingFeePaymentTypeFilter = ({ column }) => {
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

  const BookingFeePaymentMethodFilter = ({ column }) => {
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

  const BookingFeeCashTempoPeriodFilter = ({ column }) => {
    const options = Object.keys(CASH_TEMPO_PERIOD).map((key) => (
      {
        label : CASH_TEMPO_PERIOD[key],
        value : CASH_TEMPO_PERIOD[key]
      }
    ))
    return (
      <SelectTableFilter reactTableColumn={ column } options={ options } />
    )
  }

  const BookingFeeKprTenorPeriodFilter = ({ column }) => {
    const options = Object.keys(KPR_TENOR_PERIOD).map((key) => (
      {
        label : KPR_TENOR_PERIOD[key],
        value : KPR_TENOR_PERIOD[key]
      }
    ))
    return (
      <SelectTableFilter reactTableColumn={ column } options={ options } />
    )
  }

  const BookingFeeStatusCell = (row) => <StatusBadge status={ row.cell.value } />

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
        Header   : 'Nomor Booking Fee',
        accessor : 'booking_fee_number'
      },
      {
        Header   : 'Nomor Pesanan',
        accessor : 'order_number'
      },
      {
        Header   : 'Tipe Pembayaran',
        accessor : 'payment_type',
        Filter   : BookingFeePaymentTypeFilter
      },
      {
        Header   : 'Metode Pembayaran',
        accessor : 'payment_method',
        Filter   : BookingFeePaymentMethodFilter
      },
      {
        Header   : 'Periode Cash Tempo',
        accessor : 'cash_tempo_period',
        Filter   : BookingFeeCashTempoPeriodFilter
      },
      {
        Header   : 'Tenor KPR',
        accessor : 'kpr_tenor_period',
        Filter   : BookingFeeKprTenorPeriodFilter
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
        Filter   : BookingFeeStatusFilter,
        Cell     : BookingFeeStatusCell
      },
      {
        Header : 'Action',
        id     : 'action',
        Cell   : ActionCell
      }
    ]
  )
}

bookingfeeTableColumns.propTypes = propTypes;

export default bookingfeeTableColumns;
