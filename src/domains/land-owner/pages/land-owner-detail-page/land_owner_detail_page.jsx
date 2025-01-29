import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button } from "reactstrap";
import PropTypes from "prop-types";
import TitlePage from "components/atoms/title-page";
import LandownerForm from "domains/land-owner/organisms/main-banner-form/land-owner_form";

const LandownerDetailPage = ({ pageUtils }) => {
  const [landownerData, setLandownerData] = useState(null);
  const history = useHistory();

  // Dummy Data
  const dummyData = {
    id: 1,
    kavling: "Athena Height AH.1",
    name: "John Doe",
    nup: "2025-01-01",
    booking: "2025-02-01",
    spkb: "2025-03-01",
    down_payment: "2025-04-01",
    pelunasan: "2025-05-01",
    ppjb: "2025-06-01",
    ajb: "2025-07-01",
  };

  useEffect(() => {
    // Simulating data fetch
    setTimeout(() => {
      setLandownerData(dummyData);
    }, 500);
  }, []);

  const handleBackToList = () => {
    history.push("/app/super_admin/landowner");
  };

  const handleFormSubmit = (updatedData) => {
    console.log("Updated Landowner Data:", updatedData);
    // Simulate saving the updated data to a backend API
    setTimeout(() => {
      setLandownerData(updatedData);
      alert("Landowner data has been updated successfully!");
    }, 500);
  };

  if (!landownerData) {
    return (
      <div>
        <TitlePage mainTitle="Landowner" subTitle="Detail" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <TitlePage mainTitle="Landowner" subTitle="Detail" />
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>
          Back to List
        </Button>
      </div>
      <Row>
        <Col md={12}>
          <Card body>
            <h5>Edit Landowner Details</h5>
            <LandownerForm
              data={landownerData}
              onSubmit={handleFormSubmit} // Pass the updated data from the form
              readOnly={false} // Set to true if you want to disable editing
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

LandownerDetailPage.propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

export default LandownerDetailPage;
