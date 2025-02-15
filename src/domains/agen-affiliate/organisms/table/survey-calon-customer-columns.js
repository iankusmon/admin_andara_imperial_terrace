import React from 'react';
import PropTypes from 'prop-types';
import { RowButton } from 'components/atoms';

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
 * Columns definition for Survey Calon Customer Table
 */
const surveyCalonCustomerColumns = ({ buttonText, buttonColour, onButtonClick }) => {
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
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Nama Calon Customer',
      accessor: 'name',
    },
    {
      Header: 'Nomor Telepon',
      accessor: 'phone',
    },
    {
      Header: 'Tanggal Survey',
      accessor: 'survey_date',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ cell }) => (cell.value === 'berhasil' ? 'Berhasil' : 'Proses'),
    },
    {
      Header: 'Aksi',
      id: 'action',
      Cell: ActionCell,
    },
  ];
};

surveyCalonCustomerColumns.propTypes = propTypes;

export default surveyCalonCustomerColumns;
