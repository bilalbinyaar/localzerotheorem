import React, { useState } from 'react';

const LoginPopup = () => {
  // eslint-disable-next-line
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Popup Title</h2>
        <p>Popup content goes here.</p>
        <button onClick={handleClosePopup}>Close</button>
      </div>
    </div>
  );
};

export default LoginPopup;
