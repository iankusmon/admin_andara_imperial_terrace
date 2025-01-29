import React from 'react';
import PropTypes from 'prop-types';
import { RowButton, SelectTableFilter } from 'components/atoms';

const propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonColour: PropTypes.string.isRequired,
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
 * Columns definition for Agent Affiliate Table
 */
const agentAffiliateColumns = ({ buttonText, buttonColour, onButtonClick }) => {
  const ActionCell = ({ cell: { row } }) => (
    <RowButton
      data={row.original}
      color={buttonColour}
      onClick={() => onButtonClick(row.original)}
      text={buttonText}
    />
  );

  ActionCell.propTypes = actionCellPropTypes;

  return [
    {
      Header: 'No',
      accessor: 'no',
      disableFilters: true,
      Cell: ({ cell }) => cell.row.index + 1, // Auto-generate row number
    },
    {
      Header: 'ID',
      accessor: 'agent_id',
     
    },
    {
      Header: 'Nama',
      accessor: 'name',
     
    },
    {
      Header: 'Daerah',
      accessor: 'region',
     
    },
    {
      Header: 'Aksi',
      id: 'action',
      Cell: ActionCell,
    },
  ];
};

agentAffiliateColumns.propTypes = propTypes;

export default agentAffiliateColumns;
