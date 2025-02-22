import React, { useMemo } from "react";
import PropTypes from "prop-types";
import DataTable from "components/organisms/data-table";
import RewardColumns from "./reward-columns";

const propTypes = {
  data: PropTypes.array.isRequired,
  pagination: PropTypes.shape({
    pageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalCount: PropTypes.number,
  }),
  onFetchData: PropTypes.func.isRequired,
  rowButtonProps: PropTypes.shape({
    buttonColour: PropTypes.string,
    onDetailPencapaianClick: PropTypes.func.isRequired,
    onDetailClick: PropTypes.func.isRequired,
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
    buttonColour: "primary",
    onDetailPencapaianClick: () => {},
    onDetailClick: () => {},
  },
  hiddenColumns: [],
  isLoading: false,
};

const RewardTable = ({
  data = [],
  pagination = defaultProps.pagination,
  onFetchData,
  rowButtonProps = defaultProps.rowButtonProps,
  hiddenColumns = [],
  isLoading = false,
}) => {
  const { buttonColour, onDetailPencapaianClick, onDetailClick } = rowButtonProps;

  const columns = useMemo(
    () => RewardColumns({ buttonColour, onDetailPencapaianClick, onDetailClick }),
    [buttonColour, onDetailPencapaianClick, onDetailClick]
  );

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

RewardTable.propTypes = propTypes;
RewardTable.defaultProps = defaultProps;

export default RewardTable;
