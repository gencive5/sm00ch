import React from 'react';
import { useNavigate } from 'react-router-dom';

const DownloadButtonIOS = ({ userText, fontSize, fontColor, showPlusButton }) => {
  const navigate = useNavigate();

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
      navigate('/blob-page', { state: { blobUrl } });
    }, 'image/png');
  };

  return showPlusButton ? (
    <button className="btn-download" onClick={loadFontAndDownload}>
      DOWNLOAD PNG
    </button>
  ) : (
    <a href="/sm00ch.zip" download="sm00ch.zip" className="bttn btn-downloaf">
      DOWNLOAD FONT
    </a>
  );
};

export default DownloadButtonIOS;
