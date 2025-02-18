import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'; // Jika menggunakan react-router-dom untuk navigasi
import { RowButton } from 'components/atoms';

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
 * Columns definition for Reward Table
 */
const RewardColumns = ({ buttonText, buttonColour, onButtonClick }) => {
  const history = useHistory();

  // Mendefinisikan handleSelectRow
  const handleSelectRow = useCallback(
    (datum, action) => {
      const { id } = datum;
      if (action === 'detailPencapaian') {
        // Arahkan ke halaman Detail Pencapaian Reward
        history.push({
          pathname: `/app/super_admin/detail-pencapaian-reward/${id}`,
          state: { id },
        });
      } else if (action === 'detail') {
        // Arahkan ke halaman Detail Reward
        history.push({
          pathname: `/app/super_admin/detail-reward-page/${id}`,
          state: { id },
        });
      }
    },
    [history]
  );

  // Komponen untuk cell aksi
  const ActionCell = ({ cell: { row } }) => (
    <>
      <RowButton
        data={row.original}
        color={buttonColour}
        onClick={() => handleSelectRow(row.original, 'detailPencapaian')} // Arahkan ke Detail Pencapaian
        text="Detail Pencapaian"
      />
      <RowButton
        data={row.original}
        color={buttonColour}
        onClick={() => handleSelectRow(row.original, 'detail')} // Arahkan ke Detail Reward
        text="Detail"
      />
    </>
  );

  ActionCell.propTypes = actionCellPropTypes;

  return [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Nama Agen',
      accessor: 'agent_affiliate_id',
    },
    {
      Header: 'Reward Bulanan',
      accessor: 'monthly_reward',
    },
    {
      Header: 'Reward Top Sales',
      accessor: 'top_sales_reward',
    },
    {
      Header: 'Tanggal Pencairan',
      accessor: 'paid_at',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ cell }) => (cell.value === 'berhasil' ? 'Berhasil' : 'Unproses'),
    },
    {
      Header: 'Aksi',
      id: 'action',
      Cell: ActionCell,
    },
  ];
};

RewardColumns.propTypes = propTypes;

export default RewardColumns;
