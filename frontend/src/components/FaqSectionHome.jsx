import React, { useState } from "react";
import "../styles/FaqSectionHome.css";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "What types of promotional items do you offer?",
    answer:
      "We offer custom apparel, bags, stationery, corporate gifts, trophies, medals, and more. All items can be personalized with logos, brand colors, and unique designs to match your branding.",
  },
  {
    question: "Can I order in bulk?",
    answer:
      "Yes, we accept bulk orders and offer special discounted pricing for large quantities.",
  },
  {
    question: "How long does customization take?",
    answer:
      "Most custom orders take 7–10 business days depending on the product and design complexity. Rush orders may also be available on request.",
  },
  {
    question: "Do you deliver across Delhi NCR?",
    answer:
      "Yes, we deliver throughout Delhi NCR and ensure timely and safe delivery for all corporate gifting and promotional orders.",
  },
  {
    question: "How can I get a quote?",
    answer:
      "You can request a quote directly on our website or call +91 8750708222. Our team will help you choose the right products and provide a customized pricing plan.",
  },
  {
    question: "Can I get a sample before placing a big order?",
    answer:
      "Yes, we can provide sample products for select items so you can check the quality and customization before finalizing your bulk order.",
  },
  {
    question: "Are the products eco-friendly?",
    answer:
      "We offer a wide range of sustainable products made from bamboo, jute, recycled materials, and eco-friendly packaging options.",
  },
  {
    question: "What is the best corporate gift?",
    answer:
      "The best corporate gift depends on your audience, occasion, and budget. Popular options include branded apparel, bottles, premium diaries, tech accessories, and custom gift hampers.",
  },
  {
    question: "How do I customize gifts with my company logo?",
    answer:
      "You can upload your logo during customization or share it with our team. We offer printing, engraving, embroidery, and more based on the product type.",
  },
  {
    question: "Do you deliver pan India?",
    answer:
      "Yes, we deliver pan India through reliable logistics partners ensuring safe and timely delivery.",
  },
];

const FaqSectionHome = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section
      className="faqhome-section"
      role="region"
      aria-labelledby="faqhome-title"
    >
      <h2 id="faqhome-title" className="faqhome-title">
        FAQ – Frequently Asked Questions
      </h2>

      <p className="faqhome-subtitle">
        Find answers to the most commonly asked questions about our promotional
        products, delivery, customization, and corporate gifting services.
      </p>

      <div className="faqhome-container" role="list">
        {faqData.map((faq, index) => {
          const isOpen = activeIndex === index;
          const answerId = `faq-answer-${index}`;
          const questionId = `faq-question-${index}`;

          return (
            <div className="faqhome-item" key={index} role="listitem">
              <button
                id={questionId}
                className="faqhome-question"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleFAQ(index)}
              >
                <span className="faqhome-question-text">{faq.question}</span>
                <span className="faqhome-icon" aria-hidden="true">
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>

              {isOpen && (
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className="faqhome-answer"
                >
                  <p className="faqhome-answer-text">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSectionHome;
