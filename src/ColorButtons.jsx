import React from 'react';

function ColorButtons({ setFontColor }) {
  return (
    <>
      <button className="button-red" onClick={() => setFontColor('#C10303')}></button>
      <button className="button-fuchsia" onClick={() => setFontColor('#F70841')}></button>
      <button className="button-pink" onClick={() => setFontColor('#FF3EA3')}></button>
      <button className="button-black" onClick={() => setFontColor('#000000')}></button>
    </>
  );
}

export default ColorButtons;
