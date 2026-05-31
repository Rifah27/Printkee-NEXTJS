import React, { useState } from 'react';
import '../styles/ContactUs.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirement: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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

      alert("Thank you! Your message has been sent.");
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        requirement: '',
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const canonicalUrl = "https://printkee.com/contact";

  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Us | MF Global Services</title>
        <meta
          name="description"
          content="Get in touch with MF Global Services for customized corporate gifting solutions. Reach out via our contact form, email, or phone."
        />
        <meta
          name="keywords"
          content="contact MF Global Services, corporate gifting enquiry, Printkee contact, gifting solutions India"
        />

        {/* ✅ Canonical Tag */}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="contact-hero">
        <h1>Let's Talk Business</h1>
        <p>Have questions or want to discuss a custom gifting solution? We'd love to hear from you.</p>
      </div>

      <div className="contact-content">
        <section className="contact-form">
          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit} aria-label="Contact form">
            
            <label htmlFor="contact-name">Your Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
            />

            <label htmlFor="contact-company">Company Name</label>
            <input
              id="contact-company"
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
            />

            <label htmlFor="contact-email">Your Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
            />

            <label htmlFor="contact-phone">Phone Number</label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />

            <label htmlFor="contact-requirement">Your Requirement</label>
            <textarea
              id="contact-requirement"
              name="requirement"
              rows="5"
              required
              value={formData.requirement}
              onChange={handleChange}
              placeholder="Your Requirement"
            ></textarea>

            <button type="submit" aria-label="Send message">
              Send Message
            </button>
          </form>
        </section>

        <section className="contact-details">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> sales@printkee.com</p>
          <p><strong>Phone:</strong> +91 8750708222</p>
          <p><strong>Address:</strong> F90/1, Beside ESIC Hospital, Okhla Industrial Area Phase 1, New Delhi – 110020, India</p>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
