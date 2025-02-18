import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Jika menggunakan react-router-dom v5
// import { useNavigate } from 'react-router-dom'; // Gunakan ini jika menggunakan v6
import { Row, Col, Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import TitlePage from "components/atoms/title-page";

const KomisiDetailPage = ({ pageUtils }) => {
  const [customerData, setCustomerData] = useState(null);
  const history = useHistory(); // Gunakan useHistory jika menggunakan v5
  // const navigate = useNavigate(); // Gunakan ini jika menggunakan v6

  const dummyData = {
    id: 1,
    agent_affiliate_id: 10,
    property_unit_id: 101,
    unit_price: 3000000000.0,
    commission_percentage: 5.0,
    commission_amount: 150000000.0,
    dp_30_paid: true,
    paid_at: "2025-01-10T10:00:00Z",
    created_at: "2025-01-01T08:00:00Z",
    updated_at: "2025-01-05T12:00:00Z"
  };

  useEffect(() => {
    setTimeout(() => {
      setCustomerData(dummyData);
    }, 500);
  }, [dummyData]); // Tambahkan dummyData di dependency array

  const handleBackToList = () => {
    history.push("/app/super_admin/survey_calon_customer"); 
 
  };

  const handleFormChange = (field, value) => {
    setCustomerData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleNavigateToTransactionHistory = () => {
    history.push(`/app/super_admin/transaction_history/${customerData.id}`); 
  };

  if (!customerData) {
    return (
      <div>
        <TitlePage mainTitle="Komisi" subTitle="Detail" />
        <p>Loading...</p>
      </div>
    );
  }

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
            <h5>Edit Detail Komisi</h5>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="agent_affiliate_id">ID Agen Affiliate</Label>
                    <Input
                      id="agent_affiliate_id"
                      value={customerData.agent_affiliate_id}
                      onChange={(e) => handleFormChange("agent_affiliate_id", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="property_unit_id">ID Unit Properti</Label>
                    <Input
                      id="property_unit_id"
                      value={customerData.property_unit_id}
                      onChange={(e) => handleFormChange("property_unit_id", e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="unit_price">Harga Unit</Label>
                    <Input
                      type="number"
                      id="unit_price"
                      value={customerData.unit_price}
                      onChange={(e) => handleFormChange("unit_price", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="commission_percentage">Persentase Komisi</Label>
                    <Input
                      type="number"
                      id="commission_percentage"
                      value={customerData.commission_percentage}
                      onChange={(e) => handleFormChange("commission_percentage", e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="commission_amount">Jumlah Komisi</Label>
                    <Input
                      type="number"
                      id="commission_amount"
                      value={customerData.commission_amount}
                      onChange={(e) => handleFormChange("commission_amount", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup check className="d-flex align-items-center">
                    <Input
                      type="checkbox"
                      id="dp_30_paid"
                      checked={customerData.dp_30_paid}
                      onChange={(e) => handleFormChange("dp_30_paid", e.target.checked)}
                    />
                    <Label for="dp_30_paid" className="ml-2 mb-0">
                      DP 30% Dibayar
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="paid_at">Tanggal Pembayaran</Label>
                    <Input
                      type="datetime-local"
                      id="paid_at"
                      value={customerData.paid_at}
                      onChange={(e) => handleFormChange("paid_at", e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-right mt-3">
                <Button onClick={handleNavigateToTransactionHistory}>Riwayat Transaksi</Button>
                <Button className="ml-2">Cancel</Button>
                <Button className="ml-2" color="primary">
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

export default KomisiDetailPage;
