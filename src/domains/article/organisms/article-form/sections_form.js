import React from 'react';
import { Form, FormGroup, Label, Input, Button, Row, Col, Card, CardBody } from 'reactstrap';

const SectionsForm = ({ sections = [], onChange }) => {
  
  // Fungsi untuk mengubah nilai field pada setiap section
  const handleSectionChange = (index, field, value) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    onChange(updatedSections);
  };

  // Fungsi untuk menangani perubahan pada file gambar
  const handleSectionImageChange = (index, event) => {
    const file = event.target.files[0];

    if (file) {
      const updatedSections = sections.map((section, i) =>
        i === index ? { ...section, image: file } : section
      );
      onChange(updatedSections);
    }
  };

  // Fungsi untuk menambahkan section baru
  const handleAddSection = () => {
    onChange([
      ...sections,
      { id: null, title: '', description: '', image: null }
    ]);
  };

  // Fungsi untuk menghapus section tertentu
  const handleRemoveSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    onChange(updatedSections);
  };

  return (
    <div className="mt-5">
      <h4 className="mb-3">Sections</h4>
      
      {sections.map((section, index) => (
        <Card key={index} className="mb-3 shadow-sm border-0 p-3">
          <CardBody>
            <h6 className="mb-4 font-weight-bold">Section #{index + 1}</h6>

            <Row>
              {/* Title Field */}
              <Col md={12}>
                <FormGroup>
                  <Label for={`section-title-${index}`}>Title</Label>
                  <Input
                    id={`section-title-${index}`}
                    placeholder="Enter title"
                    value={section.title || ''}
                    onChange={(e) =>
                      handleSectionChange(index, 'title', e.target.value)
                    }
                  />
                </FormGroup>
              </Col>

              {/* File Upload Field */}
              <Col md={12}>
                <FormGroup>
                  <Label for={`section-image-${index}`}>Image</Label>
                  <Input
                    type="file"
                    id={`section-image-${index}`}
                    onChange={(e) => handleSectionImageChange(index, e)}
                  />
                  {section.image && (
                    <div style={{ marginTop: '10px' }}>
                      <p style={{ fontSize: '12px', color: '#888' }}>Preview:</p>
                      <img
                        src={typeof section.image === 'string' ? section.image : URL.createObjectURL(section.image)}
                        alt={`Section ${index + 1}`}
                        style={{
                          maxWidth: '150px',
                          maxHeight: '100px',
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                        }}
                      />
                    </div>
                  )}
                </FormGroup>
              </Col>

              {/* Description Field */}
              <Col md={12}>
                <FormGroup>
                  <Label for={`section-description-${index}`}>Description</Label>
                  <Input
                    type="textarea"
                    id={`section-description-${index}`}
                    placeholder="Enter description"
                    value={section.description || ''}
                    onChange={(e) =>
                      handleSectionChange(index, 'description', e.target.value)
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            {/* Remove Section Button */}
            <Row>
              <Col md={12} className="d-flex justify-content-end">
                <Button
                  color="danger"
                  className="mt-2"
                  onClick={() => handleRemoveSection(index)}
                >
                  Remove Section
                </Button>
              </Col>
            </Row>

          </CardBody>
        </Card>
      ))}

      {/* Add Section Button */}
      <Button color="success" className="w-100" onClick={handleAddSection}>
        Add New Section
      </Button>
    </div>
  );
};

export default SectionsForm;
