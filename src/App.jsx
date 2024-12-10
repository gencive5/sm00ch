import React, { useState } from 'react';
import './styles.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  // State to store the user input
  const [userText, setUserText] = useState(' ');

  return (
    <div className="container mt-5">
      <h1>sm00ch!?!!</h1>



      {/* Input Field */}
      <textarea
        className="text-input"
        placeholder="Start typing..."
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
      />

      {/* Display Zone */}
      <div className="text-display">{userText}</div>
    </div>
  );
}

export default App;
