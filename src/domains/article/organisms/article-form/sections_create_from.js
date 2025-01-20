import React from "react";
import { FormGroup, Label, Input, Button, Row, Col, Card, CardBody } from "reactstrap";

const SectionsCreateForm = ({ sections = [], onChange }) => {
  // Fungsi untuk menangani perubahan di setiap field section
  const handleSectionChange = (index, field, value) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    onChange(updatedSections);
  };

  // Tambahkan section baru
  const handleAddSection = () => {
    onChange([
      ...sections,
      { title: "", file: null, description: "", productCollection: "" },
    ]);
  };

  // Hapus section berdasarkan indeks
  const handleRemoveSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    onChange(updatedSections);
  };

  return (
    <div className="mt-5">
      <h4 className="mb-3">Create Sections</h4>
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
                    value={section.title || ""}
                    onChange={(e) =>
                      handleSectionChange(index, "title", e.target.value)
                    }
                  />
                </FormGroup>
              </Col>

              {/* File Upload Field */}
              <Col md={12}>
                <FormGroup>
                  <Label for={`section-file-${index}`}>File</Label>
                  <Input
                    type="file"
                    id={`section-file-${index}`}
                    onChange={(e) =>
                      handleSectionChange(index, "file", e.target.files[0])
                    }
                  />
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
                    value={section.description || ""}
                    onChange={(e) =>
                      handleSectionChange(index, "description", e.target.value)
                    }
                  />
                </FormGroup>
              </Col>

              {/* Product Collection Field */}
              <Col md={12}>
                <FormGroup>
                  <Label for={`section-product-${index}`}>
                    Product Collection
                  </Label>
                  <Input
                    type="text"
                    id={`section-product-${index}`}
                    placeholder="Enter product collection"
                    value={section.productCollection || ""}
                    onChange={(e) =>
                      handleSectionChange(index, "productCollection", e.target.value)
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

export default SectionsCreateForm;
