import React, { useEffect, useState } from 'react';

const InstagramWarningModal = () => {
  const [showInstagramWarning, setShowInstagramWarning] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isInApp = /Instagram/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

    // Show modal only if in Instagram in-app browser on iOS
    if (isInApp && isIOS) {
      setShowInstagramWarning(true);
    }
  }, []);

  if (!showInstagramWarning) return null; // Don't render anything if modal isn't needed

  return (
    <div className="modal-overlay2">
      <div className="modal-content2">
        <p className="subtitles"> 
          For the best experience, please open this page in your external browser.
        </p>
        
        <a href="https://taap.it/Mx0rJm" target="_blank" rel="noopener noreferrer" className="external-link">
        <button className="btn-open" aria-label="Open in external browser">OPEN IN BROWSER</button>
        </a>
       
      </div>
    </div>
  );
};

export default InstagramWarningModal;
