import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BlobPageIOS = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blobUrl } = location.state || {};

  if (!blobUrl) {
    return <p>Image not found. Please generate again.</p>;
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'sm00ch.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Your PNG is Ready!</h1>
      <img
        src={blobUrl}
        alt="Generated PNG"
        style={{ maxWidth: '100%', height: 'auto', margin: '20px 0' }}
      />
      <button className="btn-download" onClick={handleDownload}>
        DOWNLOAD PNG
      </button>
      <button className="bttn btn-back" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default BlobPageIOS;
