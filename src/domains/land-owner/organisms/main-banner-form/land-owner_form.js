import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const kavlingOptions = [
  "Athena Height AH.1",
  "Athena Height AH.2",
  "Athena Height AH.3",
  "Zeus Residence ZR.1",
  "Zeus Residence ZR.2",
];

const LandOwnerForm = ({ data, onChange }) => {
  const [formData, setFormData] = useState({
    kavling: data?.kavling || "Athena Height AH.1",
    name: data?.name || "",
    nup: data?.nup || "",
    booking: data?.booking || "",
    spkb: data?.spkb || "",
    down_payment: data?.down_payment || "",
    pelunasan: data?.pelunasan || "",
    ppjb: data?.ppjb || "",
    ajb: data?.ajb || "",
  });

  useEffect(() => {
    setFormData({
      kavling: data?.kavling || "Athena Height AH.1",
      name: data?.name || "",
      nup: data?.nup || "",
      booking: data?.booking || "",
      spkb: data?.spkb || "",
      down_payment: data?.down_payment || "",
      pelunasan: data?.pelunasan || "",
      ppjb: data?.ppjb || "",
      ajb: data?.ajb || "",
    });
  }, [data]);

  const handleFormChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  return (
    <div className="form-container">
      <h3>Detail</h3>
      <Form>
        <div className="grid-container">
          {/* Kavling */}
          <FormGroup className="grid-item">
            <Label for="kavling">Daftar Kavling</Label>
            <Input
              type="select"
              id="kavling"
              value={formData.kavling}
              onChange={(e) => handleFormChange("kavling", e.target.value)}
            >
              {kavlingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Input>
          </FormGroup>

          {/* Name */}
          <FormGroup className="grid-item">
            <Label for="name">Nama</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
            />
          </FormGroup>

          {/* NUP */}
          <FormGroup className="grid-item">
            <Label for="nup">NUP</Label>
            <Input
              type="date"
              id="nup"
              value={formData.nup}
              onChange={(e) => handleFormChange("nup", e.target.value)}
            />
          </FormGroup>

          {/* Booking */}
          <FormGroup className="grid-item">
            <Label for="booking">Booking</Label>
            <Input
              type="date"
              id="booking"
              value={formData.booking}
              onChange={(e) => handleFormChange("booking", e.target.value)}
            />
          </FormGroup>

          {/* SPKB */}
          <FormGroup className="grid-item">
            <Label for="spkb">SPKB</Label>
            <Input
              type="date"
              id="spkb"
              value={formData.spkb}
              onChange={(e) => handleFormChange("spkb", e.target.value)}
            />
          </FormGroup>

          {/* Down Payment */}
          <FormGroup className="grid-item">
            <Label for="down_payment">Down Payment</Label>
            <Input
              type="date"
              id="down_payment"
              value={formData.down_payment}
              onChange={(e) => handleFormChange("down_payment", e.target.value)}
            />
          </FormGroup>

          {/* Pelunasan */}
          <FormGroup className="grid-item">
            <Label for="pelunasan">Pelunasan</Label>
            <Input
              type="date"
              id="pelunasan"
              value={formData.pelunasan}
              onChange={(e) => handleFormChange("pelunasan", e.target.value)}
            />
          </FormGroup>

          {/* PPJB */}
          <FormGroup className="grid-item">
            <Label for="ppjb">PPJB</Label>
            <Input
              type="date"
              id="ppjb"
              value={formData.ppjb}
              onChange={(e) => handleFormChange("ppjb", e.target.value)}
            />
          </FormGroup>

          {/* AJB */}
          <FormGroup className="grid-item">
            <Label for="ajb">AJB</Label>
            <Input
              type="date"
              id="ajb"
              value={formData.ajb}
              onChange={(e) => handleFormChange("ajb", e.target.value)}
            />
          </FormGroup>
        </div>

        {/* Buttons */}
        <div className="button-container">
          <Button color="secondary">Update Password</Button>
          <Button color="dark">Cancel</Button>
          <Button color="warning">Save</Button>
        </div>
      </Form>

      {/* CSS Styling */}
      <style jsx>{`
        .form-container {
          background: white;
          padding: 20px;
          border-radius: 10px;
        }
        .grid-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .grid-item {
          display: flex;
          flex-direction: column;
        }
        .button-container {
          margin-top: 20px;
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        h3 {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default LandOwnerForm;
