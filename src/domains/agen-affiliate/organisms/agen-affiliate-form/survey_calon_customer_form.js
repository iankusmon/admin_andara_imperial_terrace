import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const statusOptions = ["Proses", "Disetujui", "Ditolak"];

const SurveyCalonCustomerDetailForm = ({ data, onChange }) => {
  const [formData, setFormData] = useState({
    nik: data?.nik || "",
    phone: data?.phone || "",
    email: data?.email || "",
    address: data?.address || "",
    paket_nup: data?.paket_nup || "",
    pekerjaan: data?.pekerjaan || "",
    due_date: data?.due_date || "",
    booking_amount: data?.booking_amount || "",
    status: data?.status || "Proses",
    ktp: data?.ktp || null,
    kk: data?.kk || null,
  });

  useEffect(() => {
    setFormData({
      nik: data?.nik || "",
      phone: data?.phone || "",
      email: data?.email || "",
      address: data?.address || "",
      paket_nup: data?.paket_nup || "",
      pekerjaan: data?.pekerjaan || "",
      due_date: data?.due_date || "",
      booking_amount: data?.booking_amount || "",
      status: data?.status || "Proses",
      ktp: data?.ktp || null,
      kk: data?.kk || null,
    });
  }, [data]);

  const handleFormChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  return (
    <div className="form-container">
      <h3>Survey Calon Customer Detail Form</h3>
      <Form>
        <div className="grid-container">
          {/* NIK */}
          <FormGroup className="grid-item">
            <Label for="nik">Nomor Induk Kependudukan (NIK)</Label>
            <Input
              id="nik"
              value={formData.nik}
              onChange={(e) => handleFormChange("nik", e.target.value)}
            />
          </FormGroup>

          {/* Nomor Telepon */}
          <FormGroup className="grid-item">
            <Label for="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleFormChange("phone", e.target.value)}
            />
          </FormGroup>

          {/* Email */}
          <FormGroup className="grid-item">
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
            />
          </FormGroup>

          {/* Alamat */}
          <FormGroup className="grid-item">
            <Label for="address">Alamat</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleFormChange("address", e.target.value)}
            />
          </FormGroup>

          {/* Paket NUP */}
          <FormGroup className="grid-item">
            <Label for="paket_nup">Paket NUP</Label>
            <Input
              id="paket_nup"
              value={formData.paket_nup}
              onChange={(e) => handleFormChange("paket_nup", e.target.value)}
            />
          </FormGroup>

          {/* Pekerjaan */}
          <FormGroup className="grid-item">
            <Label for="pekerjaan">Pekerjaan</Label>
            <Input
              id="pekerjaan"
              value={formData.pekerjaan}
              onChange={(e) => handleFormChange("pekerjaan", e.target.value)}
            />
          </FormGroup>

          {/* Tanggal Jatuh Tempo */}
          <FormGroup className="grid-item">
            <Label for="due_date">Tanggal Jatuh Tempo</Label>
            <Input
              type="date"
              id="due_date"
              value={formData.due_date}
              onChange={(e) => handleFormChange("due_date", e.target.value)}
            />
          </FormGroup>

          {/* Jumlah Booking */}
          <FormGroup className="grid-item">
            <Label for="booking_amount">Jumlah Booking</Label>
            <Input
              type="text"
              id="booking_amount"
              value={formData.booking_amount}
              onChange={(e) => handleFormChange("booking_amount", e.target.value)}
            />
          </FormGroup>

          {/* Status */}
          <FormGroup className="grid-item">
            <Label for="status">Status</Label>
            <Input
              type="select"
              id="status"
              value={formData.status}
              onChange={(e) => handleFormChange("status", e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Input>
          </FormGroup>
        </div>

        {/* Buttons */}
        <div className="button-container">
          <Button color="secondary">Update Password</Button>
          <Button color="dark">Cancel</Button>
          <Button color="warning">Save</Button>
        </div>
      </Form>
    </div>
  );
};

export default SurveyCalonCustomerDetailForm;