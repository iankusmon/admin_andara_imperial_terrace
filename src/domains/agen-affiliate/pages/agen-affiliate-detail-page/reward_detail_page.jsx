import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import TitlePage from "components/atoms/title-page";
import AgentAffiliateApi from "../../../../api/v2/admins/agent-affiliate-rewards-api-v2";

const DetailRewardPage = ({ pageUtils }) => {
  const { id } = useParams(); // ✅ Ambil id dari URL
  const [rewardData, setRewardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchRewardDetail = async () => {
      try {
        setIsLoading(true);
        const response = await AgentAffiliateApi.show(id);
        console.log("Reward Data:", response.data); // Debugging log
        setRewardData(response.data);
      } catch (error) {
        console.error("Error fetching reward details:", error);
        pageUtils?.setApiErrorMsg?.("Error fetching reward details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewardDetail();
  }, [id, pageUtils]);

  const handleBackToList = () => {
    history.push("/app/super_admin/reward_list");
  };

  const handleNavigateToTransactionHistory = () => {
    history.push(`/app/super_admin/upload-bukti-transfer-reward-detail-page/${id}`);
  };

  const handleFormChange = (field, value) => {
    setRewardData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await AgentAffiliateApi.update(id, rewardData);
      pageUtils?.setAlertMsg?.("Detail reward berhasil diperbarui.");
    } catch (error) {
      console.error("Gagal memperbarui detail reward:", error);
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

  // 🟢 Ambil Nama Agen & Nomor Telepon dengan fallback jika tidak tersedia
  const agentName = rewardData.agent_name || rewardData.name || "-";
  const agentPhone = rewardData.phone_number || rewardData.mobile || "-";

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
                    <Input type="text" value={agentName} disabled />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Nomor Telepon</Label>
                    <Input type="text" value={agentPhone} disabled />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Tanggal Pencairan</Label>
                    <Input
                      type="date"
                      value={rewardData.payout_date || ""}
                      onChange={(e) => handleFormChange("payout_date", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Reward Buka Akun</Label>
                    <Input type="text" value={rewardData.account_opening_reward?.toLocaleString() || "0"} disabled />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Flash Reward</Label>
                    <Input type="text" value={rewardData.flash_reward?.toLocaleString() || "0"} disabled />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Reward Referral</Label>
                    <Input type="text" value={rewardData.referral_reward?.toLocaleString() || "0"} disabled />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Jumlah Komisi</Label>
                    <Input type="text" value={rewardData.total_commission?.toLocaleString() || "0"} disabled />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Status</Label>
                    <Input
                      type="select"
                      value={rewardData.status || "Pending"}
                      onChange={(e) => handleFormChange("status", e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </Input>
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
        <Button className="ml-2" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
};

DetailRewardPage.propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

export default DetailRewardPage;
