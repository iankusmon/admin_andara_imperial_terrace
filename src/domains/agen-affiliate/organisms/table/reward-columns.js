import React from "react";
import PropTypes from "prop-types";
import { RowButton } from "components/atoms";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const propTypes = {
  buttonColour: PropTypes.string.isRequired,
  onDetailPencapaianClick: PropTypes.func.isRequired,
  onDetailClick: PropTypes.func.isRequired,
};

const actionCellPropTypes = {
  cell: PropTypes.shape({
    row: PropTypes.shape({
      original: PropTypes.object.isRequired,
    }),
  }),
};

const RewardColumns = ({ buttonColour, onDetailPencapaianClick, onDetailClick }) => {
  const ActionCell = ({ cell: { row } }) => (
    <>
      <RowButton
        data={row.original}
        color={buttonColour}
        onClick={() => onDetailPencapaianClick(row.original)}
        text="Detail Pencapaian"
      />
      <RowButton
        data={row.original}
        color={buttonColour}
        onClick={() => onDetailClick(row.original)}
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
      Header: "Reward Bulanan",
      accessor: "agent_affiliate_rewards",
      id: "reward_bulanan",
      Cell: ({ cell }) => {
        const rewards = cell.value || [];
        const rewardObj = rewards.find(r => r.reward_type === "signup");
        const reward = rewardObj ? parseFloat(rewardObj.reward_amount) : 0;
        return `Rp ${reward.toLocaleString("id-ID")}`;
      },
    },
    {
      Header: "Reward Referral",
      accessor: "agent_affiliate_rewards",
      id: "reward_referral",
      Cell: ({ cell }) => {
        const rewards = cell.value || [];
        const rewardObj = rewards.find(r => r.reward_type === "referral");
        const reward = rewardObj ? parseFloat(rewardObj.reward_amount) : 0;
        return `Rp ${reward.toLocaleString("id-ID")}`;
      },
    },
    {
      Header: "Reward Flash",
      accessor: "agent_affiliate_rewards",
      id: "reward_flash",
      Cell: ({ cell }) => {
        const rewards = cell.value || [];
        const rewardObj = rewards.find(r => r.reward_type === "flash");
        const reward = rewardObj ? parseFloat(rewardObj.reward_amount) : 0;
        return `Rp ${reward.toLocaleString("id-ID")}`;
      },
    },
    {
      Header: "Tanggal Pencairan Reward",
      accessor: "agent_affiliate_rewards",
      id: "tanggal_pencairan_reward",
      Cell: ({ cell }) => {
        const rewards = cell.value || [];
        const rewardWithPaidAt = rewards.find(r => r.paid_at);

        if (!rewardWithPaidAt || !rewardWithPaidAt.paid_at) {
          return "Belum Dicairkan";
        }

        const parsedDate = new Date(rewardWithPaidAt.paid_at);
        return !isNaN(parsedDate.getTime()) ? format(parsedDate, "dd MMMM yyyy", { locale: id }) : "Belum Dicairkan";
      },
    },
    {
      Header: "Status",
      accessor: "agent_affiliate_rewards",
      id: "status_reward",
      Cell: ({ cell }) => {
        const rewards = cell.value || [];
        const rewardStatus = rewards.find(r => r.status)?.status || "Pending";
        return rewardStatus;
      },
    },
    {
      Header: "Aksi",
      accessor: "action",
      id: "action",
      Cell: ActionCell,
    },
  ];
};


RewardColumns.propTypes = propTypes;
export default RewardColumns;
