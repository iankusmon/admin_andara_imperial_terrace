import React from 'react';
import PropTypes from 'prop-types';
import { STATUS } from 'domains/article/constants/article-constant';
import StatusBadge from 'domains/article/atoms/status-badge';
import { RowButton, SelectTableFilter } from 'components/atoms';

const propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonColour: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.func,
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
 * Columns definition for Article Table
 * @param {string} buttonText - The text that appears at the button on each row
 * @param {string} buttonColour - Bootstrap button type class name (e.g., primary)
 * @param {Function} onButtonClick - Function that will run when the button is clicked
 */
const articleTableColumns = ({ buttonText, buttonColour, onButtonClick }) => {
  const ArticleStatusFilter = ({ column }) => {
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

  ActionCell.propTypes = actionCellPropTypes;

  return [
    {
      Header: 'Id',
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
      Filter: ArticleStatusFilter, // Filter untuk status
      Cell: ({ cell: { value } }) => <StatusBadge status={value} />, // Tampilkan StatusBadge
    },
    {
      Header: 'Action',
      id: 'action',
      Cell: ActionCell, // Tampilkan tombol aksi
    },
  ];
};

articleTableColumns.propTypes = propTypes;

export default articleTableColumns;
