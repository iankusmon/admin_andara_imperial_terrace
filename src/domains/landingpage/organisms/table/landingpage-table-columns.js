import React from 'react';
import PropTypes from 'prop-types';
import { RowButton } from 'components/atoms';

const propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonColour: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

/**
 * Columns definition for Landing Page Table
 */
const landingPageTableColumns = ({ buttonText, buttonColour, onButtonClick }) => {
  const ActionCell = ({ cell: { row } }) => (
    <RowButton
      data={row.original}
      color={buttonColour}
      onClick={() => onButtonClick(row.original)}
      text={buttonText}
    />
  );

  ActionCell.propTypes = {
    cell: PropTypes.shape({
      row: PropTypes.shape({
        original: PropTypes.object.isRequired,
      }),
    }).isRequired,
  };

  return [
    {
      Header: 'No',
      accessor: 'id',
      disableFilters: true,
    },
    {
      Header: 'Landing Page',
      accessor: 'title',
    },
    {
      Header: 'Tanggal Update',
      accessor: 'updated_at',
    },
    {
      Header: 'Action',
      id: 'action',
      Cell: ActionCell,
    },
  ];
};

landingPageTableColumns.propTypes = propTypes;

export default landingPageTableColumns;
