// DownloadButton.jsx
import React, { useEffect, useState } from 'react';

const DownloadButton = ({ userText, fontSize, fontColor }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  // Function to ensure the sm00ch font is loaded before drawing on the canvas
  const loadFontAndDownload = async () => {
    if (!userText) return;

    try {
      // Load the sm00ch font
      await document.fonts.load(`${fontSize}px sm00ch`);
      downloadPNG();
    } catch (error) {
      console.error('Font loading failed:', error);
    }
  };

  // Function to download the text as a transparent PNG
  const downloadPNG = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas size dynamically based on text
    const padding = 20;
    context.font = `${fontSize}px sm00ch`; // Use the sm00ch font
    const textMetrics = context.measureText(userText);
    canvas.width = textMetrics.width + padding * 2;
    canvas.height = fontSize + padding * 2;

    // Clear the canvas with a transparent background
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set font and color
    context.font = `${fontSize}px sm00ch`;
    context.fillStyle = fontColor;

    // Draw the text on the canvas
    context.fillText(userText, padding, fontSize + padding / 2);

    // Create a link to download the canvas content as a PNG
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'text-image.png';
    link.click();
  };

  return (
    <div className="text-center mt-4">
      {isMobile ? (
        <button className="btn btn-primary" onClick={loadFontAndDownload}>
          DOWNLOAD PNG
        </button>
      ) : (
        <a href="/sm00ch.woff" download="sm00ch.woff" className="btn btn-primary">
          DOWNLOAD FONT
        </a>
      )}
    </div>
  );
};

export default DownloadButton;
