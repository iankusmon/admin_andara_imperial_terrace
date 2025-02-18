import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'components/organisms/data-table';
import RewardAgenBulananColumns from './reward-agen-bulanan-columns'; // Sesuaikan dengan nama file kolom yang baru

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
  rankFilter: PropTypes.string, // New prop for Rank filter
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
  rankFilter: '', // Default to no filter for Rank
};

/**
 * Reward Agen Bulanan Table Component
 */
const RewardAgentBulananTable = ({
  data = [],
  pagination = defaultProps.pagination,
  onFetchData,
  rowButtonProps = defaultProps.rowButtonProps,
  hiddenColumns = [],
  isLoading = false,
  rankFilter = defaultProps.rankFilter, // Extract rank filter from props
}) => {
  const { buttonText, buttonColour, onButtonClick } = rowButtonProps;

  // Filter data based on rank
  const filteredData = useMemo(() => {
    if (!rankFilter) return data;
    return data.filter(item => item.rank === rankFilter); // Filter based on rank
  }, [data, rankFilter]);

  const columns = useMemo(
    () => RewardAgenBulananColumns({ buttonText, buttonColour, onButtonClick }),
    [buttonText, buttonColour, onButtonClick]
  );

  console.debug("RewardAgentBulananTable received data:", data);
  console.debug("Pagination Info:", pagination);
  console.debug("Applied Rank Filter:", rankFilter);

  return (
    <DataTable
      data={filteredData} // Use filtered data
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

RewardAgentBulananTable.propTypes = propTypes;
RewardAgentBulananTable.defaultProps = defaultProps;

export default RewardAgentBulananTable;
