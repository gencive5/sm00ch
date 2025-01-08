import React from 'react';

const DownloadButtonIOS = ({ showPlusButton }) => {
  const downloadZip = async () => {
    try {
      // Fetch the ZIP file from the server
      const response = await fetch('/sm00ch.zip');
      if (!response.ok) {
        throw new Error('Failed to fetch ZIP file.');
      }
      const blob = await response.blob();

      // Create a temporary Blob URL for the ZIP file
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'sm00ch.zip'; // Set the filename for the download
      document.body.appendChild(link);
      link.click(); // Simulate a click to start the download
      document.body.removeChild(link);

      // Revoke the Blob URL after the download
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return showPlusButton ? (
    <button className="btn-download" onClick={downloadZip}>
      DOWNLOAD ZIP
    </button>
  ) : (
    <a href="#" className="bttn btn-downloaf" onClick={downloadZip}>
      DOWNLOAD FONT
    </a>
  );
};

export default DownloadButtonIOS;
