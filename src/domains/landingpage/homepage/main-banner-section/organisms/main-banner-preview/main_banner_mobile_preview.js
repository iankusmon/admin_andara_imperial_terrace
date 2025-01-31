import React from "react";

const MainBannerMobilePreview = ({ data }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        maxWidth: "480px", // Sesuaikan lebar maksimal kontainer
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
        {data?.title || "No Title"}
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
        {data?.image_url ? (
          <img
            src={data.image_url}
            alt={data?.title || "No Alt Text"}
            style={{
              width: "480px",
              height: "314px",
              objectFit: "cover",
            }}
          />
        ) : (
          <p style={{ color: "#999", marginTop: "10px" }}>No Images Available</p>
        )}
      </div>

      {/* Other Fields */}
      <div style={{ marginBottom: "10px" }}>
        <strong>Description:</strong> {data?.description || "No Description"}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>URL:</strong>{" "}
        {data?.link_url ? (
          <a href={data.link_url} target="_blank" rel="noopener noreferrer">
            {data.link_url}
          </a>
        ) : (
          "No URL"
        )}
      </div>
    </div>
  );
};

export default MainBannerMobilePreview;
