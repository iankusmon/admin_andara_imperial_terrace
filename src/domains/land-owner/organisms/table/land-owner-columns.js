import React from 'react';
import PropTypes from 'prop-types';
import StatusBadge from 'domains/land-owner/atoms/status-badge/index';
import { RowButton, SelectTableFilter } from 'components/atoms';

const propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonColour: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.func,
  onButtonClick: PropTypes.func.isRequired,
};

const actionCellPropTypes = {
  cell: PropTypes.shape({
    row: PropTypes.shape({
      original: PropTypes.object.isRequired,
    }),
  }),
};

/**
 * Columns definition for Landowner Table
 * @param {string} buttonText - The text that appears at the button on each row
 * @param {string} buttonColour - Bootstrap button type class name (e.g., primary)
 * @param {Function} onButtonClick - Function that will run when the button is clicked
 */
const landownerTableColumns = ({ buttonText, buttonColour, onButtonClick }) => {
  const LandownerStatusFilter = ({ column }) => {
    const options = [
      { label: 'ENABLED ', value: 'enabled' },
      { label: 'DISABLED ', value: 'disabled' },
    ];
    return <SelectTableFilter reactTableColumn={column} options={options} />;
  };

  const ActionCell = ({ cell: { row } }) => (
    <RowButton
      data={row.original}
      color={buttonColour}
      onClick={onButtonClick}
      text={buttonText}
    />
  );

  ActionCell.propTypes = actionCellPropTypes;

  return [
    {
      Header: 'ID Pemilik',
      accessor: 'id',
      disableFilters: true,
    },
    {
      Header: 'Nama Pemilik',
      accessor: 'name',
    },
    {
      Header: 'Alamat',
      accessor: 'address',
    },
    {
      Header: 'Nomor Kontak',
      accessor: 'contact_number',
    },
    {
      Header: 'Rekening',
      accessor: 'rekening',
    },
    {
      Header: 'Status Aktif',
      accessor: 'active_status',
      Filter: LandownerStatusFilter, // Filter untuk status
      Cell: ({ cell: { value } }) => <StatusBadge status={value} />, // Tampilkan StatusBadge
    },
    {
      Header: 'Aksi',
      id: 'action',
      Cell: ActionCell, // Tampilkan tombol aksi
    },
  ];
};

landownerTableColumns.propTypes = propTypes;

export default landownerTableColumns;
