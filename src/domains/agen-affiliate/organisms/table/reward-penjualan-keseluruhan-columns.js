import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  // Tidak ada aksi lagi, jadi buttonText dan onButtonClick dihapus
};

const actionCellPropTypes = {
  cell: PropTypes.shape({
    row: PropTypes.shape({
      original: PropTypes.object.isRequired,
    }),
  }),
};

/**
 * Columns definition for Reward Penjualan Keseluruhan Table
 */
const RewardPenjualanKeseluruhanColumns = () => {
  return [
    {
      Header: 'Nama Agent',
      accessor: 'agent_name', // Ganti sesuai dengan field nama agent yang ada pada data Anda
    },
    {
      Header: 'Unit Terjual',
      accessor: 'units_sold', // Ganti sesuai dengan field unit terjual yang ada pada data Anda
    },
    {
      Header: 'Total Reward',
      accessor: 'total_reward', // Ganti sesuai dengan field total reward yang ada pada data Anda
    },
    {
      Header: 'Total Komisi',
      accessor: 'total_commission', // Ganti sesuai dengan field total komisi yang ada pada data Anda
    },
  ];
};

RewardPenjualanKeseluruhanColumns.propTypes = propTypes;

export default RewardPenjualanKeseluruhanColumns;
