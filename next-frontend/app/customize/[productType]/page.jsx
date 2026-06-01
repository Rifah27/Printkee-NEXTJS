"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiMail,
  FiPackage,
  FiSend,
} from "react-icons/fi";
import { api } from "../../../lib/api";

const productContent = {
  apparel: {
    label: "Apparel & Uniforms",
    headline: "Customize apparel for teams, events, and brand campaigns.",
    image: "/assets/categories/apparel.webp",
    ideas: ["Polo t-shirts", "Round neck t-shirts", "Caps", "Corporate shirts"],
  },
  "welcome-kits": {
    label: "Welcome Kits",
    headline: "Create employee welcome kits with practical branded products.",
    image: "/assets/products/welcomekits/1.webp",
    ideas: ["Notebook", "Bottle", "Pen", "Tech accessory", "Custom box"],
  },
  drinkware: {
    label: "Drinkware",
    headline: "Brand bottles, mugs, and sippers for daily office use.",
    image: "/assets/categories/drinkware.webp",
    ideas: ["Sipper bottles", "Ceramic mugs", "Coffee mugs", "Bamboo bottles"],
  },
  bags: {
    label: "Bags & Travel",
    headline: "Design durable bags for conferences, employees, and giveaways.",
    image: "/assets/categories/bags.webp",
    ideas: ["Backpacks", "Tote bags", "Duffle bags", "Foldable bags"],
  },
  tech: {
    label: "Tech Accessories",
    headline: "Customize useful tech gifts with sharp logo branding.",
    image: "/assets/categories/technology.webp",
    ideas: ["Power banks", "Wireless chargers", "Mouse pads", "Desk accessories"],
  },
  "eco-gifts": {
    label: "Eco Gifts",
    headline: "Build sustainable gifting with cork, bamboo, and reusable products.",
    image: "/assets/categories/ecoproducts.webp",
    ideas: ["Cork desk items", "Bamboo bottles", "Cork boxes", "Reusable bags"],
  },
  "custom-brief": {
    label: "Custom Brief",
    headline: "Share your gifting brief and let our team curate the right options.",
    image: "/assets/banner-sect2.webp",
    ideas: ["Employee gifts", "Client gifts", "Events", "Festive hampers"],
  },
};

const brandingOptions = [
  "Logo printing",
  "Embroidery",
  "Laser engraving",
  "UV printing",
  "Custom packaging",
  "Need recommendation",
];

const budgetOptions = [
  "Under Rs. 250 / piece",
  "Rs. 250 - Rs. 750 / piece",
  "Rs. 750 - Rs. 1500 / piece",
  "Premium / custom budget",
];

const normalizeLabel = (slug) =>
  slug
    ?.split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "Custom Products";

export default function CustomizeProductPage({ params }) {
  const content = useMemo(
    () =>
      productContent[params.productType] || {
        label: normalizeLabel(params.productType),
        headline: `Customize ${normalizeLabel(params.productType)} for your brand.`,
        image: "/assets/banner-sect.webp",
        ideas: ["Logo branding", "Bulk orders", "Packaging", "Delivery planning"],
      },
    [params.productType]
  );

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    budget: budgetOptions[1],
    branding: brandingOptions[0],
    deadline: "",
    requirement: "",
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const requirement = [
      `Product type: ${content.label}`,
      `Quantity: ${form.quantity || "Not specified"}`,
      `Budget: ${form.budget}`,
      `Branding method: ${form.branding}`,
      `Deadline: ${form.deadline || "Flexible"}`,
      `Details: ${form.requirement || "Please recommend suitable options."}`,
    ].join("\n");

    try {
      await api.post("/send-email", {
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        requirement,
      });

      setStatus({
        type: "success",
        message: "Your customization request has been sent. Our team will contact you shortly.",
      });
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        quantity: "",
        budget: budgetOptions[1],
        branding: brandingOptions[0],
        deadline: "",
        requirement: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Unable to send the request right now. Please try again or contact sales directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="customize-page">
      <section className="customize-detail-hero">
        <div className="container customize-detail-hero__inner">
          <div>
            <Link href="/customize" className="customize-back-link">
              <FiArrowLeft aria-hidden="true" /> Back to customize
            </Link>
            <p className="customize-kicker">{content.label}</p>
            <h1>{content.headline}</h1>
            <p>
              Tell us what you need and PrintKee will help with product
              selection, branding method, mockup approval, packaging, and
              delivery planning.
            </p>
            <div className="customize-idea-row">
              {content.ideas.map((idea) => (
                <span key={idea}>{idea}</span>
              ))}
            </div>
          </div>
          <img src={content.image} alt={content.label} />
        </div>
      </section>

      <section className="customize-section">
        <div className="container customize-request-layout">
          <aside className="customize-request-sidebar">
            <p className="customize-kicker">What you get</p>
            <h2>Branding support from brief to delivery</h2>
            <ul>
              <li>
                <FiCheckCircle aria-hidden="true" /> Product shortlist based on your quantity and budget
              </li>
              <li>
                <FiCheckCircle aria-hidden="true" /> Logo placement and print method recommendation
              </li>
              <li>
                <FiCheckCircle aria-hidden="true" /> Artwork proof before production
              </li>
              <li>
                <FiCheckCircle aria-hidden="true" /> Bulk packaging and pan-India delivery coordination
              </li>
            </ul>
          </aside>

          <article className="customize-form-card">
            <div className="customize-form-card__head">
              <FiMail aria-hidden="true" />
              <div>
                <p className="customize-kicker">Request a quote</p>
                <h2>Share your customization details</h2>
              </div>
            </div>

            {status && (
              <p className={`customize-form-status customize-form-status--${status.type}`}>
                {status.message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="customize-form">
              <div className="customize-form__grid">
                <label>
                  Name
                  <input name="name" value={form.name} onChange={updateField} required placeholder="Your name" />
                </label>
                <label>
                  Company
                  <input name="company" value={form.company} onChange={updateField} required placeholder="Company name" />
                </label>
                <label>
                  Email
                  <input name="email" value={form.email} onChange={updateField} type="email" required placeholder="name@company.com" />
                </label>
                <label>
                  Phone
                  <input name="phone" value={form.phone} onChange={updateField} required placeholder="+91 98765 43210" />
                </label>
                <label>
                  Quantity
                  <input name="quantity" value={form.quantity} onChange={updateField} inputMode="numeric" placeholder="100, 500, 1000..." />
                </label>
                <label>
                  Deadline
                  <input name="deadline" value={form.deadline} onChange={updateField} type="date" />
                </label>
                <label>
                  Budget
                  <select name="budget" value={form.budget} onChange={updateField}>
                    {budgetOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Branding
                  <select name="branding" value={form.branding} onChange={updateField}>
                    {brandingOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Requirement
                <textarea
                  name="requirement"
                  value={form.requirement}
                  onChange={updateField}
                  rows="5"
                  placeholder="Tell us product preferences, logo colors, packaging, event date, delivery city, or any reference idea."
                />
              </label>

              <button type="submit" className="customize-btn customize-btn--primary" disabled={isSubmitting}>
                {isSubmitting ? "Sending request..." : "Send customization request"}
                {isSubmitting ? <FiPackage aria-hidden="true" /> : <FiSend aria-hidden="true" />}
              </button>
            </form>
          </article>
        </div>
      </section>

      <section className="customize-cta">
        <div className="container customize-cta__inner">
          <div>
            <p className="customize-kicker">Need more ideas?</p>
            <h2>Explore all product categories before finalizing your custom brief.</h2>
          </div>
          <Link href="/" className="customize-btn customize-btn--dark">
            View categories <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
