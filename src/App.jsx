// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedFavicon from './animatedfavicon';
import DownloadButton from './DownloadButton';

function App() {
  const [userText, setUserText] = useState('');
  const [fontSize, setFontSize] = useState(42);
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
    
    <div className="button-row mb-3">
      <button className="bttn btn-use"> USE CONDITIONS </button>
      {/* Download Button */}
      <DownloadButton userText={userText} fontSize={fontSize} fontColor={fontColor}/>
      <button className="bttn btn-donate"> DONATE</button>
      <button className="bttn btn-2"> 2</button>
     


      </div>

      <AnimatedFavicon />
    </div>
  );
}

export default App;
