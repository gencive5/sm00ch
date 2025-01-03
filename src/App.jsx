import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedFavicon from './animatedfavicon';
import DownloadButton from './DownloadButton';
import DownloadButtonIOS from './DownloadButtonIOS'; // New DownloadButton for iOS
import ColorButtons from './ColorButtons';
import FontSizeSlider from './FontSizeSlider';
import BlobPageIOS from './BlobPageIOS'; // Page to display and download the blob
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [userText, setUserText] = useState('');
  const [fontSize, setFontSize] = useState(150);
  const [mobileFontSize] = useState(50);
  const [fontColor, setFontColor] = useState('#000000');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [showPlusButton, setShowPlusButton] = useState(false);
  const [isAndroidInAppBrowser, setIsAndroidInAppBrowser] = useState(false);
  const [isIOSInstagram, setIsIOSInstagram] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    // Detect Android in-app browser
    const isAndroid = /Android/i.test(userAgent);
    const isInApp = /Instagram/i.test(userAgent);
    setIsAndroidInAppBrowser(isAndroid && isInApp);

    // Detect if the user is on iOS and in the Instagram in-app browser
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
    setIsIOSInstagram(isIOS && isInApp);
  }, []);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setShowPlusButton(isMobile);
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

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setIsPlusMenuOpen(false);
  };

  const togglePlusMenu = () => {
    setIsPlusMenuOpen((prev) => !prev);
    setIsModalOpen(false);
  };

  const isAnyModalOpen = isModalOpen || isPlusMenuOpen;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mt-5">
              {isAndroidInAppBrowser && (
                <div
                  style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: '1000',
                  }}
                >
                  <p style={{ margin: '20px', fontSize: '18px', textAlign: 'center' }}>
                    You are currently viewing this app in an Instagram in-app browser on Android.
                    <br />
                    For the best experience, please open it in your default browser.
                  </p>
                  <a
                    href={window.location.href}
                    target="_blank"
                    download
                    style={{
                      padding: '10px 20px',
                      fontSize: '16px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '5px',
                      marginTop: '10px',
                    }}
                  >
                    Open in Browser
                  </a>
                </div>
              )}
              <h1 className="title">sm00ch</h1>
              <div className="button-row mb-3">
                <FontSizeSlider fontSize={fontSize} setFontSize={setFontSize} />
                <ColorButtons setFontColor={setFontColor} />
              </div>
              <textarea
                ref={firstInputRef}
                className="text-input"
                placeholder="Start typing..."
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                spellCheck={false}
              />
              <textarea
                className="text-input2"
                placeholder="Start typing..."
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                style={{ fontSize: `${fontSize}px`, color: fontColor }}
                spellCheck={false}
              />
              <div className="button-row row2 mb-3 text-center mt-4">
                {!isPlusMenuOpen && (
                  <>
                    {isIOSInstagram ? (
                      <DownloadButtonIOS
                        userText={userText}
                        fontSize={fontSize}
                        fontColor={fontColor}
                        showPlusButton={showPlusButton}
                      />
                    ) : (
                      <DownloadButton
                        userText={userText}
                        fontSize={fontSize}
                        fontColor={fontColor}
                        showPlusButton={showPlusButton}
                      />
                    )}
                  </>
                )}
                {showPlusButton ? (
                  <>
                    <button className="bttn btn-plus" onClick={togglePlusMenu}>
                      {isAnyModalOpen ? 'X' : '+'}
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
                      {isModalOpen ? 'X' : 'USE CONDITIONS'}
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
          }
        />
        <Route path="/blob-page" element={<BlobPageIOS />} />
      </Routes>
    </Router>
  );
}

export default App;
