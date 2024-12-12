import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedFavicon from './animatedfavicon';

function App() {
  const [userText, setUserText] = useState('');
  const [fontSize, setFontSize] = useState(16); // Default font size in px
  const [fontColor, setFontColor] = useState('#000000'); // Default font color (black)

  const firstInputRef = useRef(null);

  // Automatically focus on the first textarea when the component mounts
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  // Function to handle font size change
  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  // Function to change font color
  const changeFontColor = (color) => {
    setFontColor(color);
  };

  return (
    <div className="container mt-5">
      <h1>sm00ch</h1>

      {/* Buttons Row */}
      <div className="button-row mb-3">
        <button className="btn btn-secondary me-2" onClick={increaseFontSize}>
          Increase Font Size
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={() => changeFontColor('#ff0000')}
        >
          Red
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={() => changeFontColor('#0000ff')}
        >
          Blue
        </button>
        <button
          className="btn btn-success me-2"
          onClick={() => changeFontColor('#00ff00')}
        >
          Green
        </button>
        <button
          className="btn btn-warning"
          onClick={() => changeFontColor('#ffa500')}
        >
          Orange
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
