import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import TitlePage from "components/atoms/title-page";

const UploadBuktiTransferRewardDetailPage = () => {
  const [files, setFiles] = useState({
    bukaAkun: null,
    flashReward: null,
    rewardReferral: null,
    totalReward: null,
  });
  const history = useHistory();

  const handleFileChange = (field, event) => {
    setFiles({ ...files, [field]: event.target.files[0] });
  };

  const handleDelete = (field) => {
    setFiles({ ...files, [field]: null });
  };

  const handleBackToList = () => {
    history.push("/app/super_admin/reward");
  };

  return (
    <>
      <TitlePage mainTitle="Upload Bukti Transfer Reward" subTitle="Detail" />
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
                    <Label for="bukaAkun">Bukti Transfer Reward Buka Akun</Label>
                    <Input type="file" id="bukaAkun" onChange={(e) => handleFileChange("bukaAkun", e)} />
                    {files.bukaAkun && <Button color="danger" onClick={() => handleDelete("bukaAkun")} className="mt-2">Hapus</Button>}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="flashReward">Bukti Transfer Flash Reward</Label>
                    <Input type="file" id="flashReward" onChange={(e) => handleFileChange("flashReward", e)} />
                    {files.flashReward && <Button color="danger" onClick={() => handleDelete("flashReward")} className="mt-2">Hapus</Button>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="rewardReferral">Bukti Transfer Reward Referral</Label>
                    <Input type="file" id="rewardReferral" onChange={(e) => handleFileChange("rewardReferral", e)} />
                    {files.rewardReferral && <Button color="danger" onClick={() => handleDelete("rewardReferral")} className="mt-2">Hapus</Button>}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="totalReward">Bukti Transfer Jumlah Reward</Label>
                    <Input type="file" id="totalReward" onChange={(e) => handleFileChange("totalReward", e)} />
                    {files.totalReward && <Button color="danger" onClick={() => handleDelete("totalReward")} className="mt-2">Hapus</Button>}
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

export default UploadBuktiTransferRewardDetailPage;
