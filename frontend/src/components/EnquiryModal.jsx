import React, { useState, useEffect, useRef } from "react";
import "../styles/EnquiryModal.css";
import axios from "axios";

const EnquiryModal = ({ isOpen, onClose, image, description }) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    requirement: "",
  });

  const modalRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(import.meta.env.VITE_CRM_API_URL, formData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_CRM_API_KEY,
        },
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/send-email`, formData);

      alert("Thank you! Your inquiry has been submitted.");
      setFormData({ name: "", company: "", email: "", phone: "", requirement: "" });
      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // Close modal with ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="enquiry-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        aria-describedby="enquiry-description"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <button
          className="close-btn-enquiry"
          onClick={onClose}
          aria-label="Close enquiry form"
        >
          ×
        </button>

        <div className="modal-container">

          {/* LEFT SECTION */}
          <div className="left-content">
            <img
              src={image || "/assets/t shirt.jpg"}
              alt="Product enquiry illustration"
              className="enquiry-image"
            />

            <p id="enquiry-description" className="left-description">
              {description ||
                "Reach out to us for tailored solutions, expert consultation, and a personalized quote that fits your business needs."}
            </p>
          </div>

          {/* RIGHT SECTION */}
          <div className="right-form">
            <h2 id="enquiry-title" className="enquiry-title">
              Get a Quote
            </h2>

            <form onSubmit={handleSubmit} className="enquiry-form">

              {/* Name */}
              <label htmlFor="name" className="sr-label">
                Your Name
              </label>
              <input
                id="name"
                className="form-input"
                type="text"
                name="name"
                placeholder="Your Name"
                required
                onChange={handleChange}
                value={formData.name}
              />

              {/* Company */}
              <label htmlFor="company" className="sr-label">
                Company Name
              </label>
              <input
                id="company"
                className="form-input"
                type="text"
                name="company"
                placeholder="Company Name"
                required
                onChange={handleChange}
                value={formData.company}
              />

              {/* Email */}
              <label htmlFor="email" className="sr-label">
                Email Address
              </label>
              <input
                id="email"
                className="form-input"
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleChange}
                value={formData.email}
              />

              {/* Phone */}
              <label htmlFor="phone" className="sr-label">
                Phone Number
              </label>
              <input
                id="phone"
                className="form-input"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                value={formData.phone}
              />

              {/* Requirement */}
              <label htmlFor="requirement" className="sr-label">
                Your Requirement
              </label>
              <textarea
                id="requirement"
                className="form-textarea"
                name="requirement"
                placeholder="Your Requirement"
                rows="4"
                onChange={handleChange}
                value={formData.requirement}
              ></textarea>

              <button
                type="submit"
                className="submit-btn-enquiry"
                aria-label="Submit enquiry form"
              >
                Get a Quote
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
