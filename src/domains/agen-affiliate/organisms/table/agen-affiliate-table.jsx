import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'components/organisms/data-table';
import agentAffiliateColumns from './agen-affiliate-columns';

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
  data: [], // Default data kosong agar tidak error
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
 * Agent Affiliate Table Component
 */
const AgentAffiliateTable = ({
  data = [],
  pagination = defaultProps.pagination,
  onFetchData,
  rowButtonProps = defaultProps.rowButtonProps,
  hiddenColumns = [],
  isLoading = false,
}) => {
  const { buttonText, buttonColour, onButtonClick } = rowButtonProps;

  const columns = useMemo(
    () => agentAffiliateColumns({ buttonText, buttonColour, onButtonClick }),
    [buttonText, buttonColour, onButtonClick]
  );

  console.debug("AgentAffiliateTable received data:", data);
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

AgentAffiliateTable.propTypes = propTypes;
AgentAffiliateTable.defaultProps = defaultProps;

export default AgentAffiliateTable;
