import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import TitlePage from "components/atoms/title-page";
import AgentAffiliateApi from "../../../../api/v2/admins/agent-affiliate-rewards-api-v2";

const UploadBuktiTransferKomisiDetailPage = () => {
  const [files, setFiles] = useState({
    nup: null,
    bookingFee: null,
    downPayment: null,
    totalCommission: null,
  });
  const [uploading, setUploading] = useState(false); // Status upload
  const history = useHistory();

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles({ ...files, [field]: file });
    }
  };

  const handleDelete = (field) => {
    setFiles({ ...files, [field]: null });
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          formData.append(key, files[key]);
        }
      });

      // Panggil API untuk upload
      await AgentAffiliateApi.uploadBuktiTransfer(formData);
      alert("Bukti transfer berhasil diunggah!");
      history.push("/app/super_admin/komisi"); // Kembali ke daftar
    } catch (error) {
      console.error("Gagal mengunggah bukti transfer:", error);
      alert("Gagal mengunggah bukti transfer.");
    } finally {
      setUploading(false);
    }
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
                    <Label>Bukti Transfer Komisi NUP</Label>
                    <Input type="file" accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("nup", e)} />
                    {files.nup && (
                      <div className="mt-2">
                        <span>{files.nup.name}</span>
                        <Button color="danger" size="sm" onClick={() => handleDelete("nup")} className="ml-2">
                          Hapus
                        </Button>
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Bukti Transfer Komisi Booking Fee</Label>
                    <Input type="file" accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("bookingFee", e)} />
                    {files.bookingFee && (
                      <div className="mt-2">
                        <span>{files.bookingFee.name}</span>
                        <Button color="danger" size="sm" onClick={() => handleDelete("bookingFee")} className="ml-2">
                          Hapus
                        </Button>
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Bukti Transfer Komisi Down Payment</Label>
                    <Input type="file" accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("downPayment", e)} />
                    {files.downPayment && (
                      <div className="mt-2">
                        <span>{files.downPayment.name}</span>
                        <Button color="danger" size="sm" onClick={() => handleDelete("downPayment")} className="ml-2">
                          Hapus
                        </Button>
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Bukti Transfer Jumlah Komisi</Label>
                    <Input type="file" accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("totalCommission", e)} />
                    {files.totalCommission && (
                      <div className="mt-2">
                        <span>{files.totalCommission.name}</span>
                        <Button color="danger" size="sm" onClick={() => handleDelete("totalCommission")} className="ml-2">
                          Hapus
                        </Button>
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-right mt-3">
                <Button color="secondary" onClick={handleBackToList} disabled={uploading}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleUpload} disabled={uploading}>
                  {uploading ? "Mengunggah..." : "Upload"}
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
