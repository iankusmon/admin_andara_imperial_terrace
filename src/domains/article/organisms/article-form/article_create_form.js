import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import SectionsForm from "./sections_form";
import { PACKAGE } from "../../constants/article-constant";

const ArticleCreateForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    hero_img_url: null,
    active_status: "enabled", // Sesuai dengan enum di backend
    category: "", // Diubah ke string tunggal
    summary: "",
    published_at: "",
    sections: [],
  });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateFormData = () => {
    const validCategories = Object.values(PACKAGE);
    if (!validCategories.includes(formData.category)) {
      alert(`Invalid category: ${formData.category}`);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFormData()) return;

    // Debugging sebelum pengiriman
    console.log("Data yang dikirim ke backend:", formData);

    onSubmit(formData); // Kirim data ke parent component
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleFormChange("title", e.target.value)}
          placeholder="Enter title"
        />
      </FormGroup>

      <FormGroup>
        <Label for="url">URL</Label>
        <Input
          id="url"
          value={formData.url}
          onChange={(e) => handleFormChange("url", e.target.value)}
          placeholder="Enter URL"
        />
      </FormGroup>

      <FormGroup>
        <Label for="active_status">Active Status</Label>
        <Input
          type="select"
          id="active_status"
          value={formData.active_status}
          onChange={(e) => handleFormChange("active_status", e.target.value)}
        >
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="category">Category</Label>
        <Input
          type="select"
          id="category"
          value={formData.category} // STRING tunggal
          onChange={(e) => handleFormChange("category", e.target.value)} // STRING langsung
        >
          <option value="">Select Category</option>
          {Object.keys(PACKAGE).map((key) => (
            <option key={key} value={PACKAGE[key]}>
              {PACKAGE[key]}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="summary">Summary</Label>
        <Input
          type="textarea"
          id="summary"
          value={formData.summary}
          onChange={(e) => handleFormChange("summary", e.target.value)}
          placeholder="Enter summary"
        />
      </FormGroup>

      <SectionsForm
        sections={formData.sections}
        onChange={(sections) =>
          setFormData((prev) => ({ ...prev, sections }))
        }
      />

      <Button type="submit" color="primary" className="mt-3">
        Create Article
      </Button>
    </Form>
  );
};

export default ArticleCreateForm;
