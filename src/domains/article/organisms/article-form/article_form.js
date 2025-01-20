import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import SectionsForm from "./sections_form";
import { PACKAGE } from "../../constants/article-constant";

const ArticleForm = ({ data, onChange }) => {
  const [formData, setFormData] = useState({
    title: data.title || "",
    url: data.url || "",
    hero_img_url: data.hero_img_url || null,
    active_status: data.active_status || "Enabled",
    category: data.category || [],
    summary: data.summary || "",
    published_at: data.published_at || "", 
    sections: data.sections || [],
  });

  useEffect(() => {
    setFormData({
      title: data.title || "",
      url: data.url || "",
      hero_img_url: data.hero_img_url || null,
      active_status: data.active_status || "Enabled",
      category: data.category || [],
      summary: data.summary || "",
      published_at: data.published_at || "", 
      sections: data.sections || [],
    });
  }, [data]);

  const handleFormChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleSectionsChange = (sections) => {
    const updatedData = { ...formData, sections };
    setFormData(updatedData);
    onChange(updatedData);
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
          <Label for="hero_img_url">Hero Image</Label>
          <Input
            type="file"
            id="hero_img_url"
            onChange={(e) =>
              handleFormChange("hero_img_url", e.target.files[0])
            }
          />
        </FormGroup>

        {/* Published Date */}
        <FormGroup>
          <Label for="published_at">Published Date</Label>
          <Input
            type="date" // Input tipe tanggal
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
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </Input>
        </FormGroup>

        {/* Category */}
        <FormGroup>
          <Label for="category">Category</Label>
          <Input
            type="select"
            id="category"
            multiple
            value={formData.category}
            onChange={(e) =>
              handleFormChange(
                "category",
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {Object.keys(PACKAGE).map((key) => (
              <option key={key} value={PACKAGE[key]}>
                {PACKAGE[key]}
              </option>
            ))}
          </Input>
          <small className="text-muted">
            Blog Post can have more than 1 Category (Max 2)
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
            Summary Blog Post will be shown in Blog Post List page
          </small>
        </FormGroup>
      </Form>

      {/* Sections Form */}
      <SectionsForm
        sections={formData.sections}
        onChange={handleSectionsChange}
      />
    </div>
  );
};

export default ArticleForm;
