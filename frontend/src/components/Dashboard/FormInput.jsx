import React from "react";

const FormInput = ({ label, type = "text", value, onChange, ...props }) => (
  <div className="ap-form-group">
    <label className="ap-form-label">{label}</label>
    <input
      className="ap-form-input-2"
      type={type}
      value={value}
      onChange={onChange}
      {...props}
    />
  </div>
);

export default FormInput;

const css = `
.ap-form-group {
  margin-bottom: 16px;
}

.ap-form-label {
  display: block;
  font-weight: 600;
  color: var(--ad-primary);
  margin-bottom: 6px;
  font-family: "Outfit", sans-serif;
}

.ap-form-input-2 {
  width: 90%;
  padding: 10px 12px;
  border: 1px solid rgba(75, 32, 97, 0.18);
  font-family: "Outfit", sans-serif;
  font-size: 14px;
  background: var(--ad-bg-light);
  border-radius: 6px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.ap-form-input-2:focus {
  outline: none;
  border-color: var(--ad-primary);
  box-shadow: 0 0 0 2px rgba(75, 32, 97, 0.18);
}
`;

const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
