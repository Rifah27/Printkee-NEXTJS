import React, { useState } from "react";
import "./FAQProduct.css";

const FAQProduct = ({ productName, subcategoryName, categoryName }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: `Why is ${productName} a popular promotional gift item?`,
      a: `${productName} is one of the most preferred promotional gift items because it offers high branding visibility, long-term usability, and great value. Businesses use it as a branded promotional item to increase recall and build trust with clients.`
    },
    {
      q: `Do you offer customized or personalized promotional products for businesses?`,
      a: `Yes! We provide fully customized and personalized promotional products, including logo printing, branding, and custom packaging. Our range includes business promotional products, branded corporate gifts, and custom promotional items designed to meet marketing goals.`
    },
    {
      q: `Can ${productName} be used as a promotional gift for clients?`,
      a: `Absolutely. ${productName} is widely used as a promotional gift for clients because it works as a high-impact branded product that strengthens customer relationships and enhances brand recognition.`
    },
    {
      q: `Are you a promotional items manufacturer in Delhi NCR?`,
      a: `Yes, we are a leading promotional items manufacturer in Delhi NCR, offering premium corporate promotional gifts, branded products, and customized gifting solutions for companies across Noida, Gurgaon, Delhi, Faridabad, and Okhla.`
    },
    {
      q: `Do you offer bulk corporate promotional gift manufacturing?`,
      a: `We specialize in bulk manufacturing of corporate promotional gifts and branded promotional items. Whether you need promotional gifts for business events, employee gifting, exhibitions, or client appreciation, we provide high-quality products with fast delivery.`
    },
    {
      q: `Is ${productName} available for corporate gifting in Delhi?`,
      a: `Yes. We supply corporate gifts in Delhi, including a premium collection of corporate promotional products and branded promotional items suitable for all industries.`
    },
    {
      q: `Can I customize ${productName} with my company logo?`,
      a: `Yes, you can completely customize ${productName} with your company logo, brand message, colors, and design elements. This makes it a perfect choice for personalized promotional products.`
    },
    {
      q: `Do you manufacture promotional gifts in Noida and Okhla?`,
      a: `Yes. We are a trusted promotional gift manufacturer in Noida and Okhla, offering custom promotional products and branded items for corporate gifting campaigns.`
    },
 
    {
      q: `Can I order custom promotional products in bulk?`,
      a: `Yes, we accept bulk orders for all promotional products, including branded corporate gifts, promotional product kits, and customized gifting solutions. Minimum and maximum order quantities are flexible based on the product.`
    }
  ];

  return (
    <div className="product-faq-wrapper">
      <h2 className="product-faq-title">Frequently Asked Questions</h2>

      <div className="product-faq-list">
        {faqs.map((item, index) => (
          <div key={index} className="product-faq-item">
            <button
              className="product-faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {item.q}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>

            {openIndex === index && (
              <div className="product-faq-answer">
                <p>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQProduct;
