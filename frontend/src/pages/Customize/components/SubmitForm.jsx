import React from "react";
import "../styles/SubmitForm.css"; 

const SubmitForm = ({
  onSubmit,
  onCancel,
  loading,
  companyname,
  setCompanyName,
  phone,
  setPhoneNumber,
  message,
  setMessage
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="popup-form-overlay">
      <div className="popup-form">
        <h3 className="heading">Enter Details</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Company Name *"
            value={companyname}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            aria-label="Company Name"
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="[0-9]{10}"
            maxLength="10"
            required
            aria-label="Phone Number"
          />
          <input
            type="text"
            placeholder="Requirement *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            aria-label="Requirement"
          />
          <div className="form-buttons">
            <button type="submit" className="download-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner" />
                  Processing...
                </>
              ) : "Submit & Download"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;
