import React from "react";
import "./main_banner_form.css";

const MainBannerFormMobile = ({ formData, onFormChange }) => {
  
  const handleInputChange = (field, value) => {
    onFormChange(field, value);
  };

  const handleFileUpload = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Replace with actual upload logic
      onFormChange("image_url", imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mbf-form-container">
      <form className="mbf-main-banner-form" onSubmit={handleSubmit}>
        {/* Upload File */}
        <div className="mbf-form-group">
          <label htmlFor="image_file">Upload Image *</label>
          <input
            type="file"
            id="image_file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
          <small>
            Upload satu gambar untuk ditampilkan di banner (format: .jpg, .png, atau
            .jpeg).
          </small>
          <div className="mbf-file-preview-container">
            {formData.image_url && (
              <div className="mbf-file-preview">
                <span>{formData.image_url}</span>
                <button
                  type="button"
                  className="mbf-remove-file-button"
                  onClick={() => onFormChange("image_url", "")}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="mbf-form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            required
          />
          <small>Judul kampanye atau promosi untuk banner.</small>
        </div>

        {/* Description */}
        <div className="mbf-form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <small>Deskripsi detail mengenai kampanye atau promosi.</small>
        </div>

        {/* Link URL */}
        <div className="mbf-form-group">
          <label htmlFor="link_url">Link URL</label>
          <input
            type="url"
            id="link_url"
            value={formData.link_url}
            onChange={(e) => handleInputChange("link_url", e.target.value)}
          />
          <small>Link tujuan ketika banner diklik.</small>
        </div>

      </form>
    </div>
  );
};

export default MainBannerFormMobile;
