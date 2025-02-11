import React from 'react';

function FontSizeSlider({ fontSize, setFontSize }) {
  const isMobile = window.innerWidth <= 768;
  const maxFontSize = isMobile ? 300 : 150; // Increase max font size on mobile

  return (
    <div className="custom-slider-container">
      <span className="slider-symbol">-</span>
      <div className="slider-wrapper">
        <input
          type="range"
          min="30"
          max={maxFontSize}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="custom-slider"
        />
      </div>
      <span className="slider-symbol2">+</span>
    </div>
  );
}

export default FontSizeSlider;
