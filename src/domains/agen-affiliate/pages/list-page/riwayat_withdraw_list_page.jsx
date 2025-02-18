import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, CardBody } from "reactstrap";
import { FaCheckCircle, FaSpinner } from "react-icons/fa"; // Ikon centang dan loading
import TitlePage from "components/atoms/title-page";

const RiwayatWithdraw = () => {
  const history = useHistory();
  const [dummyData, setDummyData] = useState([]); // Data dummy

  const [currentStep, setCurrentStep] = useState(0); // Menyimpan status langkah yang sedang dikerjakan

  const withdrawData = [
    { id: 1, description: "Withdraw I NUP", amount: "100.000", date: "1 Desember 2024" },
    { id: 2, description: "Withdraw II Booking Fee", amount: "1.000.000", date: "2 Desember 2024" },
    { id: 3, description: "Withdraw III DP 10%", amount: "5.000.000", date: "3 Desember 2024" },
    { id: 4, description: "Withdraw IV DP 20%", amount: "10.000.000", date: "4 Desember 2024" },
    { id: 5, description: "Withdraw V Pelunasan", amount: "36.700.000", date: "5 Desember 2024" },
  ];

  // useEffect untuk memuat data dummyData jika diperlukan
  useEffect(() => {
    // Simulasi pemanggilan data, bisa ganti dengan fetch atau API call
    const fetchDummyData = async () => {
      const data = withdrawData; // Menggunakan data withdraw yang sudah ada
      setDummyData(data);
    };

    fetchDummyData();
  }, []); // Menambahkan array dependensi kosong agar hanya dijalankan sekali

  // Fungsi untuk menyelesaikan satu langkah dan melanjutkan ke langkah berikutnya
  const completeStep = () => {
    if (currentStep < withdrawData.length) {
      setCurrentStep(currentStep + 1); // Pindah ke langkah berikutnya
    }
  };

  const handleBackToList = () => {
    history.push("/app/super_admin/withdraw"); // Ubah URL sesuai dengan path yang sesuai
  };

  return (
    <>
      <TitlePage mainTitle="Riwayat Withdraw" subTitle="Riwayat Withdraw" />
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>Kembali ke Daftar</Button>
      </div>
      <Row>
        <Col md={12} className="text-center">
          <div className="withdraw-content">
            {dummyData.map((item, index) => (
              <Card key={item.id} className="mb-3" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", border: "none" }}>
                <CardBody className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3>{item.description}</h3>
                    <p>{item.amount}</p>
                    <p>{item.date}</p>
                  </div>
                  {index === currentStep ? (
                    <FaSpinner size={30} color="#007bff" spin /> // Menampilkan loading untuk langkah yang aktif
                  ) : index < currentStep ? (
                    <FaCheckCircle size={30} color="#28a745" /> // Menampilkan centang jika langkah sudah selesai
                  ) : null}
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="withdraw-footer d-flex justify-content-between align-items-center">
            <div className="total-withdraw">
              <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Total Withdraw: <span style={{ fontSize: "2rem", fontWeight: "bolder" }}>Rp 52.800.000</span>
              </p>
            </div>
          </div>

          {/* Tombol untuk melanjutkan ke langkah berikutnya */}
          {currentStep < withdrawData.length && (
            <Button color="primary" onClick={completeStep}>Selesaikan Langkah</Button>
          )}
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

export default RiwayatWithdraw;
