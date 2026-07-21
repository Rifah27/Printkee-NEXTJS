"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiSend } from "react-icons/fi";

export default function CustomBriefPage() {
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    product: "",
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="customize-page">
      <section className="customize-hero">
        <div className="container customize-hero__inner">
          <div className="customize-hero__copy">
            <p className="customize-kicker">Customize with Vorixa</p>
            <h1>Share your custom brief and we’ll recommend the best branded products.</h1>
            <p>
              Tell us your target audience, quantities, logo needs, packaging preferences, and delivery timeline.
            </p>
            <div className="customize-hero__actions">
              <Link href="/customize" className="customize-btn customize-btn--ghost">
                Back to customize
              </Link>
              <Link href="/contact" className="customize-btn customize-btn--primary">
                Contact sales <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="customize-section">
        <div className="container customize-form-card">
          <div className="customize-form-card__head">
            <div>
              <p className="customize-kicker">Custom brief</p>
              <h2>Tell us what you need and we’ll curate the right product recommendations.</h2>
            </div>
            <FiSend aria-hidden="true" />
          </div>

          {submitted && (
            <div className="customize-form-status customize-form-status--success">
              Thanks! Your request is ready. We will review it and follow up shortly.
            </div>
          )}

          <form className="customize-form" onSubmit={handleSubmit}>
            <div className="customize-form__grid">
              <label>
                Your name
                <input
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                />
              </label>

              <label>
                Company / brand
                <input
                  name="company"
                  type="text"
                  value={formState.company}
                  onChange={handleChange}
                  placeholder="Acme Events"
                />
              </label>

              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="team@acme.com"
                />
              </label>

              <label>
                Product type
                <input
                  name="product"
                  type="text"
                  value={formState.product}
                  onChange={handleChange}
                  placeholder="T-shirts, mugs, caps, kits"
                />
              </label>

              <label>
                Estimated quantity
                <input
                  name="quantity"
                  type="text"
                  value={formState.quantity}
                  onChange={handleChange}
                  placeholder="500+"
                />
              </label>
            </div>

            <label>
              Brief details
              <textarea
                name="message"
                rows="6"
                value={formState.message}
                onChange={handleChange}
                placeholder="Add logo placement, colors, deadlines, artwork availability, and packaging needs."
              />
            </label>

            <button type="submit" className="customize-btn customize-btn--primary">
              Send brief
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
