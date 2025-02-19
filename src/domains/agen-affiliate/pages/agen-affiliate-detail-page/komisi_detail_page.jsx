import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import TitlePage from "components/atoms/title-page";
import AgentAffiliateApi from "../../../../api/v2/admins/agent-affiliate-rewards-api-v2";

const KomisiDetailPage = ({ pageUtils }) => {
  const { id } = useParams();
  const [commissionData, setCommissionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(""); // Untuk menyimpan status yang dipilih
  const history = useHistory();

  useEffect(() => {
    const fetchCommissionDetail = async () => {
      try {
        setIsLoading(true);
        const response = await AgentAffiliateApi.show(id);
        console.log("Commission Data:", response.data); // Debugging log
        setCommissionData(response.data);

        // Jika ada status, set ke state
        const commission = response.data.agent_affiliate_commissions?.[0];
        setSelectedStatus(commission?.status || "Pending"); // Default "Pending" jika status tidak ada
      } catch (error) {
        console.error("Error fetching commission details:", error);
        pageUtils?.setApiErrorMsg?.("Error fetching commission details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommissionDetail();
  }, [id, pageUtils]);

  const handleBackToList = () => {
    history.push("/app/super_admin/komisi");
  };

  const handleNavigateToTransactionHistory = () => {
    history.push(`/app/super_admin/transaction_history/${id}`);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSave = async () => {
    try {
      // Kirim perubahan status ke API
      await AgentAffiliateApi.updateStatus(id, { status: selectedStatus });
      pageUtils?.setAlertMsg?.("Status berhasil diperbarui.");
    } catch (error) {
      console.error("Gagal memperbarui status:", error);
      pageUtils?.setApiErrorMsg?.("Gagal memperbarui status.");
    }
  };

  if (isLoading) {
    return (
      <div>
        <TitlePage mainTitle="Komisi" subTitle="Detail" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!commissionData) {
    return (
      <div>
        <TitlePage mainTitle="Komisi" subTitle="Detail" />
        <p>Data tidak ditemukan.</p>
      </div>
    );
  }

  const agentName = commissionData.name || "-";
  const commission = commissionData.agent_affiliate_commissions?.[0] || {};

  return (
    <>
      <TitlePage mainTitle="Komisi" subTitle="Detail" />
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>
          Kembali ke Daftar
        </Button>
      </div>
      <Row>
        <Col md={12}>
          <Card body>
            <h5>Detail Komisi</h5>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>ID Agen Affiliate</Label>
                    <Input type="text" value={commission.agent_affiliate_id || "-"} disabled />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Nama Agen</Label>
                    <Input type="text" value={agentName} disabled />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>ID Unit Properti</Label>
                    <Input type="text" value={commission.property_unit_id || "-"} disabled />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Harga Unit</Label>
                    <Input type="text" value={commission.unit_price ? commission.unit_price.toLocaleString() : "0"} disabled />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Persentase Komisi</Label>
                    <Input type="text" value={`${commission.commission_percentage || 0}%`} disabled />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Jumlah Komisi</Label>
                    <Input type="text" value={commission.commission_amount ? commission.commission_amount.toLocaleString() : "0"} disabled />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Status</Label>
                    <Input type="select" value={selectedStatus} onChange={handleStatusChange}>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Tanggal Pembayaran</Label>
                    <Input type="text" value={commission.paid_at ? new Date(commission.paid_at).toLocaleString() : "Belum Dibayar"} disabled />
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-right mt-3">
                <Button onClick={handleNavigateToTransactionHistory}>Riwayat Transaksi</Button>
                <Button className="ml-2">Cancel</Button>
                <Button className="ml-2" color="primary" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

KomisiDetailPage.propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

export default KomisiDetailPage;
