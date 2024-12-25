import React from 'react';
import PropTypes from 'prop-types';
import { 
  PAYMENT_METHOD,
  VILLA_DESIRED,
  PACKAGE, 
  STATUS 
} from 'domains/nup/constants/nup-constant';
import StatusBadge from 'domains/nup/atoms/status-badge';
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
const nupTableColumns = ({
  buttonText,
  buttonColour,
  onButtonClick
}) => {

  const NupStatusFilter = ({ column }) => {
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

  const NupPaymentMethodFilter = ({ column }) => {
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

  const NupVillaDesiredFilter = ({ column }) => {
    const options = Object.keys(VILLA_DESIRED).map((key) => (
      {
        label : VILLA_DESIRED[key],
        value : VILLA_DESIRED[key]
      }
    ))
    return (
      <SelectTableFilter reactTableColumn={ column } options={ options } />
    )
  }

  const NupPackageFilter = ({ column }) => {
    const options = Object.keys(PACKAGE).map((key) => (
      {
        label : PACKAGE[key],
        value : PACKAGE[key]
      }
    ))
    return (
      <SelectTableFilter reactTableColumn={ column } options={ options } />
    )
  }

  const NupStatusCell = (row) => <StatusBadge status={ row.cell.value } />

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
        accessor : 'payment_method',
        Filter   : NupPaymentMethodFilter,
      },
      {
        Header   : 'Villa Yang Diinginkan',
        accessor : 'villa_desired',
        Filter   : NupVillaDesiredFilter,
      },
      {
        Header   : 'Paket',
        accessor : 'package',
        Filter   : NupPackageFilter,
      },
      {
        Header   : 'Status Pembayaran',
        accessor : 'status',
        Filter   : NupStatusFilter,
        Cell     : NupStatusCell
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
