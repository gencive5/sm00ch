// DownloadButton.jsx
import React, { useEffect, useState } from 'react';

const DownloadButton = ({ userText, fontSize, fontColor }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  // Function to download the text as a transparent PNG
  const downloadPNG = () => {
    if (!userText) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas size dynamically based on text
    const padding = 20;
    context.font = `${fontSize}px sm00ch`; // Adjust font family if needed
    const textMetrics = context.measureText(userText);
    canvas.width = textMetrics.width + padding * 2;
    canvas.height = fontSize + padding * 2;

    // Set transparent background
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set font and color
    context.font = `${fontSize}px sm00ch`;
    context.fillStyle = fontColor;

    // Draw the text
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
