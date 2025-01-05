import React from 'react';

function AndroidWarning() {
  const isAndroidInAppBrowser = /Android/i.test(navigator.userAgent) && /Instagram/i.test(navigator.userAgent);

  if (!isAndroidInAppBrowser) {
    return null; // Do not render anything if the condition is not met
  }

  return (
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
        fontFamily: "'bebas', sans-serif", // Apply bebas font to all text
      }}
    >
      <p style={{ margin: '20px', fontSize: '18px', textAlign: 'center' }}>
        You are currently viewing this app in an Instagram in-app browser.
        <br />
        For the best experience, please open it in your default browser.
      </p>
      <a
        href={window.location.href}
        target="_blank"
        download
        style={{
          backgroundColor: '#ffffff',
          border: '0px solid #000000',
          borderRadius: '5px',
          width: '10rem',
          height: '3rem',
          boxSizing: 'border-box',
          color: '#000000',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'bebas', sans-serif",
          fontSize: '2.3rem',
          lineHeight: 'normal',
          margin: '0',
          outline: 'none',
          padding: '0.7rem',
          position: 'relative',
          textAlign: 'center',
          textDecoration: 'none',
          touchAction: 'manipulation',
          transition: 'box-shadow 0.2s, transform 0.1s',
          userSelect: 'none',
          minWidth: '14rem',
        }}
      >
        Open in Browser
      </a>
    </div>
  );
}

export default AndroidWarning;
