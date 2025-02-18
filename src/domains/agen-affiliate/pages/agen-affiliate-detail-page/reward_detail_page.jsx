import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Using useHistory for v5
import { Row, Col, Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import TitlePage from "components/atoms/title-page";

const DetailRewardPage = () => {
  const [rewardData, setRewardData] = useState(null);
  const history = useHistory(); // useHistory instead of useNavigate

  const dummyData = {
    agent_name: "Bintang",
    phone_number: "081234567890",
    payout_date: "2025-03-01",
    account_opening_reward: 500000,
    flash_reward: 1000000,
    referral_reward: 1000000,
    total_commission: 52800000,
    status: "Proses",
  };

  useEffect(() => {
    setTimeout(() => {
      setRewardData(dummyData);
    }, 500);
  }, []);

  const handleBackToList = () => {
    history.push("/app/super_admin/reward_list"); // Using history.push for navigation
  };

  const handleFormChange = (field, value) => {
    setRewardData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleNavigateToTransactionHistory = () => {
    history.push(`/app/super_admin/upload-bukti-transfer-reward-detail-page/${rewardData.id}`);
  };

  if (!rewardData) {
    return (
      <div>
        <TitlePage mainTitle="Reward" subTitle="Detail" />
        <p>Memuat...</p>
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
            <h5>Edit Detail Reward</h5>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Nama Agen</Label>
                    <Input
                      value={rewardData.agent_name}
                      onChange={(e) => handleFormChange("agent_name", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Nomor Telepon</Label>
                    <Input
                      value={rewardData.phone_number}
                      onChange={(e) => handleFormChange("phone_number", e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Tanggal Pencairan</Label>
                    <Input
                      type="date"
                      value={rewardData.payout_date}
                      onChange={(e) => handleFormChange("payout_date", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Reward Buka Akun</Label>
                    <Input
                      value={rewardData.account_opening_reward.toLocaleString()}
                      onChange={(e) => handleFormChange("account_opening_reward", e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Flash Reward</Label>
                    <Input
                      value={rewardData.flash_reward.toLocaleString()}
                      onChange={(e) => handleFormChange("flash_reward", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Reward Referral</Label>
                    <Input
                      value={rewardData.referral_reward.toLocaleString()}
                      onChange={(e) => handleFormChange("referral_reward", e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Jumlah Komisi</Label>
                    <Input
                      value={rewardData.total_commission.toLocaleString()}
                      onChange={(e) => handleFormChange("total_commission", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Status</Label>
                    <Input
                      value={rewardData.status}
                      onChange={(e) => handleFormChange("status", e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      <div className="text-right mt-3">
        <Button onClick={handleNavigateToTransactionHistory}>Riwayat Transaksi</Button>
        <Button className="ml-2">Cancel</Button>
        <Button className="ml-2" color="primary">
          Save
        </Button>
      </div>
    </>
  );
};

export default DetailRewardPage;
