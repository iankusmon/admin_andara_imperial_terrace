import React from 'react';
import PropTypes from 'prop-types';
import { STATUS } from 'domains/article/constants/article-constant'; // Pastikan path benar
import StatusBadge from 'domains/article/atoms/status-badge';
import { RowButton, SelectTableFilter } from 'components/atoms';

const MobileDayclubTableColumns = ({ buttonText, buttonColour, onButtonClick }) => {
  const MobileStatusFilter = ({ column }) => {
    const options = Object.keys(STATUS).map((key) => ({
      label: STATUS[key],
      value: STATUS[key],
    }));
    return <SelectTableFilter reactTableColumn={column} options={options} />;
  };

  const ActionCell = ({ cell: { row } }) => (
    <RowButton
      data={row.original}
      color={buttonColour}
      onClick={onButtonClick}
      text={buttonText}
    />
  );

  ActionCell.propTypes = {
    cell: PropTypes.shape({
      row: PropTypes.shape({
        original: PropTypes.object.isRequired,
      }),
    }),
  };

  return [
    {
      Header: 'ID',
      accessor: 'id',
      disableFilters: true,
    },
    {
      Header: 'Judul',
      accessor: 'title',
    },
    
    {
      Header: 'Kategori',
      accessor: 'category',
    },
    {
      Header: 'URL',
      accessor: 'url',
    },
    {
      Header: 'Status Aktif',
      accessor: 'active_status',
      Filter: MobileStatusFilter,
      Cell: ({ cell: { value } }) => <StatusBadge status={value} />,
    },
    {
      Header: 'Aksi',
      id: 'action',
      Cell: ActionCell,
    },
  ];
};

MobileDayclubTableColumns.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonColour: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default MobileDayclubTableColumns;
