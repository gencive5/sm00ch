import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedFavicon from './Components/AnimatedFavicon';
import DownloadButton from './Components/DownloadButton';
import DownloadButtonIOS from './Components/DownloadButtonIOS';
import ColorButtons from './Components/ColorButtons';
import FontSizeSlider from './Components/FontSizeSlider';
import AndroidWarning from './Components/AndroidWarning';
import InstagramWarningModal from './Components/InstagramWarningModal';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: (
      <div className="container mt-5">
        <MainApp />
      </div>
    ),
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

function MainApp() {
  const [userText, setUserText] = useState('');
  const [fontSize, setFontSize] = useState(150);
  const [mobileFontSize] = useState(50);
  const [fontColor, setFontColor] = useState('#000000');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [showPlusButton, setShowPlusButton] = useState(false);
  const [isAndroidInAppBrowser, setIsAndroidInAppBrowser] = useState(false);
  const [isIOSInstagram, setIsIOSInstagram] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const firstInputRef = useRef(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isAndroid = /Android/i.test(userAgent);
    const isInApp = /Instagram/i.test(userAgent);
    setIsAndroidInAppBrowser(isAndroid && isInApp);

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
      const mobileCheck = window.innerWidth <= 768;
      setIsMobile(mobileCheck);
      setShowPlusButton(mobileCheck);
      if (!mobileCheck) {
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

  return (
    <div>
      {isAndroidInAppBrowser && <AndroidWarning />}
      <InstagramWarningModal /> 
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
        {!(isPlusMenuOpen && isMobile) && !((isModalOpen && isMobile)) && (
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
            <button className="bttn btn-plus" onClick={isModalOpen ? toggleModal : togglePlusMenu}>
              {(isModalOpen || isPlusMenuOpen) ? 'X' : '+'}
            </button>
            {isPlusMenuOpen && (
              <div className="plus-menu-modal">
                {!isModalOpen && (
                  <a href="/sm00ch.zip" download="sm00ch.zip" className="bttn btn-downloaf">
                    DOWNLOAD FONT
                  </a>
                )}
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
              THIS FONT IS AVAILABLE FOR PERSONAL USE ONLY.
              <br />
              CREDIT @GENCIVE5 ON INSTAGRAM.
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
