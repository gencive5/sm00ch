import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedFavicon from './animatedfavicon';

function App() {
  const [userText, setUserText] = useState('');
  const [fontSize, setFontSize] = useState(42); // Start at the middle of the range
  const [fontColor, setFontColor] = useState('#000000');

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const changeFontColor = (color) => {
    setFontColor(color);
  };

  return (
    <div className="container mt-5">
      <h1>sm00ch</h1>

      <div className="button-row mb-3">
        {/* Range Slider for Font Size Control */}
        <div className="d-flex align-items-center">
          <input
            type="range"
            min="12"
            max="72"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="form-range"
          />
        </div>

        {/* Buttons for Changing Font Color */}
        <button
          className="button-red ms-3"
          onClick={() => changeFontColor('#B00F20')}>
        </button>
        <button
          className="button-fuchsia"
          onClick={() => changeFontColor('#99003F')}>
        </button>
        <button
          className="button-pink"
          onClick={() => changeFontColor('#B648AD')}>
        </button>
        <button
          className="button-black"
          onClick={() => changeFontColor('#000000')}>
        </button>
      </div>

      {/* First Input Field */}
      <textarea
        ref={firstInputRef}
        className="text-input"
        placeholder="Start typing..."
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
      />

      {/* Second Input Field (Interconnected) */}
      <textarea
        className="text-input2"
        placeholder="Start typing..."
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        style={{ fontSize: `${fontSize}px`, color: fontColor }}
      />

      {/* Download Button */}
      <div className="text-center mt-4">
        <a
          href="/sm00ch-font.woff"
          download="sm00ch-font.woff"
          className="btn-primary"
        >
          DOWNLOAD FONT
        </a>
      </div>

      <AnimatedFavicon />
    </div>
  );
}

export default App;
