import React from 'react';

const DownloadButton = ({ userText, fontSize, fontColor, showPlusButton }) => {
  const loadFontAndDownload = async () => {
    if (!userText) return;

    try {
      await document.fonts.load(`${fontSize}px sm00ch`);
      downloadPNG();
    } catch (error) {
      console.error('Font loading failed:', error);
      downloadPNG(); // Try anyway
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

    // Draw the text
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize * dpr * scaleFactor}px sm00ch`;
    context.fillStyle = fontColor;
    context.textBaseline = 'middle';
    context.fillText(userText, padding, canvas.height / 2);

    // Get PNG data URL
    const pngUrl = canvas.toDataURL('image/png');
    
    // Create download link
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'sm00ch.png';
    
    // 🔥 SIMPLE FIREFOX FIX:
    // Add target="_blank" for Firefox mobile compatibility
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Hide the link
    link.style.display = 'none';
    
    // Append to body (important for Firefox)
    document.body.appendChild(link);
    
    // Try multiple click methods for maximum compatibility
    try {
      // Method 1: Standard click
      link.click();
      
      // Method 2: MouseEvent for better Firefox support
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      link.dispatchEvent(clickEvent);
      
    } catch (error) {
      console.log('Click methods failed, trying fallback:', error);
      
      // Fallback: Open in new window with save instructions
      const newWindow = window.open(pngUrl, '_blank');
      if (newWindow) {
        // Add save instructions to the new window
        setTimeout(() => {
          try {
            newWindow.document.title = 'sm00ch - Save Image';
            newWindow.document.body.innerHTML = `
              <div style="padding:20px;text-align:center;font-family:Arial;">
                <h2>Save Your Image</h2>
                <p>Long press on the image and select "Save Image" or "Download"</p>
                <img src="${pngUrl}" style="max-width:100%;border:2px solid #ccc;" />
              </div>
            `;
          } catch (e) {
            // Can't modify cross-origin window, that's OK
          }
        }, 100);
      }
    }
    
    // Clean up after a delay (keep link longer for Firefox)
    setTimeout(() => {
      if (link.parentNode) {
        document.body.removeChild(link);
      }
    }, 3000); // Longer timeout for mobile browsers
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