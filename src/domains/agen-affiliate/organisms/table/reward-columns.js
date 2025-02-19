import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { RowButton } from "components/atoms";
import { format } from "date-fns"; // Format tanggal
import { id } from "date-fns/locale"; // Locale Indonesia

const propTypes = {
  buttonText: PropTypes.string,
  buttonColour: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func,
};

const actionCellPropTypes = {
  cell: PropTypes.shape({
    row: PropTypes.shape({
      original: PropTypes.object.isRequired,
    }),
  }),
};

const RewardColumns = ({ buttonColour }) => {
  const history = useHistory();

  const handleSelectRow = useCallback(
    (datum, action) => {
      const { id } = datum;
      if (action === "detailPencapaian") {
        history.push({
          pathname: `/app/super_admin/detail-pencapaian-reward/${id}`,
          state: { id },
        });
      } else if (action === "detail") {
        history.push({
          pathname: `/app/super_admin/detail-reward-page/${id}`,
          state: { id },
        });
      }
    },
    [history]
  );

  const ActionCell = ({ cell: { row } }) => (
    <>
      <RowButton
        data={row.original}
        color={buttonColour}
        onClick={() => handleSelectRow(row.original, "detailPencapaian")}
        text="Detail Pencapaian"
      />
      <RowButton
        data={row.original}
        color={buttonColour}
        onClick={() => handleSelectRow(row.original, "detail")}
        text="Detail"
      />
    </>
  );

  ActionCell.propTypes = actionCellPropTypes;

  return [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Nama Agen",
      accessor: "name",
    },
    {
      Header: "Jumlah Reward",
      accessor: "agent_affiliate_rewards",
      id: "jumlah_reward",
      Cell: ({ cell }) => {
        const reward =
          Array.isArray(cell.value) && cell.value.length > 0
            ? cell.value[0].reward_amount
            : 0;
        return `Rp ${parseFloat(reward).toLocaleString("id-ID")}`;
      },
    },
    {
      Header: "Tanggal Pencairan Reward",
      accessor: "agent_affiliate_rewards",
      id: "tanggal_pencairan_reward",
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
      accessor: "agent_affiliate_rewards",
      id: "status_reward",
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

RewardColumns.propTypes = propTypes;

export default RewardColumns;
