import React, { useState, useEffect } from 'react';
import "../scss/popup.scss";

const Popup = ({ onClose, message, className, timeLeft, setTimeLeft }) => {

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1); 
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, setTimeLeft]); 

  return (
    <div className={`popup ${className}`}>
      <div className='popup-content'>
        <h3 className='title'>{message}</h3>
        <p className='des'>Time remaining: {timeLeft}s</p>
        {timeLeft === 0 ? (
          <p>กรุณาทำรายการใหม่</p> 
        ) : null}
        <button className='btn-green' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
