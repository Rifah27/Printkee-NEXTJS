import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <Helmet>
        <title>About MF Global Services | Corporate Gifting Solutions</title>
        <meta
          name="description"
          content="Learn about MF Global Services – your trusted partner for premium corporate gifting solutions. Discover our mission, values, and why top brands choose us for personalized gifts."
        />
        <link rel="canonical" href="https://printkee.com/about" />
      </Helmet>

      <section className="aboutus-hero">
        <div className="aboutus-text">
          <h1>About Printkee</h1>
          <p>
           Printkee is your trusted destination for custom corporate gifting and
promotional merchandise, designed to help brands stand out and leave a
lasting impression. We specialize in high-quality, customized products that
align perfectly with your brand identity and business goals.
With a strong focus on creativity, quality, and reliability, Printkee works with
corporates, startups, educational institutions, and event organizers to
deliver end-to-end branding solutions. From product selection and
customization to production and on-time delivery, we ensure a smooth and
professional experience at every step.
Our extensive product range includes custom apparel, bags, drinkware,
eco-friendly products, office and writing essentials, technology accessories,
trophies, and curated welcome kits. Whether it’s employee onboarding,
corporate events, client gifting, promotional campaigns, or brand
activations, Printkee provides solutions that make an impact.
At Printkee, we believe corporate gifting is more than just a product—it’s a
powerful branding tool. Our commitment to premium quality, attention to
detail, and customer satisfaction has made us a preferred partner for
businesses across India.
Let Printkee help you transform your brand ideas into memorable,
customized experiences.
          </p>
        </div>
        <img
          src="/assets/1.webp"
          height="300"
          width="500"
          alt="Corporate Gifting by MF Global Services"
          className="aboutus-hero-image"
        />
      </section>

      {/* <section className="aboutus-section">
        <h2>Who We Are</h2>
        <div className="aboutus-flex">
          <p>
            MF Global Services is a trusted name in the corporate gifting industry. We offer a diverse product range—from eco-friendly items and branded apparel to premium office accessories and welcome kits. Our commitment is to deliver value-driven, thoughtful gifts that reflect your organization’s ethos.
          </p>
          <img src="/assets/2.webp" height="300" width="500" alt="Our team working at MF Global Services" />
        </div>
      </section> */}

      <section className="aboutus-section">
        <h2>Our Mission</h2>
        <div className="aboutus-flex">
          <p>
            Our mission is to simplify corporate gifting with innovative, customizable solutions that elevate your brand. Whether you're welcoming new employees, rewarding performers, or building client relationships, every gift we create is designed to make an impact.
          </p>
          <img src="/assets/3.webp" height="300" width="500" alt="MF Global Services mission illustration" />
        </div>
      </section>

      <section className="aboutus-section">
        <h2>Why Choose Us?</h2>
        <div className="aboutus-flex">
          <ul>
            <li><strong>Customization:</strong> Tailor products with logos, messages, and premium packaging.</li>
            <li><strong>Quality:</strong> We source premium materials and follow strict quality checks.</li>
            <li><strong>Experience:</strong> Trusted by leading brands nationwide.</li>
            <li><strong>Eco-Friendly Options:</strong> Promote sustainability with our green gifting catalog.</li>
            <li><strong>End-to-End Service:</strong> From concept to delivery—we manage everything.</li>
          </ul>
          <img src="/assets/5.webp" height="300" width="500" alt="Reasons to choose MF Global Services" />
        </div>
      </section>

      <section className="aboutus-section">
        <h2>Trusted by Leading Brands</h2>
        <div className="aboutus-flex">
          <p>
            We have proudly partnered with 500+ corporate clients across industries such as technology, finance, healthcare, and education. Our reputation is built on trust, transparency, and timely delivery.
          </p>
          <img src="/assets/8.webp" height="300" width="500" alt="Corporate clients of MF Global Services" />
        </div>
      </section>

      <section className="aboutus-contact-cta">
        <h3>Looking to Create an Unforgettable Gifting Experience?</h3>
        <p>
          Get in touch today! Whether you're planning a large corporate campaign or a one-time luxury gift box, MF Global Services is your ideal gifting partner.
        </p>
        <a href="/contact" className="aboutus-btn" aria-label="Contact MF Global Services">
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
