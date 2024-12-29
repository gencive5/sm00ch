import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedFavicon from './animatedfavicon';
import DownloadButton from './DownloadButton';
import ColorButtons from './ColorButtons';
import FontSizeSlider from './FontSizeSlider';

function App() {
  const [userText, setUserText] = useState('');
  const [fontSize, setFontSize] = useState(150);
  const [mobileFontSize] = useState(50);
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

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setShowPlusButton(isMobile);

      // Reset plus menu state and font size for desktop view
      if (!isMobile) {
        setIsPlusMenuOpen(false);
        setFontSize(150);
      } else {
        setFontSize(mobileFontSize);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileFontSize]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const togglePlusMenu = () => setIsPlusMenuOpen(!isPlusMenuOpen);

  return (
    <div className="container mt-5">
      <h1 className="title">sm00ch</h1>

      {/* Font Size Slider and Color Buttons */}
      <div className="button-row mb-3">
        <FontSizeSlider fontSize={fontSize} setFontSize={setFontSize} />
        <ColorButtons setFontColor={setFontColor} />
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
      <div className="button-row row2 mb-3 text-center mt-4">
        {!isPlusMenuOpen && (
          <DownloadButton
            userText={userText}
            fontSize={fontSize}
            fontColor={fontColor}
            showPlusButton={showPlusButton}
          />
        )}

        {showPlusButton ? (
          <>
            <button className="bttn btn-plus" onClick={togglePlusMenu}>
              {isPlusMenuOpen ? 'X' : '+'}
            </button>

            {isPlusMenuOpen && (
              <div className="plus-menu-modal">
                <a href="/sm00ch.zip" download="sm00ch.zip" className="bttn btn-download">
                  DOWNLOAD FONT
                </a>
                <button className="bttn btn-use" onClick={toggleModal}>
                  USE CONDITIONS
                </button>
                <a
                  href="https://www.paypal.me/VicSegen?locale.x=fr_FR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bttn btn-donate">DONATE</button>
                </a>
                <a
                  href="https://youtu.be/QgW_smQAwyE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bttn btn-2">sm00ch 2</button>
                </a>
              </div>
            )}
          </>
        ) : (
          <>
            <button className="bttn btn-use" onClick={toggleModal}>
              {isModalOpen ? '✖' : 'USE CONDITIONS'}
            </button>
            <a
              href="https://www.paypal.me/VicSegen?locale.x=fr_FR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bttn btn-donate">DONATE</button>
            </a>
            <a
              href="https://youtu.be/QgW_smQAwyE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bttn btn-2">sm00ch 2</button>
            </a>
          </>
        )}
      </div>

      {/* Modal for Use Conditions */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>
              THIS FONT IS AVAILABLE FOR PERSONAL USE ONLY, CREDIT GENCIVE5 ON INSTAGRAM.
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
