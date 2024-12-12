import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedFavicon from './animatedfavicon';

function App() {
  const [userText, setUserText] = useState('');
  const textAreaRef = useRef(null);

  // Automatically focus on the textarea when the component mounts
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1>sm00ch</h1>

      {/* Input Field */}
      <textarea
        ref={textAreaRef}
        className="text-input"
        
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
      />

      {/* Display Zone with Caret */}
      <div className="display-wrapper">
        <div className="text-display">
          {userText}
          <span className="caret"></span>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-4">
        <a
          href="/sm00ch-font.woff"
          download="sm00ch-font.woff"
          className="btn-primary"
        >
          DOWNLOAD FONT
        </a>
      </div>

      <AnimatedFavicon />
    </div>
  );
}

export default App;
