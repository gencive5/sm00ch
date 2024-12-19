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

    const padding = 40 * dpr;
    const scaleFactor = 1.5;

    context.font = `${fontSize * dpr * scaleFactor}px sm00ch`;
    const textMetrics = context.measureText(userText);

    const textWidth = textMetrics.width;
    const textHeight = fontSize * dpr * scaleFactor;
    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize * dpr * scaleFactor}px sm00ch`;
    context.fillStyle = fontColor;
    context.fillText(userText, padding, textHeight + padding / 2);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'text-image.png';
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
