import React from 'react';

const DownloadButton = ({ userText, fontSize, fontColor, showPlusButton }) => {
  const loadFontAndDownload = async () => {
    if (!userText) return;

    try {
      await document.fonts.load(`${fontSize}px sm00ch`);
      
      // Detect if we're in Firefox mobile
      const isFirefoxMobile = /firefox|fxios/i.test(navigator.userAgent) && 
                             /android|iphone|ipad|ipod/i.test(navigator.userAgent);
      
      if (isFirefoxMobile) {
        // Use Firefox-specific method
        firefoxMobileDownload();
      } else {
        // Use original method for Chrome/Safari/Desktop
        originalDownload();
      }
    } catch (error) {
      console.error('Font loading failed:', error);
      // Fallback to original method
      originalDownload();
    }
  };

  // Your original working code (for Chrome/Safari/Desktop)
  const originalDownload = () => {
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

    // Draw the text
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize * dpr * scaleFactor}px sm00ch`;
    context.fillStyle = fontColor;
    context.textBaseline = 'middle';
    context.fillText(userText, padding, canvas.height / 2);

    // Directly trigger download without redirecting
    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'sm00ch.png';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Firefox mobile specific solution
  const firefoxMobileDownload = () => {
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

    // Method 1: Try blob URL first (sometimes works better in Firefox)
    canvas.toBlob((blob) => {
      if (!blob) {
        // If blob fails, fall back to data URL
        firefoxMobileFallback(canvas);
        return;
      }
      
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'sm00ch.png';
      link.style.display = 'none';
      
      // Append and click
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 100);
    }, 'image/png');
  };

  const firefoxMobileFallback = (canvas) => {
    // Method 2: Open image in new tab and let user save manually
    const dataUrl = canvas.toDataURL('image/png');
    
    // Create a new window with the image
    const newWindow = window.open();
    if (!newWindow) {
      // If popup blocked, show instructions
      alert('Firefox mobile detected!\n\n' +
            '1. The image is ready to download\n' +
            '2. Please long-press on the image below\n' +
            '3. Select "Save Image" or "Download"');
      
      // Create a visible link for manual save
      const visibleLink = document.createElement('a');
      visibleLink.href = dataUrl;
      visibleLink.download = 'sm00ch.png';
      visibleLink.textContent = 'Tap here to download sm00ch.png';
      visibleLink.style.cssText = `
        display: block;
        padding: 20px;
        background: #c10303;
        color: white;
        font-size: 18px;
        text-align: center;
        text-decoration: none;
        position: fixed;
        top: 20px;
        left: 20px;
        right: 20px;
        z-index: 9999;
        border-radius: 10px;
      `;
      
      document.body.appendChild(visibleLink);
      
      // Auto-remove after 10 seconds
      setTimeout(() => {
        if (visibleLink.parentNode) {
          document.body.removeChild(visibleLink);
        }
      }, 10000);
    } else {
      // Show image in new tab for manual save
      newWindow.document.write(`
        <html>
          <head>
            <title>sm00ch - Save Image</title>
            <style>
              body { margin: 0; padding: 20px; background: #f0f0f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
              .container { text-align: center; }
              img { max-width: 100%; height: auto; border: 2px solid #333; }
              .instructions { margin-top: 20px; font-family: Arial; color: #333; }
            </style>
          </head>
          <body>
            <div class="container">
              <img src="${dataUrl}" alt="sm00ch font image">
              <div class="instructions">
                <h3>To save this image:</h3>
                <p>1. Long press on the image above</p>
                <p>2. Select "Save Image" or "Download"</p>
                <p>3. Choose where to save it</p>
              </div>
            </div>
          </body>
        </html>
      `);
    }
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