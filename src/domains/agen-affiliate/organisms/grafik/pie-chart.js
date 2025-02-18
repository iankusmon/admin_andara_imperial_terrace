import React, { useState } from "react";
import { Card, CardBody, Container, Row, Col } from "reactstrap"; // Import komponen Argon
import { Pie } from "react-chartjs-2"; // Menggunakan Pie chart dari react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [state, setState] = useState({
    // Dummy data for three categories
    series: [
      { name: "Calon Customer Belum Direspon", value: 10 },
      { name: "Calon Customer Sudah Direspon", value: 15 },
      { name: "Survey Calon Customer", value: 5 }
    ],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}%`;
            }
          }
        }
      }
    }
  });

  // Prepare the data for the chart
  const total = state.series.reduce((sum, item) => sum + item.value, 0);
  const chartData = {
    labels: state.series.map(item => item.name),
    datasets: [{
      label: 'Percentage',
      data: state.series.map(item => ((item.value / total) * 100).toFixed(2)), // Convert to percentage
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)', // Calon Customer Belum Direspon
        'rgba(255, 99, 132, 0.6)', // Calon Customer Sudah Direspon
        'rgba(54, 162, 235, 0.6)'  // Survey Calon Customer
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)', // Calon Customer Belum Direspon
        'rgba(255, 99, 132, 1)', // Calon Customer Sudah Direspon
        'rgba(54, 162, 235, 1)'  // Survey Calon Customer
      ],
      borderWidth: 1
    }]
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md="12">
          <Card className="shadow">
            <CardBody>
              {/* Pie chart */}
              <Pie data={chartData} options={state.options} />

              {/* Displaying the color-coded legends below the chart */}
              <div className="mt-4">
                {state.series.map((item, index) => {
                  const percentage = ((item.value / total) * 100).toFixed(2);
                  const color = chartData.datasets[0].backgroundColor[index]; // Get the color for the current item
                  return (
                    <div className="d-flex align-items-center mb-2" key={index}>
                      <div
                        style={{
                          width: '15px',
                          height: '15px',
                          borderRadius: '50%',
                          backgroundColor: color, // Color circle
                          marginRight: '10px',
                        }}
                      ></div>
                      <p className="mb-0">{item.name}: {percentage}%</p>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PieChart;
