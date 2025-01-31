import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'components/organisms/data-table';
import MainBannerTableColumns from './main-banner-table-columns';

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
  rowButtonProps: {
    buttonText: '',
    buttonColour: '',
    onButtonClick: () => {},
  },
  isLoading: false,
};

const MainBannerTable = ({
  data,
  pagination,
  onFetchData,
  rowButtonProps = {},
  hiddenColumns,
  isLoading,
}) => {
  const {
    buttonText = '',
    buttonColour = '',
    onButtonClick = () => {},
  } = rowButtonProps;

  console.log('Data received:', data);
  console.log('Pagination:', pagination);

  const adjustedData = data.map(item => ({
    id: item.id,
    title: item.title || 'No Title',
    description: item.description || 'No Description',
    image_url: item.image_url || 'No Image URL',
    link_url: item.link_url || 'No Link URL',
    updated_at: item.updated_at || 'No Update',
  }));

  const columns = useMemo(
    () =>
      MainBannerTableColumns({
        buttonText,
        buttonColour,
        onButtonClick,
      }),
    [buttonText, buttonColour, onButtonClick]
  );

  return (
    <DataTable
      data={adjustedData}
      columns={columns}
      pagination={pagination}
      onFetchData={onFetchData}
      hiddenColumns={hiddenColumns}
      isLoading={isLoading}
    />
  );
};

MainBannerTable.propTypes = propTypes;
MainBannerTable.defaultProps = defaultProps;

export default MainBannerTable;
