import React, { useState, useEffect } from 'react';

const DownloadButton = ({ userText, fontSize, fontColor }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  const loadFontAndDownload = async () => {
    if (!userText) return;

    try {
      // Load the sm00ch font before rendering
      await document.fonts.load(`${fontSize}px sm00ch`);
      downloadPNG();
    } catch (error) {
      console.error('Font loading failed:', error);
    }
  };

  const downloadPNG = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Device Pixel Ratio (for higher quality on high-res screens)
    const dpr = window.devicePixelRatio || 1;

    // Set padding for the canvas
    const padding = 20 * dpr;
    context.font = `${fontSize * dpr}px sm00ch`;
    const textMetrics = context.measureText(userText);

    // Calculate canvas dimensions dynamically
    const textWidth = textMetrics.width;
    const textHeight = fontSize * dpr;
    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    // Ensure the background is transparent
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set font properties
    context.font = `${fontSize * dpr}px sm00ch`;
    context.fillStyle = fontColor;

    // Draw the text with padding
    context.fillText(userText, padding, textHeight + padding / 2);

    // Scale the canvas back down for correct download size
    canvas.style.width = `${canvas.width / dpr}px`;
    canvas.style.height = `${canvas.height / dpr}px`;

    // Convert canvas to data URL and create a download link
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
