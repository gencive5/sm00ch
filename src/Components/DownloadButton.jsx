import React from 'react';

const DownloadButton = ({ userText, fontSize, fontColor, showPlusButton }) => {
  const loadFontAndDownload = async () => {
    if (!userText.trim()) return;

    try {
      await document.fonts.load(`${fontSize}px sm00ch`);
      downloadPNG();
    } catch (error) {
      console.error('Font loading failed:', error);
      downloadPNG();
    }
  };

  const downloadPNG = () => {
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

    const pngUrl = canvas.toDataURL('image/png');
    
    // SIMPLE FIX: Use a temporary link that stays in DOM
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'sm00ch.png';
    link.style.display = 'none';
    
    // CRITICAL: Append to body BEFORE clicking (Firefox mobile needs this)
    document.body.appendChild(link);
    
    // Use MouseEvent instead of .click() for better compatibility
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    
    // Dispatch the event
    link.dispatchEvent(clickEvent);
    
    // Don't remove immediately - Firefox mobile needs time
    setTimeout(() => {
      if (link.parentNode) {
        document.body.removeChild(link);
      }
    }, 5000); // Longer timeout for mobile
    
    // Alternative: Also try the standard click as backup
    link.click();
  };

  return showPlusButton ? (
    <button className="btn-download" onClick={loadFontAndDownload} aria-label="Download PNG">
      DOWNLOAD PNG
    </button>
  ) : (
    <a href="/sm00ch.zip" download="sm00ch.zip" className="bttn btn-downloaf" aria-label="Download font">
      DOWNLOAD FONT
    </a>
  );
};

export default DownloadButton;