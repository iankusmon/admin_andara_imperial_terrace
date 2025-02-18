import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'components/organisms/data-table';
import RewardPenjualanKeseluruhanColumns from './reward-penjualan-keseluruhan-columns'; // Ganti dengan nama yang benar

const propTypes = {
  data: PropTypes.array.isRequired,
  pagination: PropTypes.shape({
    pageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalCount: PropTypes.number,
  }),
  onFetchData: PropTypes.func.isRequired,
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
};

const defaultProps = {
  data: [], // Default data kosong agar tidak error
  pagination: {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  },
  hiddenColumns: [],
  isLoading: false,
};

/**
 * Reward Penjualan Keseluruhan Table Component
 */
const RewardPenjualanKeseluruhanTable = ({
  data = [],
  pagination = defaultProps.pagination,
  onFetchData,
  hiddenColumns = [],
  isLoading = false,
}) => {
  // Tidak ada rowButtonProps karena kita tidak perlu aksi
  const columns = useMemo(
    () => RewardPenjualanKeseluruhanColumns(),
    []
  );

  console.debug("RewardPenjualanKeseluruhanTable received data:", data);
  console.debug("Pagination Info:", pagination);

  return (
    <DataTable
      data={data}
      columns={columns}
      pagination={pagination}
      onFetchData={(newPageIndex, newPageSize) =>
        onFetchData(newPageIndex ?? pagination.pageIndex, newPageSize ?? pagination.pageSize)
      }
      hiddenColumns={hiddenColumns}
      isLoading={isLoading}
    />
  );
};

RewardPenjualanKeseluruhanTable.propTypes = propTypes;
RewardPenjualanKeseluruhanTable.defaultProps = defaultProps;

export default RewardPenjualanKeseluruhanTable;
