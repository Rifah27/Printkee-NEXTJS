import React, { useState } from "react";
import "../styles/GetQuoteCTA.css";
import { FaGift, FaClock, FaBoxOpen, FaPhoneAlt } from "react-icons/fa";
import EnquiryModal from './EnquiryModal';

const GetQuoteCTA = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section
        className="quote-cta-section"
        role="region"
        aria-labelledby="quote-cta-heading"
      >
        <div className="quote-cta-overlay">
          <div className="quote-cta-content">
            {/* Accessible heading */}
            <h2 className="quote-heading" id="quote-cta-heading">
              Need 100+ Gifts? Let’s Customize Something Perfect.
            </h2>

            {/* Feature List (screen-reader semantic) */}
            <div className="quote-features" role="list">
              <div className="feature-item" role="listitem">
                <FaGift className="feature-icon" aria-hidden="true" />
                <span>Bulk Discounts</span>
              </div>

              <div className="feature-item" role="listitem">
                <FaClock className="feature-icon" aria-hidden="true" />
                <span>Fast Delivery</span>
              </div>

              <div className="feature-item" role="listitem">
                <FaBoxOpen className="feature-icon" aria-hidden="true" />
                <span>Premium Packaging</span>
              </div>
            </div>

            {/* Accessible button */}
            <button
              className="quote-cta-button"
              onClick={() => setShowModal(true)}
              aria-label="Request a customized quote for bulk gifting"
            >
              Request a Quote <span className="arrow-1" aria-hidden="true">→</span>
            </button>

            <p className="quote-cta-extra-info">
              Have questions?{" "}
              <a
                href="mailto:sales@mfglobalservices.com"
                aria-label="Email our gifting support team"
              >
                Contact our team
              </a>{" "}
              for personalized assistance.
            </p>

            <p className="quote-cta-extra-info call-us">
              <FaPhoneAlt className="call-icon" aria-hidden="true" />
              <span>Call us at </span>
              <a
                href="tel:+918750708222"
                aria-label="Call PrintKee at 8750708222"
              >
                +91 8750708222
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Modal (unchanged functionality – just improved trigger) */}
      <EnquiryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        image="/assets/t-shirt.jpg"
        description="Let us help you create the perfect customized gift for your business."
      />
    </>
  );
};

export default GetQuoteCTA;
