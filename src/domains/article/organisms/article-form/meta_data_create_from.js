import React from "react";
import { FormGroup, Label, Input, Card, CardBody } from "reactstrap";

const MetaDataCreateForm = ({ metaData = {}, onChange }) => {
  const handleMetaChange = (field, value) => {
    const updatedMeta = { ...metaData, [field]: value };
    if (onChange) onChange(updatedMeta); // Periksa apakah onChange tersedia sebelum memanggilnya
  };

  return (
    <div className="mt-5">
      <h4 className="mb-3">Meta Data</h4>
      <p>Metadata of Blog Post fields are optional, it will be used for SEO purpose</p>
      <Card className="shadow-sm border-0">
        <CardBody>
          {/* Meta Data Title */}
          <FormGroup>
            <Label for="meta-title">Meta Data Title</Label>
            <Input
              id="meta-title"
              placeholder="Enter Meta Data Title"
              value={metaData.title || ""} // Gunakan nilai default kosong jika undefined
              onChange={(e) => handleMetaChange("title", e.target.value)}
            />
          </FormGroup>

          {/* Meta Data Keyword */}
          <FormGroup>
            <Label for="meta-keyword">Meta Data Keyword</Label>
            <Input
              id="meta-keyword"
              type="textarea"
              placeholder="Enter Meta Data Keywords"
              value={metaData.keyword || ""} // Gunakan nilai default kosong jika undefined
              onChange={(e) => handleMetaChange("keyword", e.target.value)}
            />
          </FormGroup>

          {/* Meta Data Description */}
          <FormGroup>
            <Label for="meta-description">Meta Data Description</Label>
            <Input
              id="meta-description"
              type="textarea"
              placeholder="Enter Meta Data Description"
              value={metaData.description || ""} // Gunakan nilai default kosong jika undefined
              onChange={(e) => handleMetaChange("description", e.target.value)}
            />
          </FormGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default MetaDataCreateForm;
