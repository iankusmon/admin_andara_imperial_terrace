import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import SectionsForm from "./sections_form";
import MetaDataForm from "./meta_data_create_from";
import { PACKAGE } from "../../constants/article-constant";

const ArticleForm = ({ data, onChange }) => {
  const [formData, setFormData] = useState({
    title: data.title || "",
    url: data.url || "",
    hero_img_url: data.hero_img_url || "",
    active_status: data.active_status || "enabled",
    category: data.category || "",
    summary: data.summary || "",
    published_at: data.published_at || "",
    sections: data.sections || [],
    meta_data: data?.meta_data || { title: "", keyword: "", description: "" },
  });

  useEffect(() => {
    setFormData({
      title: data.title || "",
      url: data.url || "",
      hero_img_url: data.hero_img_url || "",
      active_status: data.active_status || "enabled",
      category: data.category || "",
      summary: data.summary || "",
      published_at: data.published_at || "",
      sections: data.sections || [],
      meta_data: data?.meta_data || { title: "", keyword: "", description: "" },
    });
  }, [data]);

  const handleFormChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
  
      setFormData((prevData) => ({
        ...prevData,
        hero_image: file,
        hero_image_preview: previewURL, // Menyimpan preview URL
      }));
  
      onChange({
        ...formData,
        hero_image: file,
      });
    }
  };
  
  

  return (
    <div>
      {/* Main Form */}
      <Form>
        {/* Title */}
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
          />
        </FormGroup>

        {/* URL */}
        <FormGroup>
          <Label for="url">URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => handleFormChange("url", e.target.value)}
          />
          <small className="text-muted">
            Url of Blog Post can be automatically generated using Title
          </small>
        </FormGroup>

        {/* Hero Image */}
        <FormGroup>
      <Label for="hero_image">Hero Image</Label>
      <Input type="file" id="hero_image" onChange={handleHeroImageChange} />
      {formData.hero_image_preview || formData.hero_img_url ? (
        <div style={{ marginTop: "10px" }}>
          <p style={{ fontSize: "12px", color: "#888" }}>Preview:</p>
          <img
            src={formData.hero_image_preview || formData.hero_img_url}
            alt="Hero Preview"
            style={{
              maxWidth: "150px",
              maxHeight: "100px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </div>
      ) : null}

    </FormGroup>
        {/* Published Date */}
        <FormGroup>
          <Label for="published_at">Published Date</Label>
          <Input
            type="date"
            id="published_at"
            value={formData.published_at}
            onChange={(e) => handleFormChange("published_at", e.target.value)}
          />
          <small className="text-muted">
            Specify the publication date of the article.
          </small>
        </FormGroup>

        {/* Active Status */}
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

        {/* Category */}
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
          <small className="text-muted">
            Select one category for the Blog Post.
          </small>
        </FormGroup>

        {/* Summary */}
        <FormGroup>
          <Label for="summary">Summary</Label>
          <Input
            type="textarea"
            id="summary"
            value={formData.summary}
            onChange={(e) => handleFormChange("summary", e.target.value)}
          />
          <small className="text-muted">
            Summary Blog Post will be shown in Blog Post List page.
          </small>
        </FormGroup>
      </Form>

      {/* Sections Form */}
      <SectionsForm
        sections={formData.sections}
        onChange={(sections) => handleFormChange("sections", sections)}
      />
      <MetaDataForm
        metaData={formData.meta_data}
        onChange={(metaData) => handleFormChange("meta_data", metaData)}
      />
    </div>
  );
};

export default ArticleForm;
