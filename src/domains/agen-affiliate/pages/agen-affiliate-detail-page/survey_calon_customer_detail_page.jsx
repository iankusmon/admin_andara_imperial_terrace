import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import TitlePage from "components/atoms/title-page";

const statusOptions = ["Proses", "Berhasil", "Gagal"];

const SurveyCalonCustomerDetailPage = ({ pageUtils }) => {
  const [customerData, setCustomerData] = useState(null);
  const history = useHistory();

  const dummyData = {
    id: 1,
    name: "Budi Santoso",
    phone: "081234567890",
    email: "budi@example.com",
    address: "Jl. Pahlawan No. 1",
    survey_date: "2025-01-01",
    survey_time: "10:00",
    pekerjaan: "Wiraswasta",
    notulensi: "Calon pelanggan tertarik dengan penawaran.",
    foto_survey: null,
    video_survey: null,
    status: "Proses",
  };

  useEffect(() => {
    setTimeout(() => {
      setCustomerData(dummyData);
    }, 500);
  }, []);

  const handleBackToList = () => {
    history.push("/app/super_admin/survey_calon_customer");
  };

  const handleNavigateToTransactionHistory = () => {
    history.push(`/app/super_admin/riwayattransaksisurveycaloncustomer/${customerData.id}`);
  };

  const handleFormChange = (field, value) => {
    setCustomerData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setCustomerData((prevData) => ({ ...prevData, [field]: fileURL }));
    }
  };

  if (!customerData) {
    return (
      <div>
        <TitlePage mainTitle="Survey Calon Customer" subTitle="Detail" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <TitlePage mainTitle="Survey Calon Customer" subTitle="Detail" />
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>
          Kembali ke Daftar
        </Button>
      </div>
      <Row>
        <Col md={12}>
          <Card body>
            <h5>Edit Detail Survey Calon Customer</h5>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Nama Calon Customer</Label>
                    <Input
                      id="name"
                      value={customerData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      value={customerData.phone}
                      onChange={(e) => handleFormChange("phone", e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      value={customerData.email}
                      onChange={(e) => handleFormChange("email", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="address">Alamat</Label>
                    <Input
                      id="address"
                      value={customerData.address}
                      onChange={(e) => handleFormChange("address", e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="survey_date">Tanggal Survey</Label>
                    <Input
                      type="date"
                      id="survey_date"
                      value={customerData.survey_date}
                      onChange={(e) => handleFormChange("survey_date", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="survey_time">Waktu Survey</Label>
                    <Input
                      type="time"
                      id="survey_time"
                      value={customerData.survey_time}
                      onChange={(e) => handleFormChange("survey_time", e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="pekerjaan">Pekerjaan Calon Customer</Label>
                    <Input
                      id="pekerjaan"
                      value={customerData.pekerjaan}
                      onChange={(e) => handleFormChange("pekerjaan", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="status">Status</Label>
                    <Input
                      type="select"
                      id="status"
                      value={customerData.status}
                      onChange={(e) => handleFormChange("status", e.target.value)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
               {/* Upload Foto & Video */}
               <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="foto_survey">Upload Foto Survey</Label>
                    <Input type="file" accept="image/*" onChange={(e) => handleFileChange("foto_survey", e)} />
                    {customerData.foto_survey && (
                      <img
                        src={customerData.foto_survey}
                        alt="Foto Survey"
                        className="mt-2"
                        style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="video_survey">Upload Video Survey</Label>
                    <Input type="file" accept="video/*" onChange={(e) => handleFileChange("video_survey", e)} />
                    {customerData.video_survey && (
                      <video controls className="mt-2" style={{ width: "100%", maxHeight: "300px", borderRadius: "8px" }}>
                        <source src={customerData.video_survey} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="notulensi">Notulensi Survey</Label>
                    <Input
                      type="textarea"
                      id="notulensi"
                      value={customerData.notulensi}
                      onChange={(e) => handleFormChange("notulensi", e.target.value)}
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

export default SurveyCalonCustomerDetailPage;
