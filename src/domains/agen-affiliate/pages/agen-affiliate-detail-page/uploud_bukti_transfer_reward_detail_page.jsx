import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import TitlePage from "components/atoms/title-page";
import AgentAffiliateApi from "../../../../api/v2/admins/agent-affiliate-rewards-api-v2";

const UploadBuktiTransferRewardDetailPage = () => {
  const [files, setFiles] = useState({
    bukaAkun: null,
    flashReward: null,
    rewardReferral: null,
    totalReward: null,
  });
  const [uploading, setUploading] = useState(false);
  const history = useHistory();

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles((prevFiles) => ({ ...prevFiles, [field]: file }));
    }
  };

  const handleDelete = (field) => {
    setFiles((prevFiles) => ({ ...prevFiles, [field]: null }));
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

      await AgentAffiliateApi.uploadBuktiTransfer(formData);
      alert("Bukti transfer reward berhasil diunggah!");
      history.push("/app/super_admin/reward");
    } catch (error) {
      console.error("Gagal mengunggah bukti transfer reward:", error);
      alert("Gagal mengunggah bukti transfer reward.");
    } finally {
      setUploading(false);
    }
  };

  const handleBackToList = () => {
    history.push("/app/super_admin/reward");
  };

  return (
    <>
      <TitlePage mainTitle="Upload Bukti Transfer Reward" subTitle="Detail" />
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList} disabled={uploading}>
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
                    <Label>Bukti Transfer Reward Buka Akun</Label>
                    <Input type="file" accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("bukaAkun", e)} />
                    {files.bukaAkun && (
                      <div className="mt-2">
                        <span>{files.bukaAkun.name}</span>
                        <Button color="danger" size="sm" onClick={() => handleDelete("bukaAkun")} className="ml-2">
                          Hapus
                        </Button>
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Bukti Transfer Flash Reward</Label>
                    <Input type="file" accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("flashReward", e)} />
                    {files.flashReward && (
                      <div className="mt-2">
                        <span>{files.flashReward.name}</span>
                        <Button color="danger" size="sm" onClick={() => handleDelete("flashReward")} className="ml-2">
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
                    <Label>Bukti Transfer Reward Referral</Label>
                    <Input type="file" accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("rewardReferral", e)} />
                    {files.rewardReferral && (
                      <div className="mt-2">
                        <span>{files.rewardReferral.name}</span>
                        <Button color="danger" size="sm" onClick={() => handleDelete("rewardReferral")} className="ml-2">
                          Hapus
                        </Button>
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Bukti Transfer Jumlah Reward</Label>
                    <Input type="file" accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("totalReward", e)} />
                    {files.totalReward && (
                      <div className="mt-2">
                        <span>{files.totalReward.name}</span>
                        <Button color="danger" size="sm" onClick={() => handleDelete("totalReward")} className="ml-2">
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

export default UploadBuktiTransferRewardDetailPage;
