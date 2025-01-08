import React from 'react';

const DownloadButtonIOS = ({ userText, fontSize, fontColor, showPlusButton }) => {
  const downloadZip = async () => {
    try {
      // Fetch the ZIP file from the server
      const response = await fetch('/sm00ch.zip', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch ZIP file');
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a Blob URL for the ZIP file
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'sm00ch.zip'; // The name of the downloaded file
      document.body.appendChild(link);
      link.click(); // Simulate a click on the link to start the download
      document.body.removeChild(link); // Clean up

      // Revoke the Blob URL after the download to release memory
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error during ZIP download:', error);
    }
  };

  const loadFontAndDownload = async () => {
    if (!userText) return;

    try {
      await document.fonts.load(`${fontSize}px sm00ch`);
      generatePNG();
    } catch (error) {
      console.error('Font loading failed:', error);
    }
  };

  const generatePNG = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const padding = 80 * dpr; // Padding around the text
    const scaleFactor = 2; // Scale for better resolution

    context.font = `${fontSize * dpr * scaleFactor}px sm00ch`;
    const textMetrics = context.measureText(userText);

    const textWidth = textMetrics.width;
    const textHeight = fontSize * dpr * scaleFactor;
    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    // Clear and draw the text
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize * dpr * scaleFactor}px sm00ch`;
    context.fillStyle = fontColor;
    context.textBaseline = 'middle';
    context.fillText(userText, padding, canvas.height / 2);

    // Convert to blob and navigate to BlobPage
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Blob generation failed');
        return;
      }
      const blobUrl = URL.createObjectURL(blob);
      // Navigate to blob page or handle further
    }, 'image/png');
  };

  return showPlusButton ? (
    <button className="btn-download" onClick={loadFontAndDownload}>
      DOWNLOAD PNG
    </button>
  ) : (
    <button className="bttn btn-downloaf" onClick={downloadZip}>
      DOWNLOAD FONT
    </button>
  );
};

export default DownloadButtonIOS;
