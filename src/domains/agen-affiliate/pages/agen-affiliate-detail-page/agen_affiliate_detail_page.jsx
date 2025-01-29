import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Gunakan useHistory untuk React Router v5
import { Row, Col, Card, Button } from "reactstrap";
import PropTypes from "prop-types";
import TitlePage from "components/atoms/title-page";
import AgenAffiliateForm from "domains/agen-affiliate/organisms/agen-affiliate-form"; // Perbaiki path

const AgenAffiliateDetailPage = ({ pageUtils }) => {
  const [affiliateData, setAffiliateData] = useState(null);
  const history = useHistory(); // Pakai useHistory untuk navigasi

  // Dummy Data
  const dummyData = {
    id: 1,
    nik: "3355911923890001",
    phone: "081234567890",
    email: "timlT@gmail.com",
    address: "Jl. Pahlawan No. 1",
    paket_nup: "Paket Eksklusif",
    pekerjaan: "Wiraswasta",
    due_date: "2025-01-01",
    booking_amount: "Rp 10.000.000",
    status: "Proses",
    ktp: null,
    kk: null,
  };

  useEffect(() => {
    setTimeout(() => {
      setAffiliateData(dummyData);
    }, 500);
  }, []);

  const handleBackToList = () => {
    history.push("/app/super_admin/agenaffiliate"); // Gunakan history.push
  };

  const handleFormSubmit = (updatedData) => {
    console.log("Updated Affiliate Data:", updatedData);
    setTimeout(() => {
      setAffiliateData(updatedData);
      alert("Data Agen Affiliate berhasil diperbarui!");
    }, 500);
  };

  if (!affiliateData) {
    return (
      <div>
        <TitlePage mainTitle="Agen Affiliate" subTitle="Detail" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <TitlePage mainTitle="Agen Affiliate" subTitle="Detail" />
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>
          Kembali ke Daftar
        </Button>
      </div>
      <Row>
        <Col md={12}>
          <Card body>
            <h5>Edit Detail Agen Affiliate</h5>
            <AgenAffiliateForm
              data={affiliateData}
              onSubmit={handleFormSubmit}
              readOnly={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

AgenAffiliateDetailPage.propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

export default AgenAffiliateDetailPage;
