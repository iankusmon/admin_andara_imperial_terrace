import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import TitlePage from "components/atoms/title-page";

const UploadBuktiTransferKomisiDetailPage = () => {
  const [files, setFiles] = useState({
    nup: null,
    bookingFee: null,
    downPayment: null,
    totalCommission: null,
  });
  const history = useHistory();

  const handleFileChange = (field, event) => {
    setFiles({ ...files, [field]: event.target.files[0] });
  };

  const handleDelete = (field) => {
    setFiles({ ...files, [field]: null });
  };

  const handleBackToList = () => {
    history.push("/app/super_admin/komisi");
  };

  return (
    <>
      <TitlePage mainTitle="Upload Bukti Transfer Komisi" subTitle="Detail" />
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>
          Kembali ke Daftar
        </Button>
      </div>
      <Row>
        <Col md={12}>
          <Card body>
            <h5>Upload Bukti Transfer</h5>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nup">Bukti Transfer Komisi NUP</Label>
                    <Input type="file" id="nup" onChange={(e) => handleFileChange("nup", e)} />
                    {files.nup && <Button color="danger" onClick={() => handleDelete("nup")} className="mt-2">Hapus</Button>}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="bookingFee">Bukti Transfer Komisi Booking Fee</Label>
                    <Input type="file" id="bookingFee" onChange={(e) => handleFileChange("bookingFee", e)} />
                    {files.bookingFee && <Button color="danger" onClick={() => handleDelete("bookingFee")} className="mt-2">Hapus</Button>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="downPayment">Bukti Transfer Komisi Down Payment</Label>
                    <Input type="file" id="downPayment" onChange={(e) => handleFileChange("downPayment", e)} />
                    {files.downPayment && <Button color="danger" onClick={() => handleDelete("downPayment")} className="mt-2">Hapus</Button>}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="totalCommission">Bukti Transfer Jumlah Komisi</Label>
                    <Input type="file" id="totalCommission" onChange={(e) => handleFileChange("totalCommission", e)} />
                    {files.totalCommission && <Button color="danger" onClick={() => handleDelete("totalCommission")} className="mt-2">Hapus</Button>}
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-right mt-3">
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

export default UploadBuktiTransferKomisiDetailPage;
