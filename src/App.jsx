import React, { useState } from 'react';
import './styles.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AnimatedFavicon from './animatedfavicon';

function App() {
  // State to store the user input
  const [userText, setUserText] = useState(' ');

  return (
    <div className="container mt-5">
      <h1>sm00ch</h1>

      {/* Input Field */}
      <textarea
        className="text-input"
        placeholder="Start typing..."
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
      />

      {/* Display Zone */}
      <div className="text-display">{userText}</div>

    {/* Download Button */}
    <div className="text-center mt-4">
        <a
          href="/sm00ch-font.woff" // Path to your font file in the public folder
          download="sm00ch-font.woff" // Suggested download file name
          className="btn btn-primary"
        >
          Download Font
        </a>
      </div>

      <AnimatedFavicon />


    </div>

    

  );
}

export default App;
