import React from 'react';
import { Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

const MetaDataForm = () => {
  const [metaData, setMetaData] = React.useState({
    title: '',
    keyword: '',
    description: '',
  });

  const handleChange = (field, value) => {
    setMetaData((prev) => ({ ...prev, [field]: value }));
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
              value={metaData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </FormGroup>

          {/* Meta Data Keyword */}
          <FormGroup>
            <Label for="meta-keyword">Meta Data Keyword</Label>
            <Input
              id="meta-keyword"
              type="textarea"
              placeholder="Enter Meta Data Keywords"
              value={metaData.keyword}
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
              value={metaData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </FormGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default MetaDataForm;
