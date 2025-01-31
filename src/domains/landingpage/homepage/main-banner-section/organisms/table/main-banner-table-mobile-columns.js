import React from 'react';
import PropTypes from 'prop-types';
import { RowButton, SelectTableFilter } from 'components/atoms';
import StatusBadge from 'domains/article/atoms/status-badge'; // Ganti path sesuai lokasi komponen StatusBadge
import { STATUS } from 'domains/article/constants/article-constant'; // Ganti path sesuai lokasi konstanta STATUS

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
 * Columns definition for Mobile Main Banner Table
 * @param {string} buttonText - The text that appears on the button in each row
 * @param {string} buttonColour - Bootstrap button color class name (e.g., primary)
 * @param {Function} onButtonClick - Function that will run when the button is clicked
 */
const MobileMainBannerTableColumns = ({ buttonText, buttonColour, onButtonClick }) => {
  const StatusFilter = ({ column }) => {
    const options = Object.keys(STATUS).map((key) => ({
      label: STATUS[key],
      value: STATUS[key],
    }));
    return <SelectTableFilter reactTableColumn={column} options={options} />;
  };

  const ActionCell = ({ cell: { row } }) => (
    <RowButton
      data={row.original}
      color={buttonColour}
      onClick={() => onButtonClick(row.original)}
      text={buttonText}
    />
  );

  ActionCell.propTypes = actionCellPropTypes;

  return [
    {
      Header: 'Id',
      accessor: 'id',
      disableFilters: true,
    },
    {
      Header: 'Judul',
      accessor: 'title',
    },
    {
      Header: 'Deskripsi',
      accessor: 'description',
    },
    {
      Header: 'URL Gambar',
      accessor: 'image_url',
    },
    {
      Header: 'URL Link',
      accessor: 'link_url',
    },
    {
      Header: 'Tanggal',
      accessor: 'updated_at',
    },
    {
      Header: 'Status Aktif',
      accessor: 'active_status',
      Filter: StatusFilter, // Filter untuk status
      Cell: ({ cell: { value } }) => <StatusBadge status={value} />, // Tampilkan StatusBadge
    },
    {
      Header: 'Action',
      id: 'action',
      Cell: ActionCell, // Tampilkan tombol aksi
    },
  ];
};

MobileMainBannerTableColumns.propTypes = propTypes;

export default MobileMainBannerTableColumns;
