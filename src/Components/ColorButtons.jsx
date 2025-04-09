import React from 'react';

function ColorButtons({ setFontColor }) {
  return (
    <>
       <button 
        className="button-red" 
        onClick={() => setFontColor('#C10303')}
        aria-label="Red color"
      ></button>
      <button 
        className="button-fuchsia" 
        onClick={() => setFontColor('#F70841')}
        aria-label="Fuchsia color"
      ></button>
      <button 
        className="button-pink" 
        onClick={() => setFontColor('#FF3EA3')}
        aria-label="Pink color"
      ></button>
      <button 
        className="button-black" 
        onClick={() => setFontColor('#000000')}
        aria-label="Black color"
      ></button>
    </>
  );
}

export default ColorButtons;
