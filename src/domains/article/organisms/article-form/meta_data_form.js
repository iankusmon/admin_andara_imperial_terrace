import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

const MetaDataForm = ({ metaData, onChange }) => {
  const [localMetaData, setLocalMetaData] = useState({
    title: '',
    keyword: '',
    description: '',
  });

  // Perbarui state lokal jika ada perubahan dari props
  useEffect(() => {
    setLocalMetaData(metaData);
  }, [metaData]);

  const handleChange = (field, value) => {
    const updatedMeta = { ...localMetaData, [field]: value };
    setLocalMetaData(updatedMeta);
    onChange(updatedMeta); // Mengirim data ke parent component
  };

  return (
    <div className="mt-5">
      <h4 className="mb-3">Meta Data</h4>
      <p>Metadata of Blog Post fields are optional, it will be used for SEO purposes.</p>
      <Card className="shadow-sm border-0">
        <CardBody>
          {/* Meta Data Title */}
          <FormGroup>
            <Label for="meta-title">Meta Data Title</Label>
            <Input
              id="meta-title"
              placeholder="Enter Meta Data Title"
              value={localMetaData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </FormGroup>

          {/* Meta Data Keyword */}
          <FormGroup>
            <Label for="meta-keyword">Meta Data Keywords</Label>
            <Input
              id="meta-keyword"
              type="textarea"
              placeholder="Enter Meta Data Keywords"
              value={localMetaData.keyword}
              onChange={(e) => handleChange('keyword', e.target.value)}
            />
          </FormGroup>

          {/* Meta Data Description */}
          <FormGroup>
            <Label for="meta-description">Meta Data Description</Label>
            <Input
              id="meta-description"
              type="textarea"
              placeholder="Enter Meta Data Description"
              value={localMetaData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </FormGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default MetaDataForm;
