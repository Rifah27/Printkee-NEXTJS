// src/components/FAQSection.jsx

import React, { useState } from 'react';
import '../styles/FAQSection.css';
import faqList from '../data/productfaqs';

const FAQSection = ({ subcategory }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = faqList[subcategory];

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="faq-section">
      <h2 className="faq-title">{subcategory} - Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="arrow">{openIndex === index ? '▲' : '▼'}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
