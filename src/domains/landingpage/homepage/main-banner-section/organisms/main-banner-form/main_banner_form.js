import React, { useState } from "react";
import "./main_banner_form.css";

const MainBannerForm = ({ onSubmit, data }) => {
  const [formData, setFormData] = useState({
    image_file: null,
    alt_text: data?.alt_text || "",
    name: data?.name || "",
    location: data?.location || "Banner",
    platform: data?.platform || "web",
    title_text: data?.title_text || "",
    caption_text: data?.caption_text || "",
    header_text: data?.header_text || "",
    button_text: data?.button_text || "",
    url: data?.url || "",
    seo_title: data?.seo_title || "",
    order: data?.order || 1,
    is_active: data?.is_active ?? "YES",
    subtitle_text: data?.subtitle_text || "",
    background_color: data?.background_color || "#ffffff",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUpload = (file) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image_file: file, // Simpan file tunggal
      }));
    }
  };

  const handleRemoveFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      image_files: prev.image_files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mbf-form-container">
      <form className="mbf-main-banner-form" onSubmit={handleSubmit}>
        {/* Upload Files */}
        <div className="mbf-form-group">
          <label htmlFor="image_file">Upload Image *</label>
          <input
            type="file"
            id="image_file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files[0])} // Ambil file pertama saja
          />
          <small>
            Upload satu gambar untuk ditampilkan di banner (format: .jpg, .png, atau
            .jpeg).
          </small>
          <div className="mbf-file-preview-container">
            {formData.image_file && (
              <div className="mbf-file-preview">
                <span>{formData.image_file.name}</span>
                <button
                  type="button"
                  className="mbf-remove-file-button"
                  onClick={() => setFormData((prev) => ({ ...prev, image_file: null }))}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Alt Text */}
        <div className="mbf-form-group">
          <label htmlFor="alt_text">Alt Text</label>
          <input
            type="text"
            id="alt_text"
            value={formData.alt_text}
            onChange={(e) => handleInputChange("alt_text", e.target.value)}
            placeholder="Masukkan deskripsi alternatif untuk gambar"
          />
          <small>
            Deskripsi gambar untuk SEO atau jika gambar tidak bisa dimuat.
          </small>
        </div>

        {/* Name, Location, Order, Is Active */}
        <div className="mbf-form-row">
          <div className="mbf-form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
            <small>
              Nama untuk mendeskripsikan banner. Contoh: "Promo Tahun Baru".
            </small>
          </div>
          <div className="mbf-form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
            <small>
              Posisi penempatan banner, seperti "Homepage" atau "Banner".
            </small>
          </div>
          <div className="mbf-form-group">
            <label htmlFor="order">Order *</label>
            <input
              type="number"
              id="order"
              value={formData.order}
              onChange={(e) => handleInputChange("order", e.target.value)}
              required
            />
            <small>
              Urutan tampil di halaman (angka lebih kecil ditampilkan lebih
              dahulu).
            </small>
          </div>
          <div className="mbf-form-group">
            <label htmlFor="is_active">Is Active? *</label>
            <select
              id="is_active"
              value={formData.is_active}
              onChange={(e) => handleInputChange("is_active", e.target.value)}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
            <small>Tentukan apakah banner aktif atau tidak.</small>
          </div>
        </div>

        {/* Platform */}
        <div className="mbf-form-group">
          <label htmlFor="platform">Platform *</label>
          <select
            id="platform"
            value={formData.platform}
            onChange={(e) => handleInputChange("platform", e.target.value)}
          >
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
          </select>
          <small>
            Pilih platform di mana banner akan ditampilkan (Web atau Mobile).
          </small>
        </div>

        {/* Title Text */}
        <div className="mbf-form-group">
          <label htmlFor="title_text">Campaign Name (Title Text) *</label>
          <input
            type="text"
            id="title_text"
            value={formData.title_text}
            onChange={(e) => handleInputChange("title_text", e.target.value)}
            required
          />
          <small>Judul kampanye atau promosi untuk banner.</small>
        </div>

        {/* Caption Text */}
        <div className="mbf-form-group">
          <label htmlFor="caption_text">Campaign Description (Caption Text) *</label>
          <textarea
            id="caption_text"
            value={formData.caption_text}
            onChange={(e) => handleInputChange("caption_text", e.target.value)}
            required
          />
          <small>Deskripsi detail mengenai kampanye atau promosi.</small>
        </div>

        {/* Header Text */}
        <div className="mbf-form-group">
          <label htmlFor="header_text">Header Text</label>
          <input
            type="text"
            id="header_text"
            value={formData.header_text}
            onChange={(e) => handleInputChange("header_text", e.target.value)}
          />
          <small>Teks utama yang akan ditampilkan sebagai header di banner.</small>
        </div>

        {/* Subtitle Text */}
        <div className="mbf-form-group">
          <label htmlFor="subtitle_text">Subtitle Text</label>
          <input
            type="text"
            id="subtitle_text"
            value={formData.subtitle_text}
            onChange={(e) => handleInputChange("subtitle_text", e.target.value)}
          />
          <small>
            Subjudul untuk memberikan informasi tambahan pada header.
          </small>
        </div>

        {/* Background Color */}
        <div className="mbf-form-group">
          <label htmlFor="background_color">Background Color</label>
          <input
            type="color"
            id="background_color"
            value={formData.background_color}
            onChange={(e) => handleInputChange("background_color", e.target.value)}
          />
          <small>Warna latar belakang untuk banner.</small>
        </div>

        {/* Button Text */}
        <div className="mbf-form-group">
          <label htmlFor="button_text">Button Text</label>
          <input
            type="text"
            id="button_text"
            value={formData.button_text}
            onChange={(e) => handleInputChange("button_text", e.target.value)}
          />
          <small>Teks pada tombol CTA (Call to Action) di banner.</small>
        </div>

        {/* URL */}
        <div className="mbf-form-group">
          <label htmlFor="url">URL</label>
          <input
            type="url"
            id="url"
            value={formData.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
          />
          <small>Link tujuan ketika banner atau tombol diklik.</small>
        </div>

        {/* SEO Title */}
        <div className="mbf-form-group">
          <label htmlFor="seo_title">SEO Title</label>
          <input
            type="text"
            id="seo_title"
            value={formData.seo_title}
            onChange={(e) => handleInputChange("seo_title", e.target.value)}
          />
          <small>Judul SEO untuk optimasi pencarian.</small>
        </div>

        {/* Submit */}
        {/* <div className="mbf-form-actions">
          <button type="submit" className="mbf-btn-primary">
            Update
          </button>
        </div> */}

        {/* Additional Information */}
        <div className="mbf-form-info">
          <p>
            <strong>Note:</strong> Pastikan semua informasi diisi dengan benar
            sebelum mengirimkan formulir.
          </p>
        </div>
      </form>
    </div>
  );
};

export default MainBannerForm;
