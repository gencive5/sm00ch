import React, { useEffect, useState } from 'react';

const InstagramWarningModal = () => {
  const [showInstagramWarning, setShowInstagramWarning] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isInApp = /Instagram/i.test(userAgent);

    // Show modal only if in Instagram in-app browser
    if (isInApp) {
      setShowInstagramWarning(true);
    }
  }, []);

  if (!showInstagramWarning) return null; // Don't render anything if modal isn't needed

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>
          📢 You're using Instagram's in-app browser!
          <br />
          For the best experience, please open this page in your external browser.
        </p>
        <button
          className="bttn btn-use"
          onClick={() => window.open(window.location.href, '_blank')}
        >
          OPEN IN BROWSER
        </button>
        <button
          className="bttn btn-close"
          onClick={() => setShowInstagramWarning(false)}
        >
          Continue Anyway
        </button>
      </div>
    </div>
  );
};

export default InstagramWarningModal;
