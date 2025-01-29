import React, { useEffect } from "react";

const ArticlePreview = ({ data }) => {
  const sections = data?.sections || [];

  const getImageUrl = (image) => {
    try {
      if (!image) return null;
  
      // Jika gambar dari backend berupa URL string
      if (typeof image === "string" && image.startsWith("http")) {
        return image;
      }
  
      // Jika gambar adalah file yang baru diunggah
      if (image instanceof File || image instanceof Blob) {
        return URL.createObjectURL(image);
      }
  
      return null;
    } catch (error) {
      console.error("Error generating image URL:", error);
      return null;
    }
  };
  

  const formatDate = (dateString) => {
    try {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", options);
    } catch {
      return "Invalid date";
    }
  };

  // Debugging untuk memastikan data terbaru diterima
  useEffect(() => {
    console.log("Data terbaru di Preview:", data);
  }, [data]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>
        {data?.title || "No Title"}
      </h2>

      <p style={{ color: "#555", marginBottom: "15px" }}>
        {data?.published_at
          ? formatDate(data.published_at)
          : "Published date not available"}
      </p>

      {data?.category ? (
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#f1f1f1",
            color: "#333",
            padding: "5px 10px",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        >
          {data.category}
        </div>
      ) : (
        <div style={{ color: "#999", marginBottom: "20px" }}>
          <p>No category available</p>
        </div>
      )}

        {data?.hero_img_url || data?.hero_image ? (
          <div style={{ marginBottom: "20px" }}>
            <img
              src={getImageUrl(data.hero_image || data.hero_img_url)}
              alt="Hero"
              style={{ width: "100%", borderRadius: "5px" }}
            />
          </div>
        ) : (
          <div style={{ marginBottom: "20px", textAlign: "center", color: "#999" }}>
            <p>No Hero Image Available</p>
          </div>
        )}


      <p style={{ marginBottom: "20px" }}>
        {data?.summary || "No content available."}
      </p>

      {sections.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "15px" }}>Sections</h3>
          {sections.map((section, index) => (
            <div
              key={index}
              style={{
                marginBottom: "30px",
                paddingBottom: "20px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>
                {section.title || `Section ${index + 1}`}
              </h4>

              {section.file && (
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <img
                    src={getImageUrl(section.file)}
                    alt={`Section ${index + 1} Image`}
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                </div>
              )}

              <p>{section.description || "No description available."}</p>

              {section.productCollection && (
                <p style={{ color: "#888", fontStyle: "italic" }}>
                  Product Collection: {section.productCollection}
                </p>
              )}
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

export default ArticlePreview;
