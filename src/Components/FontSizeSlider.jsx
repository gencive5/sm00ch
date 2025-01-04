import React from 'react';

function FontSizeSlider({ fontSize, setFontSize }) {
  return (
    <div className="custom-slider-container">
      <span className="slider-symbol">-</span>
      <div className="slider-wrapper">
        <input
          type="range"
          min="30"
          max="150"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="custom-slider"
        />
      </div>
      <span className="slider-symbol">+</span>
    </div>
  );
}

export default FontSizeSlider;
