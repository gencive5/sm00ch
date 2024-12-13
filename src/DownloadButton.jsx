// DownloadButton.jsx
import React, { useEffect, useState } from 'react';

const DownloadButton = ({ userText, fontSize, fontColor }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  // Function to download the text as a transparent PNG
  const downloadPNG = async () => {
    if (!userText) return;

    try {
      // Ensure the sm00ch font is loaded before rendering
      await document.fonts.load(`${fontSize}px sm00ch`);

      // Create the canvas and context
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Set padding for spacing around the text
      const padding = 20;

      // Set the font for measuring text dimensions
      context.font = `${fontSize}px sm00ch`;
      const textMetrics = context.measureText(userText);

      // Set canvas dimensions dynamically based on text size and padding
      canvas.width = textMetrics.width + padding * 2;
      canvas.height = fontSize + padding * 2;

      // Clear the canvas with transparent background
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Set the font and text color for drawing
      context.font = `${fontSize}px sm00ch`;
      context.fillStyle = fontColor;

      // Draw the text with padding
      context.fillText(userText, padding, fontSize + padding / 2);

      // Convert the canvas to a PNG URL with transparency
      const imageURL = canvas.toDataURL('image/png');

      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = 'text-image.png';
      link.style.display = 'none'; // Hide the link

      // Append the link to the body, trigger the download, then remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Failed to download PNG. Please try again.');
    }
  };

  return (
    <div className="text-center mt-4">
      {isMobile ? (
        <button className="btn btn-primary" onClick={downloadPNG}>
          DOWNLOAD PNG
        </button>
      ) : (
        <a href="/sm00ch-font.woff" download="sm00ch-font.woff" className="btn btn-primary">
          DOWNLOAD FONT
        </a>
      )}
    </div>
  );
};

export default DownloadButton;
