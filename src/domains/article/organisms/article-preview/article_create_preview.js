import React, { useEffect } from "react";

const ArticleCreatePreview = ({ data }) => {
  const sections = data?.sections || [];

  const getImageUrl = (image) => {
    if (typeof image === "string") {
      return image;
    } else if (image instanceof File || image instanceof Blob) {
      return URL.createObjectURL(image); // Temporary URL
    }
    return null;
  };

  useEffect(() => {
    console.log("Data terbaru di Preview:", data);
  }, [data]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#333",
          textTransform: "capitalize",
        }}
      >
        {data?.title || "No Title"}
      </h2>

      {/* Published Date */}
      <p
        style={{
          color: "#666",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        {data?.published_at
          ? `Published on: ${new Date(data.published_at).toLocaleDateString()}`
          : "Published date not available"}
      </p>

      {/* Category */}
      {data?.category ? (
      <div
        style={{
          display: "inline-block",
          backgroundColor: "#e3f2fd",
          color: "#007bff",
          padding: "5px 15px",
          borderRadius: "15px",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        {data.category}
      </div>
    ) : (
      <p style={{ color: "#999", marginBottom: "20px" }}>
        No category available
      </p>
    )}


      {/* Hero Image */}
      {data?.hero_img_url ? (
        <div
          style={{
            marginBottom: "20px",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #ddd",
          }}
        >
          <img
            src={getImageUrl(data.hero_img_url)}
            alt="Hero"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed #ddd",
            borderRadius: "8px",
            color: "#999",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          No Hero Image Available
        </div>
      )}

      {/* Summary */}
      <p
        style={{
          fontSize: "16px",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        {data?.summary || "No content available."}
      </p>

      {/* Sections */}
      {sections.length > 0 && (
        <div>
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              color: "#007bff",
              marginBottom: "15px",
            }}
          >
            Sections
          </h3>
          {sections.map((section, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h4
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                {section.title || `Section ${index + 1}`}
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#555",
                }}
              >
                {section.description || "No description available."}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Meta Data Preview */}
{data?.meta_data && (
  <div
    style={{
      marginTop: "30px",
      padding: "15px",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h3
      style={{
        fontWeight: "bold",
        fontSize: "18px",
        color: "#007bff",
        marginBottom: "15px",
      }}
    >
      Meta Data
    </h3>
    <p style={{ fontWeight: "bold", color: "#333" }}>Title:</p>
    <p style={{ color: "#555", marginBottom: "10px" }}>
      {data.meta_data.title || "No meta title available"}
    </p>
    <p style={{ fontWeight: "bold", color: "#333" }}>Keywords:</p>
    <p style={{ color: "#555", marginBottom: "10px" }}>
      {data.meta_data.keyword || "No meta keywords available"}
    </p>
    <p style={{ fontWeight: "bold", color: "#333" }}>Description:</p>
    <p style={{ color: "#555" }}>
      {data.meta_data.description || "No meta description available"}
    </p>
  </div>
)}

    </div>
  );
};

export default ArticleCreatePreview;
