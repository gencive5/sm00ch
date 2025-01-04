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
  );
}

export default AndroidWarning;
