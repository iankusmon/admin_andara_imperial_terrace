import React, { useState } from "react";
import { Card, CardHeader, CardBody, Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"; // Komponen Argon
import { Bar } from "react-chartjs-2"; // Import Bar chart dari react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js"; // Chart.js
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ColumnsChart = () => {
  const [state, setState] = useState({
    series: [{
      name: 'Inflation',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }],
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Menyembunyikan legenda jika tidak diperlukan
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.raw + "%"; // Menambahkan % pada tooltip
            }
          }
        }
      },
      scales: {
        x: {
          type: 'category',
          position: 'top',
          grid: {
            display: false, // Menyembunyikan grid pada sumbu X
          },
          ticks: {
            font: {
              size: 10,
              weight: 'bold'
            }
          }
        },
        y: {
          ticks: {
            beginAtZero: true,
            callback: function(value) {
              return value + "%"; // Menambahkan % pada nilai Y-axis
            },
            font: {
              size: 10,
              weight: 'bold'
            }
          },
          grid: {
            display: false, // Menyembunyikan grid pada sumbu Y
          }
        }
      },
      barThickness: 30, // Mengatur ketebalan batang
      title: {
        text: 'Monthly Inflation in Argentina, 2002',
        display: true,
        align: 'center',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          bottom: 20
        }
      }
    }
  });

  // Data awal untuk chart (Inflasi bulanan)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2];

  // Untuk menyaring berdasarkan bulan, minggu, atau tahun
  const [selectedFilter, setSelectedFilter] = useState("bulan");
  const [filteredData, setFilteredData] = useState(data);
  const [filteredLabels, setFilteredLabels] = useState(months);

  // Fungsi untuk menangani perubahan filter (minggu, bulan, tahun)
  const handleFilterChange = (filterType) => {
    setSelectedFilter(filterType);
    if (filterType === "minggu") {
      // Filter data per minggu (asumsi data per minggu tidak tersedia, jadi kita contohkan dengan 1 data)
      const weeklyData = data.map(value => value / 4); // Pembagian kasar (misal: setiap bulan dibagi 4 minggu)
      setFilteredData(weeklyData);
      setFilteredLabels(["Week 1", "Week 2", "Week 3", "Week 4"]);
    } else if (filterType === "bulan") {
      setFilteredData(data);
      setFilteredLabels(months);
    } else if (filterType === "tahun") {
      // Filter berdasarkan tahun (misalnya rata-rata per tahun, jika ada data tahunan)
      setFilteredData([data.reduce((acc, curr) => acc + curr, 0) / 12]); // Rata-rata tahunan
      setFilteredLabels(["2022"]); // Nama tahun
    }
  };

  // Menyiapkan data untuk chart
  const chartData = {
    labels: filteredLabels,
    datasets: [{
      label: 'Inflation',
      data: filteredData,
      backgroundColor: 'rgba(75, 192, 192, 0.6)', // Warna batang chart
      borderColor: 'rgba(75, 192, 192, 1)', // Warna border batang
      borderWidth: 1
    }]
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md="12">
          <Card className="shadow">
            <CardHeader>
              <h3 className="mb-0">Monthly Inflation in Argentina, 2002</h3>
              <Dropdown isOpen={false} toggle={() => {}}>
                <DropdownToggle caret>
                  Filter by: {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleFilterChange("minggu")}>Minggu</DropdownItem>
                  <DropdownItem onClick={() => handleFilterChange("bulan")}>Bulan</DropdownItem>
                  <DropdownItem onClick={() => handleFilterChange("tahun")}>Tahun</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <CardBody>
              <Bar data={chartData} options={state.options} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ColumnsChart;
