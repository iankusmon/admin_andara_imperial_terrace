import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import TitlePage from "components/atoms/title-page";
import AgentAffiliateApi from "../../../../api/v2/admins/agent-affiliate-rewards-api-v2";

const DetailRewardPage = ({ pageUtils }) => {
  const { id } = useParams();
  const [rewardData, setRewardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchRewardDetail = async () => {
      try {
        setIsLoading(true);
        const response = await AgentAffiliateApi.show(id);
        if (!response.data) {
          throw new Error("Data tidak ditemukan");
        }

        const agentData = response.data;
        const rewardsArray = Array.isArray(agentData.agent_affiliate_rewards) ? agentData.agent_affiliate_rewards : [];

        const signupReward = rewardsArray.find((reward) => reward.reward_type === "signup") || {};
        const referralReward = rewardsArray.find((reward) => reward.reward_type === "referral") || {};
        const flashReward = rewardsArray.find((reward) => reward.reward_type === "flash") || {};

        const totalCommission =
          (signupReward.dp_30_paid ? parseFloat(signupReward.reward_amount) || 0 : 0) +
          (flashReward.dp_30_paid ? parseFloat(flashReward.reward_amount) || 0 : 0) +
          (referralReward.dp_30_paid ? parseFloat(referralReward.reward_amount) || 0 : 0);

        const mappedReward = {
          id: agentData.id || null,
          agent_name: agentData.name || "-",
          phone_number: agentData.mobile || "-",
          payout_date: signupReward.paid_at || "", // Tambahkan tanggal pembayaran
          account_opening_reward: parseFloat(signupReward.reward_amount) || 0,
          flash_reward: parseFloat(flashReward.reward_amount) || 0,
          referral_reward: parseFloat(referralReward.reward_amount) || 0,
          total_commission: totalCommission,
          status: signupReward.status || "Pending",
          dp_30_paid_signup: signupReward.dp_30_paid || false,
          dp_30_paid_flash: flashReward.dp_30_paid || false,
          dp_30_paid_referral: referralReward.dp_30_paid || false,
        };

        setRewardData(mappedReward);
      } catch (error) {
        pageUtils?.setApiErrorMsg?.("Error fetching reward details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewardDetail();
  }, [id, pageUtils]);

  const handleBackToList = () => {
    history.push("/app/super_admin/reward");
  };

  const handleNavigateToTransactionHistory = () => {
    history.push(`/app/super_admin/upload-bukti-transfer-reward-detail-page/${id}`);
  };

  const handleFormChange = (field, value) => {
    setRewardData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleTogglePaidValidation = (field) => {
    setRewardData((prevData) => {
      const newStatus = !prevData[field];
      const newTotalCommission =
        (newStatus || prevData.dp_30_paid_signup ? prevData.account_opening_reward : 0) +
        (newStatus || prevData.dp_30_paid_flash ? prevData.flash_reward : 0) +
        (newStatus || prevData.dp_30_paid_referral ? prevData.referral_reward : 0);

      return {
        ...prevData,
        [field]: newStatus,
        total_commission: newTotalCommission,
      };
    });
  };

  const handleSave = async () => {
    if (!id) {
      console.error("Error: ID tidak ditemukan");
      return;
    }

    try {
      await AgentAffiliateApi.update(id, rewardData);
      pageUtils?.setAlertMsg?.("Detail reward berhasil diperbarui.");
    } catch (error) {
      pageUtils?.setApiErrorMsg?.("Gagal memperbarui detail reward.");
    }
  };

  if (isLoading) {
    return (
      <div>
        <TitlePage mainTitle="Reward" subTitle="Detail" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!rewardData) {
    return (
      <div>
        <TitlePage mainTitle="Reward" subTitle="Detail" />
        <p>Data tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <>
      <TitlePage mainTitle="Reward" subTitle="Detail" />
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>
          Kembali ke Daftar
        </Button>
      </div>
      <Row>
        <Col md={12}>
          <Card body>
            <h5>Detail Reward</h5>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Nama Agen</Label>
                    <Input type="text" value={rewardData.agent_name || "-"} disabled />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Nomor Telepon</Label>
                    <Input type="text" value={rewardData.phone_number || "-"} disabled />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Reward Buka Akun</Label>
                    <Input type="text" value={rewardData.account_opening_reward.toLocaleString()} disabled />
                    <Input type="checkbox" checked={rewardData.dp_30_paid_signup} onChange={() => handleTogglePaidValidation("dp_30_paid_signup")} />
                    Validasi DP 30%
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Flash Reward</Label>
                    <Input type="text" value={rewardData.flash_reward.toLocaleString()} disabled />
                    <Input type="checkbox" checked={rewardData.dp_30_paid_flash} onChange={() => handleTogglePaidValidation("dp_30_paid_flash")} />
                    Validasi DP 30%
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Reward Referral</Label>
                    <Input type="text" value={rewardData.referral_reward.toLocaleString()} disabled />
                    <Input type="checkbox" checked={rewardData.dp_30_paid_referral} onChange={() => handleTogglePaidValidation("dp_30_paid_referral")} />
                    Validasi DP 30%
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Tanggal Pembayaran</Label>
                    <Input type="date" value={rewardData.payout_date || ""} onChange={(e) => handleFormChange("payout_date", e.target.value)} />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label>Jumlah Reward</Label>
                <Input type="text" value={rewardData.total_commission.toLocaleString()} disabled />
              </FormGroup>
            </Form>
          </Card>
        </Col>
      </Row>
      <div className="text-right mt-3">
        <Button color="info" onClick={handleNavigateToTransactionHistory}>Riwayat Transaksi</Button>
        <Button color="secondary" className="ml-2">Cancel</Button>
        <Button color="primary" className="ml-2" onClick={handleSave}>Save</Button>
      </div>
    </>
  );
};

export default DetailRewardPage;
