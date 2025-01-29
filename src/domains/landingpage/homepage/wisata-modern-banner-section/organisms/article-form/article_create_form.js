import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import SectionsCreateForm from "./sections_create_from";
import MetaDataCreateForm from "./meta_data_create_from";
import { PACKAGE } from "../../constants/article-constant";

const ArticleCreateForm = ({ onChange, data }) => {
  const [formData, setFormData] = useState({
    title: data?.title || "",
    url: data?.url || "",
    hero_img_url: data?.hero_img_url || "",
    active_status: data?.active_status || "enabled",
    category: data?.category || "",
    summary: data?.summary || "",
    published_at: data?.published_at || "",
    sections: data?.sections || [],
    meta_data: data?.meta_data || { title: "", keyword: "", description: "" },
  });

  const handleFormChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  return (
    <Form>
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
        <Label for="hero_img_url">Hero Image URL</Label>
        <Input
          id="hero_img_url"
          value={formData.hero_img_url}
          onChange={(e) => handleFormChange("hero_img_url", e.target.value)}
          placeholder="Enter Hero Image URL"
        />
        {formData.hero_img_url && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={formData.hero_img_url}
              alt="Hero Preview"
              style={{ maxWidth: "150px", border: "1px solid #ddd" }}
            />
          </div>
        )}
      </FormGroup>

      <FormGroup>
        <Label for="active_status">Active Status</Label>
        <Input
          type="select"
          id="active_status"
          value={formData.active_status}
          onChange={(e) => handleFormChange("active_status", e.target.value)}
        >
          <option value="enabled">enabled</option>
          <option value="disabled">disabled</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="category">Category</Label>
        <Input
          type="select"
          id="category"
          value={formData.category}
          onChange={(e) => handleFormChange("category", e.target.value)}
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
        <Label for="published_at">Published Date</Label>
        <Input
          type="date"
          id="published_at"
          value={formData.published_at}
          onChange={(e) => handleFormChange("published_at", e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="summary">Summary</Label>
        <Input
          type="textarea"
          id="summary"
          value={formData.summary}
          onChange={(e) => handleFormChange("summary", e.target.value)}
        />
      </FormGroup>

      <SectionsCreateForm
        sections={formData.sections}
        onChange={(sections) => handleFormChange("sections", sections)}
      />

      <MetaDataCreateForm
        metaData={formData.meta_data}
        onChange={(metaData) => handleFormChange("meta_data", metaData)}
      />
    </Form>
  );
};

export default ArticleCreateForm;
