import React from "react";

const LandmarkBannerPreview = ({ data }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {data?.name || "No Name"}
      </h2>

      {/* Images in Card Format */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {/* Check if image_preview or image_urls exists */}
        {data?.image_preview || (data?.image_urls && data.image_urls.length > 0) ? (
          <>
            {/* If image_preview is available, show it */}
            {data?.image_preview && (
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={data.image_preview}
                  alt={data?.alt_text || "Uploaded Image"}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "10px" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      textAlign: "center",
                      margin: "0",
                    }}
                  >
                    {data?.alt_text || "Uploaded Image"}
                  </p>
                </div>
              </div>
            )}

            {/* If image_urls exists, show those images */}
            {data?.image_urls &&
              data.image_urls.slice(0, 6).map((url, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src={url}
                    alt={data?.alt_text || `Image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "10px" }}>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#333",
                        textAlign: "center",
                        margin: "0",
                      }}
                    >
                      {data?.alt_text || `Image ${index + 1}`}
                    </p>
                  </div>
                </div>
              ))}
          </>
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

export default LandmarkBannerPreview;
