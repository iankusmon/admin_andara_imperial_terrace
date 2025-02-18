import React from 'react';
import PropTypes from 'prop-types';
import { RowButton } from 'components/atoms';
import { FaEllipsisV } from 'react-icons/fa'; // Import vertical ellipsis icon (three dots)

/**
 * Prop types for the component
 */
const propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonColour: PropTypes.string.isRequired,
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
 * Columns definition for Reward Agen Bulanan Table
 */
const RewardAgenBulananColumns = ({ buttonText, buttonColour, onButtonClick }) => {
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
      Header: 'Image', // Kolom untuk menampilkan gambar agen
      accessor: 'image',
      Cell: ({ cell }) => <img src={cell.value} alt="Agen" width={50} height={50} /> // Menampilkan gambar agen
    },
    {
      Header: 'Rank', // Kolom untuk menampilkan ranking agen
      accessor: 'rank',
    },
    {
      Header: 'Jumlah Unit', // Kolom untuk menampilkan jumlah unit
      accessor: 'unit_count', // Menggunakan accessor 'unit_count' untuk jumlah unit
    },
    {
      Header: 'Aksi', // Kolom aksi dengan ikon titik tiga vertikal
      id: 'action',
      Cell: () => (
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <FaEllipsisV size={20} /> {/* Menampilkan ikon titik tiga vertikal */}
        </button>
      ),
    },
  ];
};

RewardAgenBulananColumns.propTypes = propTypes;

export default RewardAgenBulananColumns;
