import React from "react";
import "./WhyChooseUsProduct.css";

const WhyChooseUsProduct = ({ productName, subcategoryName }) => {
  const name = productName || subcategoryName || "this product";

  return (
    <section 
      className="wcup-wrapper" 
      aria-labelledby="why-choose-us-title"
    >
      <h2 id="why-choose-us-title" className="wcup-title">
        Why Choose Us for {name}?
      </h2>

      <ul className="wcup-grid" role="list">
        <li className="wcup-card">
          <h3 className="wcup-card-title">Premium Material Quality</h3>
          <p className="wcup-card-text">
            Every {name} undergoes strict multi-level quality checks to ensure 
            durability, top-grade finishing, and a professional branded appearance.
          </p>
        </li>

        <li className="wcup-card">
          <h3 className="wcup-card-title">Expert Custom Branding</h3>
          <p className="wcup-card-text">
            Our team specializes in embroidery, engraving, UV printing, and 
            premium logo customization to enhance the look of your {name}.
          </p>
        </li>

        <li className="wcup-card">
          <h3 className="wcup-card-title">Bulk Order Capability</h3>
          <p className="wcup-card-text">
            We deliver consistent printing and production quality whether you 
            order 50 units or 5,000 — ideal for corporate events and gifting.
          </p>
        </li>

        <li className="wcup-card">
          <h3 className="wcup-card-title">Fast & Reliable Delivery</h3>
          <p className="wcup-card-text">
            Perfect for onboarding kits, event giveaways, marketing campaigns, 
            and urgent requirements across Delhi NCR.
          </p>
        </li>

        <li className="wcup-card">
          <h3 className="wcup-card-title">End-to-End Corporate Support</h3>
          <p className="wcup-card-text">
            From concept to dispatch — branding, sampling, packaging, and 
            logistics — we manage everything for a seamless experience.
          </p>
        </li>

        <li className="wcup-card">
          <h3 className="wcup-card-title">Trusted by Top Corporates</h3>
          <p className="wcup-card-text">
            Leading startups, SMEs, and global companies rely on us for 
            reliability, premium quality, and professional service.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default WhyChooseUsProduct;
