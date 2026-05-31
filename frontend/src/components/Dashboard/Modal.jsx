import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="ap-modal-overlay" onClick={onClose}>
      <div className="ap-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="ap-modal-header">
          <h3 className="ap-modal-title">{title}</h3>
          <button className="ap-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="ap-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

const css = `
.ap-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(43, 43, 43, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.ap-modal-box {
  background: var(--ad-white);
  width: 98%;
  max-width: 700px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: apFadeIn 0.25s ease-out;
  border: 1px solid rgba(75, 32, 97, 0.18);
  border-radius: 12px;
  box-shadow: var(--ad-shadow-hover);
}

.ap-modal-header {
  background: var(--ad-primary);
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ap-modal-title {
  color: var(--ad-white);
  font-size: 18px;
  font-weight: 600;
}

.ap-close-btn {
  font-size: 22px;
  color: var(--ad-white);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.ap-close-btn:hover {
  color: var(--ad-accent);
}

.ap-modal-content {
  padding: 22px;
  background: var(--ad-bg-light);
  overflow-y: auto;
  flex-grow: 1;
}

@keyframes apFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
