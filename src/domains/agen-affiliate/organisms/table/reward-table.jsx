import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'components/organisms/data-table';
import RewardColumns from './reward-columns';

const propTypes = {
  data: PropTypes.array.isRequired,
  pagination: PropTypes.shape({
    pageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalCount: PropTypes.number,
  }),
  onFetchData: PropTypes.func.isRequired,
  rowButtonProps: PropTypes.shape({
    buttonText: PropTypes.string,
    buttonColour: PropTypes.string,
    onButtonClick: PropTypes.func,
  }),
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
};

const defaultProps = {
  data: [],
  pagination: {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  },
  rowButtonProps: {
    buttonText: 'Detail',
    buttonColour: 'primary',
    onButtonClick: () => {},
  },
  hiddenColumns: [],
  isLoading: false,
};

/**
 * Reward Table Component
 */
const RewardTable = ({
  data = [],
  pagination = defaultProps.pagination,
  onFetchData,
  rowButtonProps = defaultProps.rowButtonProps,
  hiddenColumns = [],
  isLoading = false,
}) => {
  const { buttonText, buttonColour, onButtonClick } = rowButtonProps;

  // Langsung panggil RewardColumns tanpa useMemo
  const columns = RewardColumns({ buttonText, buttonColour, onButtonClick });

  console.debug("RewardTable received data:", data);
  console.debug("Pagination Info:", pagination);

  return (
    <DataTable
      data={data}
      columns={columns}
      pagination={pagination}
      onFetchData={(newPageIndex, newPageSize) => {
        if (onFetchData) {
          onFetchData(newPageIndex ?? pagination.pageIndex, newPageSize ?? pagination.pageSize);
        }
      }}
      hiddenColumns={hiddenColumns}
      isLoading={isLoading}
    />
  );
};

RewardTable.propTypes = propTypes;
RewardTable.defaultProps = defaultProps;

export default RewardTable;
