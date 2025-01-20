import React, { useEffect } from 'react';

const ArticlePreview = ({ data }) => {
  const sections = data?.sections || [];

  const getImageUrl = (image) => {
    try {
      if (typeof image === 'string') {
        return image;
      } else if (image instanceof File || image instanceof Blob) {
        return URL.createObjectURL(image);
      }
      return null;
    } catch (error) {
      console.error('Error generating image URL:', error);
      return null;
    }
  };

  // Debugging untuk memastikan data terbaru diterima
  useEffect(() => {
    console.log('Data terbaru di Preview:', data);
  }, [data]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <h2 style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        {data?.title || 'No Title'}
      </h2>

      <p style={{ color: '#555', marginBottom: '15px' }}>
        {data?.published_at || 'Published date not available'}
      </p>

      {Array.isArray(data?.category) && data.category.length > 0 ? (
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#f1f1f1',
            color: '#333',
            padding: '5px 10px',
            borderRadius: '15px',
            marginBottom: '20px',
          }}
        >
          {data.category.join(', ')}
        </div>
      ) : (
        <div style={{ color: '#999', marginBottom: '20px' }}>
          <p>No category available</p>
        </div>
      )}

      {data?.hero_img_url ? (
        <div style={{ marginBottom: '20px' }}>
          <img
            src={getImageUrl(data.hero_img_url)}
            alt="Hero"
            style={{ width: '100%', borderRadius: '5px' }}
          />
        </div>
      ) : (
        <div style={{ marginBottom: '20px', textAlign: 'center', color: '#999' }}>
          <p>No Hero Image Available</p>
        </div>
      )}

      <p style={{ marginBottom: '20px' }}>
        {data?.summary || 'No content available.'}
      </p>

      {sections.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Sections</h3>
          {sections.map((section, index) => (
            <div
              key={index}
              style={{
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <h4 style={{ fontWeight: 'bold' }}>
                {section.title || `Section ${index + 1}`}
              </h4>

              {section.file && (
                <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <img
                    src={getImageUrl(section.file)}
                    alt={`Section ${index + 1} Image`}
                    style={{ width: '100%', borderRadius: '5px' }}
                  />
                </div>
              )}

              <p>{section.description || 'No description available.'}</p>

              {section.productCollection && (
                <p style={{ color: '#888', fontStyle: 'italic' }}>
                  Product Collection: {section.productCollection}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlePreview;
