import React from "react";

const MainBannerPreview = ({ data }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        {data?.name || "No Name"}
      </h2>

      {/* Single Image Display */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        {data?.image_urls && data.image_urls.length > 0 ? (
          <img
            src={data.image_urls[0]} // Only show the first image
            alt={data?.alt_text || "No Alt Text"}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
        ) : (
          <p style={{ color: "#999", marginTop: "10px" }}>No Images Available</p>
        )}
      </div>

      {/* Other Fields */}
      <div style={{ marginBottom: "10px" }}>
        <strong>Alt Text:</strong> {data?.alt_text || "No Alt Text"}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Title:</strong> {data?.title_text || "No Title"}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Caption:</strong> {data?.caption_text || "No Caption"}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>URL:</strong>{" "}
        {data?.url ? (
          <a href={data.url} target="_blank" rel="noopener noreferrer">
            {data.url}
          </a>
        ) : (
          "No URL"
        )}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Platform:</strong> {data?.platform || "No Platform"}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Header Text:</strong> {data?.header_text || "No Header Text"}
      </div>
    </div>
  );
};

export default MainBannerPreview;
