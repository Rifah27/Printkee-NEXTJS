"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiAward,
  FiBriefcase,
  FiCheckCircle,
  FiChevronDown,
  FiGift,
  FiGlobe,
  FiHeadphones,
  FiLayers,
  FiPackage,
  FiPenTool,
  FiTruck,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { api, getPublicUrl } from "../lib/api";

const heroSlides = [
  {
    image: "/assets/banner1.webp",
    eyebrow: "Apparel & uniforms",
    title: "Branded merchandise that teams actually want to use.",
    copy: "Custom apparel, office essentials, tech gifts, hampers, bottles, bags, and event giveaways made for modern corporate gifting.",
    href: "/apparel-and-accessories",
  },
  {
    image: "/assets/banner3.webp",
    eyebrow: "Tech gifts",
    title: "Useful promotional products with sharp brand recall.",
    copy: "Build client, employee, and event kits with products that feel practical, premium, and ready for your logo.",
    href: "/technology-accessories",
  },
  {
    image: "/assets/banner2.webp",
    eyebrow: "Sustainable gifting",
    title: "Eco-aware choices for thoughtful brand moments.",
    copy: "Choose bamboo, cork, reusable, recycled, and durable gifting options for campaigns with a lighter footprint.",
    href: "/eco-products",
  },
];

const fallbackCategories = [
  {
    _id: "apparel",
    name: "Apparel & Accessories",
    slug: "apparel-and-accessories",
    image: "/assets/banner1.webp",
    description: "T-shirts, polos, caps, hats, shirts, jackets, and uniform essentials with logo printing or embroidery.",
  },
  {
    _id: "technology",
    name: "Technology Accessories",
    slug: "technology-accessories",
    image: "/assets/banner3.webp",
    description: "Power banks, speakers, chargers, desk tech, and practical gadgets for premium corporate gifting.",
  },
  {
    _id: "eco",
    name: "Eco Products",
    slug: "eco-products",
    image: "/assets/banner2.webp",
    description: "Cork, bamboo, jute, recycled stationery, and sustainable gift boxes for greener campaigns.",
  },
  {
    _id: "drinkware",
    name: "Drinkware",
    slug: "drink-ware",
    image: "/assets/banner4.webp",
    description: "Custom mugs, bottles, sippers, tumblers, and daily-use drinkware for employees and events.",
  },
];

const occasions = [
  {
    title: "Onboarding Kits",
    copy: "Welcome new hires with curated boxes that combine stationery, bottles, apparel, and desk-friendly gifts.",
    image: "/assets/onboarding.webp",
  },
  {
    title: "Festive Hampers",
    copy: "Diwali, New Year, Christmas, and celebration hampers with premium treats, packaging, and brand detailing.",
    image: "/assets/festive.webp",
  },
  {
    title: "Client Appreciation",
    copy: "Polished thank-you gifts for partners, clients, and associates who matter to your business.",
    image: "/assets/client.webp",
  },
  {
    title: "Events & Expos",
    copy: "Memorable giveaways for conferences, activations, exhibitions, launches, and promotional campaigns.",
    image: "/assets/conference.webp",
  },
];

const services = [
  { icon: FiGift, title: "Corporate gifting", copy: "Curated employee, client, and event gift programs built around your budget." },
  { icon: FiPenTool, title: "Custom branding", copy: "Logo printing, embroidery, engraving, and packaging support across product types." },
  { icon: FiZap, title: "Tech merchandise", copy: "Useful gadgets and accessories for teams, conferences, and premium campaigns." },
  { icon: FiLayers, title: "Custom kits", copy: "Mix apparel, stationery, drinkware, tech, and packaging into one branded box." },
  { icon: FiPackage, title: "Bulk sourcing", copy: "Reliable product selection and quantity support for large corporate orders." },
  { icon: FiTruck, title: "Pan-India delivery", copy: "Coordinated dispatch for teams, branches, events, and distributed gifting." },
];

const trustPoints = [
  { value: "1000+", label: "happy clients", copy: "Trusted by companies, schools, startups, and corporate teams." },
  { value: "Pan India", label: "shipping", copy: "Bulk gifting delivery support across cities and business locations." },
  { value: "Bulk", label: "order pricing", copy: "Quantity-friendly pricing for campaigns, events, and employee gifts." },
  { value: "Eco", label: "options", copy: "Sustainable materials and reusable products for conscious gifting." },
];

const industries = [
  { icon: FiBriefcase, label: "Corporate Offices" },
  { icon: FiZap, label: "Startups" },
  { icon: FiGlobe, label: "Automobile" },
  { icon: FiUsers, label: "Education" },
  { icon: FiHeadphones, label: "IT Companies" },
  { icon: FiAward, label: "Healthcare" },
];

const steps = [
  "Choose products",
  "Share logo & brief",
  "Approve mockup",
  "Get delivery",
];

const faqs = [
  {
    question: "What promotional products can I order?",
    answer: "You can order apparel, caps, bags, stationery, drinkware, tech accessories, trophies, hampers, welcome kits, and custom gift boxes.",
  },
  {
    question: "Do you support bulk corporate gifting?",
    answer: "Yes. Vorixa handles bulk orders for employees, clients, events, campaigns, schools, offices, and distributed teams.",
  },
  {
    question: "Can products be customized with my logo?",
    answer: "Yes. Products can be customized with printing, embroidery, engraving, labels, sleeves, inserts, or gift box branding depending on the item.",
  },
  {
    question: "Do you deliver outside Delhi NCR?",
    answer: "Yes. Vorixa supports shipping across India for corporate gifting and promotional merchandise orders.",
  },
];

const brandLogos = ["accenture", "amazon", "google", "microsoft", "nike"];

const resolveImage = (path) => {
  if (!path) return "";
  if (path.startsWith("/assets/")) return path;
  return getPublicUrl(path);
};

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);
  const [activeHero, setActiveHero] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    api
      .get("/category/categories")
      .then((res) => setCategories(Array.isArray(res.data) ? res.data : []))
      .catch(() => setCategories([]));

    api
      .get("/product/all", { params: { page: 1, limit: 4 } })
      .then((res) => setTrending(res.data.items || []))
      .catch(() => setTrending([]));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const visibleCategories = useMemo(() => {
    const source = categories.length ? categories : fallbackCategories;
    return source.slice(0, 6);
  }, [categories]);

  const hero = heroSlides[activeHero];

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__media" style={{ backgroundImage: `url(${hero.image})` }} />
        <div className="home-hero__shade" />
        <div className="container home-hero__inner">
          <div className="home-hero__copy">
            <p className="home-kicker">{hero.eyebrow}</p>
            <h1>{hero.title}</h1>
            <p>{hero.copy}</p>
            <div className="home-hero__actions">
              <Link href="/contact" className="home-btn home-btn--primary">
                Get a quote <FiArrowRight aria-hidden="true" />
              </Link>
              <Link href={hero.href} className="home-btn home-btn--ghost">
                Explore products
              </Link>
            </div>
          </div>

          <div className="home-hero__panel">
            <span>Corporate gifting made simple</span>
            <strong>From idea to branded delivery</strong>
            <div className="home-hero__mini-grid">
              <div><b>Logo</b><small>Printing</small></div>
              <div><b>Bulk</b><small>Orders</small></div>
              <div><b>India</b><small>Delivery</small></div>
            </div>
          </div>

          <div className="home-hero__dots" aria-label="Featured homepage slides">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.eyebrow}
                aria-label={`Show ${slide.eyebrow}`}
                className={index === activeHero ? "is-active" : ""}
                onClick={() => setActiveHero(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home-band home-band--brands">
        <div className="container home-brand-row">
          <span>Trusted for branded merchandise</span>
          {brandLogos.map((brand) => (
            <img key={brand} src={`/assets/${brand}.webp`} alt={`${brand} logo`} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="home-section__head">
            <p className="home-kicker">Product categories</p>
            <h2>Browse custom gifting categories</h2>
            <p>Explore Vorixa's core ranges for promotional items, team merchandise, and corporate gifting.</p>
          </div>
          <div className="home-category-grid">
            {visibleCategories.map((category) => (
              <Link href={`/${category.slug}`} className="home-category-card" key={category._id || category.slug}>
                <img src={resolveImage(category.image)} alt={category.name} />
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description || "Explore premium products and custom branding options for your next campaign."}</p>
                </div>
                <FiArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--warm">
        <div className="container">
          <div className="home-section__head home-section__head--split">
            <div>
              <p className="home-kicker">Shop by occasion</p>
              <h2>Ready-made ideas for every business moment</h2>
            </div>
            <p>Use these popular gifting routes as a starting point, then customize products, packaging, and branding around your brief.</p>
          </div>
          <div className="home-occasion-grid">
            {occasions.map((occasion) => (
              <article className="home-occasion-card" key={occasion.title}>
                <img src={occasion.image} alt={occasion.title} />
                <div>
                  <h3>{occasion.title}</h3>
                  <p>{occasion.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="home-section__head">
            <p className="home-kicker">Services</p>
            <h2>Everything needed to build branded merchandise</h2>
          </div>
          <div className="home-service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="home-service-card" key={service.title}>
                  <Icon aria-hidden="true" />
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-proof">
        <div className="container home-proof__inner">
          <div>
            <p className="home-kicker">Why Vorixa</p>
            <h2>Built for bulk orders, brand finish, and dependable delivery.</h2>
            <Link href="/customize" className="home-btn home-btn--primary">
              Start customizing <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="home-proof__grid">
            {trustPoints.map((point) => (
              <article key={point.label}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
                <p>{point.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container home-industries">
          <div className="home-section__head">
            <p className="home-kicker">Industries</p>
            <h2>Gifting programs for many kinds of teams</h2>
          </div>
          <div className="home-industry-grid">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <article key={industry.label}>
                  <Icon aria-hidden="true" />
                  <span>{industry.label}</span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-section home-section--process">
        <div className="container home-process">
          <div>
            <p className="home-kicker">How it works</p>
            <h2>A clean order flow from selection to delivery</h2>
          </div>
          <div className="home-process__steps">
            {steps.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <FiCheckCircle aria-hidden="true" />
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container home-faq-layout">
          <div>
            <p className="home-kicker">FAQ</p>
            <h2>Questions before your first bulk order?</h2>
            <p>Here are the practical answers most teams need before requesting a quote.</p>
          </div>
          <div className="home-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article className="home-faq" key={faq.question}>
                  <button onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
                    <span>{faq.question}</span>
                    <FiChevronDown aria-hidden="true" />
                  </button>
                  {isOpen && <p>{faq.answer}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container home-cta__inner">
          <div>
            <p className="home-kicker">Need a custom quote?</p>
            <h2>Tell us the occasion, quantity, budget, and logo requirement.</h2>
            <p>Vorixa can help shortlist products, build kits, finalize branding, and coordinate delivery.</p>
          </div>
          <Link href="/contact" className="home-btn home-btn--dark">
            Talk to a gifting expert <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      {trending.length > 0 && (
        <section className="home-section home-section--compact">
          <div className="container">
            <div className="home-section__head">
              <p className="home-kicker">Catalog picks</p>
              <h2>Recently added products</h2>
            </div>
            <div className="home-product-strip">
              {trending.map((product) => (
                <Link href="#" key={product._id} className="home-product-pill">
                  <span>{product.name}</span>
                  <b>Rs. {product.salePrice || product.price || "Quote"}</b>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
