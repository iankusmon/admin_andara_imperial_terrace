import React from "react";
import PropTypes from "prop-types";
import { RowButton } from "components/atoms";
import { format } from "date-fns"; // Format tanggal
import { id } from "date-fns/locale"; // Locale Indonesia

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
 * Columns definition for Komisi Table
 */
const KomisiColumns = ({ buttonText, buttonColour, onButtonClick }) => {
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
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Nama Agent",
      accessor: "name",
    },
    {
      Header: "Jumlah Komisi",
      accessor: "agent_affiliate_commissions",
      id: "jumlah_komisi", // ID unik
      Cell: ({ cell }) => {
        const commission =
          Array.isArray(cell.value) && cell.value.length > 0
            ? cell.value[0].commission_amount
            : 0;
        return `Rp ${parseFloat(commission).toLocaleString("id-ID")}`;
      },
    },
    {
      Header: "Tanggal Pencairan Komisi",
      accessor: "agent_affiliate_commissions",
      id: "tanggal_pencairan_komisi", // ID unik
      Cell: ({ cell }) => {
        const dateStr =
          Array.isArray(cell.value) && cell.value.length > 0
            ? cell.value[0].paid_at
            : null;
        if (!dateStr) return "-";
        return format(new Date(dateStr), "dd MMMM yyyy", { locale: id });
      },
    },
    {
      Header: "Status",
      accessor: "agent_affiliate_commissions",
      id: "status_komisi", // ID unik
      Cell: ({ cell }) => {
        const status =
          Array.isArray(cell.value) && cell.value.length > 0
            ? cell.value[0].dp_30_paid
              ? "Paid"
              : "Unpaid"
            : "-";
        return status;
      },
    },
   
    {
      Header: "Aksi",
      id: "action",
      Cell: ActionCell,
    },
  ];
};


KomisiColumns.propTypes = propTypes;

export default KomisiColumns;
