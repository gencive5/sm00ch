import React from 'react';

function AndroidWarning() {
  const isAndroidInAppBrowser = /Android/i.test(navigator.userAgent) && /Instagram/i.test(navigator.userAgent);

  if (!isAndroidInAppBrowser) {
    return null; // Do not render anything if the condition is not met
  }

  return (
   

    <div className="modal-overlay2">
    <div className="modal-content2">
      <p className="subtitles"> 
        For the best experience, please open this page in your external browser.
      </p>
      
      <a href={window.location.href} target="_blank" rel="noopener noreferrer">
  <button className="btn-open" aria-label="Open in external browser">
    OPEN IN BROWSER
  </button>
</a>
     
    </div>
  </div>

    
  );
}

export default AndroidWarning;
