import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedFavicon from './animatedfavicon';

function App() {
  const [userText, setUserText] = useState('');
  const firstInputRef = useRef(null);

  // Automatically focus on the first textarea when the component mounts
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1>sm00ch</h1>

      {/* First Input Field */}
      <textarea
        ref={firstInputRef}
        className="text-input"
        placeholder="Start typing..."
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
      />

      {/* Second Input Field (Interconnected) */}
      <textarea
        className="text-input2"
        placeholder="See your text here..."
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
      />

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
