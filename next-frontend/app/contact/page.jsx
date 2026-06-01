"use client";

import { useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { api } from "../../lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    requirement: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/send-email", {
        ...formData,
        message: formData.requirement,
      });

      setStatus({ type: "success", message: "Thank you! Your message has been sent." });
      setFormData({ name: "", company: "", email: "", phone: "", requirement: "" });
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus({ type: "error", message: "Something went wrong. Please try again later." });
    }
  };

  return (
    <main className="printkee-page contact-redesign">
      <section className="contact-redesign__hero">
        <div className="container">
          <p>Contact Us</p>
          <h1>Let&apos;s Talk Business</h1>
          <span>Have questions or want to discuss a custom gifting solution? We&apos;d love to hear from you.</span>
        </div>
      </section>

      <section className="contact-redesign__body">
        <div className="container contact-redesign__grid">
          <form className="contact-redesign__form" onSubmit={handleSubmit} aria-label="Contact form">
            <div className="contact-redesign__form-head">
              <p>Send Us a Message</p>
              <h2>Send Us a Message</h2>
            </div>

            {status && <div className={`contact-redesign__status contact-redesign__status--${status.type}`}>{status.message}</div>}

            <div className="contact-redesign__field-row">
              <label htmlFor="contact-name">Your Name</label>
              <input id="contact-name" type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Your Name" />
            </div>

            <div className="contact-redesign__field-row">
              <label htmlFor="contact-company">Company Name</label>
              <input id="contact-company" type="text" name="company" required value={formData.company} onChange={handleChange} placeholder="Company Name" />
            </div>

            <div className="contact-redesign__field-row">
              <label htmlFor="contact-email">Your Email</label>
              <input id="contact-email" type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Your Email" />
            </div>

            <div className="contact-redesign__field-row">
              <label htmlFor="contact-phone">Phone Number</label>
              <input id="contact-phone" type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
            </div>

            <div className="contact-redesign__field-row contact-redesign__field-row--wide">
              <label htmlFor="contact-requirement">Your Requirement</label>
              <textarea id="contact-requirement" name="requirement" rows="5" required value={formData.requirement} onChange={handleChange} placeholder="Your Requirement" />
            </div>

            <button type="submit" aria-label="Send message">Send Message</button>
          </form>

          <aside className="contact-redesign__details">
            <p>Contact Information</p>
            <h2>Contact Information</h2>
            <div>
              <FiMail aria-hidden="true" />
              <span><strong>Email:</strong> sales@printkee.com</span>
            </div>
            <div>
              <FiPhone aria-hidden="true" />
              <span><strong>Phone:</strong> +91 8750708222</span>
            </div>
            <div>
              <FiMapPin aria-hidden="true" />
              <span><strong>Address:</strong> F90/1, Beside ESIC Hospital, Okhla Industrial Area Phase 1, New Delhi - 110020, India</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
