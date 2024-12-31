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
    const isInAppBrowser = /Instagram|FB_IAB|FBAN/.test(navigator.userAgent);
    if (isInAppBrowser) {
      const prompt = document.createElement('div');
      prompt.style.position = 'fixed';
      prompt.style.top = '0';
      prompt.style.left = '0';
      prompt.style.width = '100%';
      prompt.style.height = '100%';
      prompt.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      prompt.style.color = 'white';
      prompt.style.zIndex = '1000';
      prompt.style.display = 'flex';
      prompt.style.flexDirection = 'column';
      prompt.style.alignItems = 'center';
      prompt.style.justifyContent = 'center';
      prompt.innerHTML = `
        <p style="margin: 20px; font-size: 20px; text-align: center;">
          For a better experience, please open this page in your device's default browser.
        </p>
        <button id="openBrowserButton" style="padding: 10px 20px; font-size: 18px; background-color: #007bff; color: white; border: none; cursor: pointer;">
          Open in Browser
        </button>
      `;
      document.body.appendChild(prompt);

      const openBrowserButton = document.getElementById('openBrowserButton');
      openBrowserButton.addEventListener('click', () => {
        const currentUrl = window.location.href;

        // Ensure URL has "https://" properly formatted
        let properUrl;
        if (currentUrl.startsWith('https://')) {
          properUrl = currentUrl; // Correct as is
        } else {
          const cleanedUrl = currentUrl.replace(/^(https?:)?\/\//, ''); // Strip incorrect prefixes
          properUrl = `https://${cleanedUrl}`; // Add correct "https://"
        }

        console.log("Redirecting to Proper URL:", properUrl);

        // Redirect to Chrome or fallback to the default browser
        window.location.href = `googlechrome://${properUrl}`;
        setTimeout(() => {
          window.location.href = properUrl; // Fallback redirection
        }, 1000);
      });
    }
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
    <div className="container mt-5">
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
  );
}

export default App;
