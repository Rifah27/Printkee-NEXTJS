// src/components/FAQSection.jsx

import React, { useState } from "react";
import "./FAQSection.css";
import productFAQs from "../../data/productfaqs";

const FAQSection = ({ subcategory }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = productFAQs[subcategory] || [];
  if (faqs.length === 0) return null;

  const formatTitle = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <section className="pk-faq-wrapper" aria-labelledby="faq-title">
      <h2 id="faq-title" className="pk-faq-title">
        {formatTitle(subcategory)} – Frequently Asked Questions
      </h2>

      <div className="pk-faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;
          const questionId = `faq-question-${index}`;

          return (
            <div key={index} className="pk-faq-card">
              
              {/* Accessible button for screen readers */}
              <button
                id={questionId}
                className="pk-faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className="pk-faq-question-text">{faq.question}</span>
                <span
                  className={`pk-faq-icon ${isOpen ? "pk-faq-rotate" : ""}`}
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                className="pk-faq-answer"
                style={{ maxHeight: isOpen ? "300px" : "0px" }}
              >
                <p className="pk-faq-answer-text">{faq.answer}</p>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
