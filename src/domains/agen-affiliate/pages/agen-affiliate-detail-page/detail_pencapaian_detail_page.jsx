import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, CardBody } from "reactstrap";
import { FaCheckCircle } from "react-icons/fa"; // Pastikan mengimpor dengan benar
import TitlePage from "components/atoms/title-page";

const DetailPencapaianReward = () => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(1);
  const [dummyData, setDummyData] = useState([]); // Dummy data jika diperlukan

  const hadiah = [
    { id: 1, title: "1 Unit Villa", price: "Rp 3.150.000.000", date: "1 Desember 2024" },
    { id: 2, title: "1 Unit Villa", price: "Rp 3.150.000.000", date: "2 Desember 2024" },
    { id: 3, title: "1 Unit Villa", price: "Rp 3.150.000.000", date: "3 Desember 2024" },
    { id: 4, title: "1 Unit Villa", price: "Rp 3.150.000.000", date: "4 Desember 2024" },
    { id: 5, title: "1 Unit Villa", price: "Rp 3.150.000.000", date: "5 Desember 2024" },
  ];

  // useEffect untuk memuat data dummyData jika diperlukan
  useEffect(() => {
    // Simulasi pemanggilan data, bisa ganti dengan fetch atau API call
    const fetchDummyData = async () => {
      const data = [
        // Gantikan dengan data asli
        { id: 1, title: "Reward 1" },
        { id: 2, title: "Reward 2" },
      ];
      setDummyData(data);
    };

    fetchDummyData();
  }, []); // Menambahkan array dependensi kosong agar hanya dijalankan sekali

  const handleBackToList = () => {
    history.push("/app/super_admin/reward");
  };

  return (
    <>
      <TitlePage mainTitle="Detail Pencapaian Reward" subTitle="Riwayat Reward" />
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>Kembali ke Daftar</Button>
      </div>
      <Row>
        <Col md={12} className="text-center">
          <div className="hadiah-header">
            <Card className="mb-3" style={{ backgroundColor: "#FAE1DD", border: "none" }}>
              <CardBody>
                <h2 className="text-center">Piala Diamond (Peringkat 1)</h2>
                <p className="text-center">Paket itxaran berdus se Ernpa senta Rp 180.000.000</p>
              </CardBody>
            </Card>
          </div>
          <div className="hadiah-content">
            {hadiah.map((item) => (
              <Card key={item.id} className="mb-3">
                <CardBody className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                    <p>{item.date}</p>
                  </div>
                  <FaCheckCircle size={30} color="#28a745" /> {/* Ikon centang */}
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="hadiah-footer d-flex justify-content-between align-items-center">
            <div className="total-reward">
              <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Total Reward: <span style={{ fontSize: "2rem", fontWeight: "bolder" }}>Rp 10.000.000</span>
              </p>
            </div>
          </div>
        </Col>
      </Row>
      
      {/* Footer yang berada di bagian bawah halaman */}
      <div className="footer-text d-flex justify-content-between" style={{ marginTop: "50px" }}>
        <p className="text-left">Andara Imperial Taraccos</p>
        <p className="text-right">Copyright &copy; 2025. All Rights Reserved.</p>
      </div>
    </>
  );
};

export default DetailPencapaianReward;
