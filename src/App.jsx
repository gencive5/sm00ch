import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedFavicon from './animatedfavicon';
import DownloadButton from './DownloadButton';

function App() {
  const [userText, setUserText] = useState('');
  const [fontSize, setFontSize] = useState(150);
  const [fontColor, setFontColor] = useState('#000000');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [showPlusButton, setShowPlusButton] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  // Detect when the screen width is small enough for the plus button to appear
  useEffect(() => {
    const handleResize = () => {
      setShowPlusButton(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle the use conditions modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Toggle the plus menu modal
  const togglePlusMenu = () => {
    setIsPlusMenuOpen(!isPlusMenuOpen);
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
            max="150"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="custom-slider"
          />
        </div>
        <button className="button-red" onClick={() => setFontColor('#C10303')}></button>
        <button className="button-fuchsia" onClick={() => setFontColor('#F70841')}></button>
        <button className="button-pink" onClick={() => setFontColor('#FF3EA3')}></button>
        <button className="button-black" onClick={() => setFontColor('#000000')}></button>
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
        <DownloadButton
          userText={userText}
          fontSize={fontSize}
          fontColor={fontColor}
          showPlusButton={showPlusButton}
        />

        {showPlusButton ? (
          <>
            <button className="bttn btn-plus" onClick={togglePlusMenu}>
              {isPlusMenuOpen ? '✖' : '+'}
            </button>

            {isPlusMenuOpen && (
              <div className="plus-menu-modal">
                <a href="/sm00ch.zip" download="sm00ch.zip" className="bttn btn-download">
                  DOWNLOAD FONT
                </a>
                <button className="bttn btn-use" onClick={toggleModal}>
                  USE CONDITIONS
                </button>
                <a href="https://www.paypal.me/VicSegen?locale.x=fr_FR" target="_blank" rel="noopener noreferrer">
                  <button className="bttn btn-donate">DONATE</button>
                </a>
                <a href="https://youtu.be/QgW_smQAwyE" target="_blank" rel="noopener noreferrer">
                  <button className="bttn btn-2">2</button>
                </a>
              </div>
            )}
          </>
        ) : (
          <>
            <button className="bttn btn-use" onClick={toggleModal}>
              {isModalOpen ? '✖' : 'USE CONDITIONS'}
            </button>
            <a href="https://www.paypal.me/VicSegen?locale.x=fr_FR" target="_blank" rel="noopener noreferrer">
              <button className="bttn btn-donate">DONATE</button>
            </a>
            <a href="https://youtu.be/QgW_smQAwyE" target="_blank" rel="noopener noreferrer">
              <button className="bttn btn-2">2</button>
            </a>
          </>
        )}
      </div>

      {/* Modal for Use Conditions */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>
              THIS FONT IS AVAILABLE FOR PERSONAL USE ONLY; CREDIT GENCIVE5 ON INSTAGRAM.
              <br />
              FOR ANY COMMERCIAL USE PLEASE CONTACT ME AT @GENCIVE5 OR VIC.SEGEN@GMAIL.COM
              <br />
              YOU CAN DONATE IF YOU WANT.
            </p>
          </div>
        </div>
      )}

      <AnimatedFavicon />
    </div>
  );
}

export default App;
