// components/Toast.jsx
import React, { useEffect, useRef, useState } from 'react';
import '../styles/Toast.css';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const icons = {
  success: <FaCheckCircle aria-hidden="true" />,
  error: <FaExclamationCircle aria-hidden="true" />,
  info: <FaInfoCircle aria-hidden="true" />,
};

const Toast = ({ type = 'info', message, onClose }) => {
  const toastRef = useRef(null);
  const [closing, setClosing] = useState(false);

  // Auto-close after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => triggerClose(), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Close with ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        triggerClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const triggerClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 200); // allow fade-out animation if CSS exists
  };

  return (
    <div
      ref={toastRef}
      className={`printkee-toast printkee-toast-${type} ${closing ? "closing" : ""}`}
      role="alert"
      aria-live="assertive"
      tabIndex="0"
    >
      <span className="toast-icon">{icons[type]}</span>

      <span className="toast-message">{message}</span>

      <button
        className="toast-close"
        aria-label="Close notification"
        onClick={triggerClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") triggerClose();
        }}
      >
        <FaTimes aria-hidden="true" />
      </button>
    </div>
  );
};

export default Toast;
