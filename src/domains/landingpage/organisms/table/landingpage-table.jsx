import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'components/organisms/data-table';
import landingPageTableColumns from './landingpage-table-columns';

const LandingPageTable = ({ data, pagination, onFetchData, isLoading, rowButtonProps }) => {
  return (
    <DataTable
      data={data}
      columns={landingPageTableColumns(rowButtonProps)}
      pagination={pagination}
      onFetchData={onFetchData}
      isLoading={isLoading}
    />
  );
};

LandingPageTable.propTypes = {
  data: PropTypes.array.isRequired,
  pagination: PropTypes.shape({
    pageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
  }).isRequired,
  onFetchData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  rowButtonProps: PropTypes.shape({
    buttonText: PropTypes.string.isRequired,
    buttonColour: PropTypes.string.isRequired,
    onButtonClick: PropTypes.func.isRequired,
  }).isRequired,
};

LandingPageTable.defaultProps = {
  isLoading: false,
};

export default LandingPageTable;
