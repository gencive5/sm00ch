import React from 'react';

const DownloadButton = ({ userText, fontSize, fontColor, showPlusButton }) => {
  const loadFontAndDownload = async () => {
    if (!userText) return;

    try {
      await document.fonts.load(`${fontSize}px sm00ch`);
      downloadPNG();
    } catch (error) {
      console.error('Font loading failed:', error);
    }
  };

  const downloadPNG = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const padding = 80 * dpr; // Increased padding for larger frame
    const scaleFactor = 2; // Increased scale factor for better resolution

    context.font = `${fontSize * dpr * scaleFactor}px sm00ch`;
    const textMetrics = context.measureText(userText);

    const textWidth = textMetrics.width;
    const textHeight = fontSize * dpr * scaleFactor;
    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    // Ensure text fits by aligning it properly
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize * dpr * scaleFactor}px sm00ch`;
    context.fillStyle = fontColor;
    context.textBaseline = 'middle'; // Align text vertically
    context.fillText(userText, padding, canvas.height / 2);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'sm00ch.png';
    link.click();
  };

  return showPlusButton ? (
    <button className="bttn btn-download" onClick={loadFontAndDownload}>
      DOWNLOAD PNG
    </button>
  ) : (
    <a href="/sm00ch.zip" download="sm00ch.zip" className="bttn btn-download">
      DOWNLOAD FONT
    </a>
  );
};

export default DownloadButton;
