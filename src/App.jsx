import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedFavicon from './animatedfavicon';

function App() {
  const [userText, setUserText] = useState('');
  const [fontSize, setFontSize] = useState(42);
  const [fontColor, setFontColor] = useState('#000000');
  const [isMobile, setIsMobile] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const changeFontColor = (color) => {
    setFontColor(color);
  };

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
    context.font = `${fontSize}px Arial`;
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
    <div className="container mt-5">
      <h1 className="title">sm00ch</h1>

      {/* Buttons */}
      <div className="button-row mb-3">
        <div className="custom-slider-container">
          <input
            type="range"
            min="24"
            max="120"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="custom-slider"
          />
        </div>
        <button className="button-red" onClick={() => changeFontColor('#B00F20')}></button>
        <button className="button-fuchsia" onClick={() => changeFontColor('#99003F')}></button>
        <button className="button-pink" onClick={() => changeFontColor('#B648AD')}></button>
        <button className="button-black" onClick={() => changeFontColor('#000000')}></button>
      </div>

      {/* First Input Field */}
      <textarea
        ref={firstInputRef}
        className="text-input"
        placeholder="Start typing..."
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
      />

      {/* Second Input Field */}
      <textarea
        className="text-input2"
        placeholder="Start typing..."
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        style={{ fontSize: `${fontSize}px`, color: fontColor }}
      />

      {/* Download Button */}
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

      <AnimatedFavicon />
    </div>
  );
}

export default App;
