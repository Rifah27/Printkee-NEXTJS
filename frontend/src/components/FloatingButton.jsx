import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/FloatingButton.css";

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <a
        href="https://wa.me/+918750708222"
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
        role="button"
      >
        <FaWhatsapp className="icon-btn" aria-hidden="true" />
      </a>
    </div>
  );
};

export default FloatingButtons;
