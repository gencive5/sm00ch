import React, { useState } from 'react';

const DownloadButton = ({ userText, fontSize, fontColor }) => {
  const [generatedImage, setGeneratedImage] = useState(null);

  const generateImage = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const padding = 80 * dpr;
    const scaleFactor = 2;

    context.font = `${fontSize * dpr * scaleFactor}px sm00ch`;
    const textMetrics = context.measureText(userText);

    const textWidth = textMetrics.width;
    const textHeight = fontSize * dpr * scaleFactor;
    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize * dpr * scaleFactor}px sm00ch`;
    context.fillStyle = fontColor;
    context.textBaseline = 'middle';
    context.fillText(userText, padding, canvas.height / 2);

    const dataURL = canvas.toDataURL('image/png');
    setGeneratedImage(dataURL);
  };

  return (
    <div>
      <button className="bttn btn-download" onClick={generateImage}>
        GENERATE IMAGE
      </button>
      {generatedImage && (
        <div className="image-preview">
          <p>Long-press on the image below to save it:</p>
          <img src={generatedImage} alt="Generated Preview" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
