import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button } from "reactstrap";
import TitlePage from "components/atoms/title-page";

const RiwayatTransaksiSurveyCalonCustomerDetailPage = () => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, title: "Tahapan Pendaftaran NUP", price: "Rp 100.000", date: "1 Desember 2024" },
    { id: 2, title: "Tahapan Pembayaran Booking Fee", price: "Rp 1.000.000", date: "2 Desember 2024" },
    { id: 3, title: "Tahapan Down Payment", price: "Rp 5.000.000", date: "3 Desember 2024" },
  ];

  const handleBackToList = () => {
    history.push("/app/super_admin/surveycaloncustomer/${id}");
  };

  return (
    <>
      <TitlePage mainTitle="Riwayat Transaksi" subTitle="Survey Calon Customer" />
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>Kembali ke Daftar</Button>
      </div>
      <Row>
        <Col md={12}>
         
            <h2 className="mb-4">Andara Imperial Terrace</h2>
            {steps.map((step) => (
              <div key={step.id} className="mb-3">
                {/* Title di luar Card */}
                <h3 className="mb-2">{step.title}</h3>
                {/* Card hanya untuk price, date, dan status */}
                <Card className="p-3">
                  <Row>
                    <Col xs={6}>
                      <p><strong>Harga:</strong> {step.price}</p>
                      <h6><strong>Tanggal:</strong> {step.date}</h6>
                    </Col>
                    <Col xs={6} className="text-right">
                      {activeStep >= step.id ? (
                        <span className="text-success font-weight-bold">✔ Selesai</span>
                      ) : (
                        <span className="text-warning font-weight-bold">⏳ Proses</span>
                      )}
                    </Col>
                  </Row>
                </Card>
              </div>
            ))}
            <p className="text-center mt-4 text-muted">Copyright 2025. All rights reserved.</p>
          
        </Col>
      </Row>
    </>
  );
};

export default RiwayatTransaksiSurveyCalonCustomerDetailPage;
