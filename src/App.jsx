import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedFavicon from './animatedfavicon';
import DownloadButton from './DownloadButton';

function App() {
  const [userText, setUserText] = useState('');
  const [fontSize, setFontSize] = useState(42);
  const [fontColor, setFontColor] = useState('#000000');
  const [isMobile, setIsMobile] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  // Detect if the device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const changeFontColor = (color) => {
    setFontColor(color);
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

      {/* Buttons for Desktop and Mobile */}
      <div className="button-row mb-3 text-center mt-4">
      <DownloadButton userText={userText} fontSize={fontSize} fontColor={fontColor} />
        {isMobile ? (
          <button className="bttn btn-plus">+</button>
        ) : (
          <>
            <button className="bttn btn-use">USE CONDITIONS</button>
            
            <a href="https://www.paypal.me/VicSegen?locale.x=fr_FR"  target="_blank" rel="noopener noreferrer">
            <button className="bttn btn-donate">DONATE</button>
            </a>
            <a href="https://youtu.be/QgW_smQAwyE"  target="_blank" rel="noopener noreferrer">
            <button className="bttn btn-2">2</button>
            </a>
          </>
        )}
      </div>

      <AnimatedFavicon />
    </div>
  );
}

export default App;
