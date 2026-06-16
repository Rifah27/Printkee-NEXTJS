import Link from "next/link";
import {
  FiArrowRight,
  FiCheckCircle,
  FiEdit3,
  FiPackage,
  FiSend,
  FiTruck,
} from "react-icons/fi";

const productTypes = [
  {
    slug: "apparel",
    label: "Apparel & Uniforms",
    title: "Custom t-shirts, polos, caps, shirts, and winter wear",
    image: "/assets/categories/apparel.webp",
  },
  {
    slug: "welcome-kits",
    label: "Welcome Kits",
    title: "Employee onboarding boxes with branded daily-use products",
    image: "/assets/products/welcomekits/1.webp",
  },
  {
    slug: "drinkware",
    label: "Drinkware",
    title: "Printed bottles, mugs, sippers, and bamboo drinkware",
    image: "/assets/categories/drinkware.webp",
  },
  {
    slug: "bags",
    label: "Bags & Travel",
    title: "Backpacks, tote bags, duffle bags, and event carry kits",
    image: "/assets/categories/bags.webp",
  },
  {
    slug: "tech",
    label: "Tech Accessories",
    title: "Power banks, wireless chargers, mouse pads, and desk tech",
    image: "/assets/categories/technology.webp",
  },
  {
    slug: "eco-gifts",
    label: "Eco Gifts",
    title: "Cork, bamboo, reusable, and sustainable corporate gifts",
    image: "/assets/categories/ecoproducts.webp",
  },
];

const steps = [
  {
    icon: FiEdit3,
    title: "Share your brief",
    copy: "Tell us the product type, quantity, logo placement, budget, and delivery timeline.",
  },
  {
    icon: FiPackage,
    title: "Get curated options",
    copy: "Our team shortlists materials, branding methods, packaging, and pricing for your order.",
  },
  {
    icon: FiCheckCircle,
    title: "Approve artwork",
    copy: "Review mockups before production so your logo, colors, and message look right.",
  },
  {
    icon: FiTruck,
    title: "Receive your order",
    copy: "We coordinate production, quality checks, packing, and delivery across India",
  },
];

const brandingMethods = [
  "Logo printing",
  "Embroidery",
  "Laser engraving",
  "UV printing",
  "Custom packaging",
  "Gift box curation",
];

export default function CustomizePage() {
  return (
    <main className="customize-page">
      <section className="customize-hero">
        <div className="container customize-hero__inner">
          <div className="customize-hero__copy">
            <p className="customize-kicker">Customize with PrintKee</p>
            <h1>Build branded merchandise your team will actually use.</h1>
            <p>
              Create custom corporate gifts, employee kits, event merchandise,
              and promotional products with logo branding, packaging support,
              and bulk delivery planning.
            </p>
            <div className="customize-hero__actions">
              <Link href="/customize/welcome-kits" className="customize-btn customize-btn--primary">
                Start a request <FiArrowRight aria-hidden="true" />
              </Link>
              <Link href="/contact" className="customize-btn customize-btn--ghost">
                Talk to sales
              </Link>
            </div>
            <div className="customize-hero__badge">
              <span>Instant brief support</span>
              <p>Our team helps you turn product ideas into branded gifting recommendations with fast quotes and curated options.</p>
            </div>
          </div>

          <div className="customize-hero__panel">
            <img src="/assets/banner-sect.webp" alt="Custom corporate gifting products" />
            <div>
              <span>Popular brief</span>
              <strong>100+ branded gifts for employees, clients, and events</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="customize-section">
        <div className="container">
          <div className="customize-section__head">
            <p className="customize-kicker">Choose a starting point</p>
            <h2>Customize by product type</h2>
            <p>
              Start with the product family closest to your campaign. You can
              still mention multiple items in the request form.
            </p>
          </div>

          <div className="customize-product-grid">
            {productTypes.map((item) => (
              <Link key={item.slug} href={`/customize/${item.slug}`} className="customize-product-card">
                <img src={item.image} alt={item.label} />
                <div>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>Request options <FiArrowRight aria-hidden="true" /></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="customize-section customize-section--warm">
        <div className="container customize-process">
          <div className="customize-section__head">
            <p className="customize-kicker">How customization works</p>
            <h2>From logo file to delivered products</h2>
          </div>

          <div className="customize-step-grid">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="customize-section">
        <div className="container customize-methods">
          <div>
            <p className="customize-kicker">Branding options</p>
            <h2>Pick the right finish for your product.</h2>
            <p>
              PrintKee supports common corporate branding needs including logo
              printing, engraving, embroidery, full-color artwork, and premium
              kit packaging.
            </p>
          </div>
          <div className="customize-method-list">
            {brandingMethods.map((method) => (
              <span key={method}>
                <FiCheckCircle aria-hidden="true" /> {method}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="customize-cta">
        <div className="container customize-cta__inner">
          <div>
            <p className="customize-kicker">Have a custom brief?</p>
            <h2>Send the details and we will recommend products, finishes, and packaging.</h2>
          </div>
          <Link href="/customize/custom-brief" className="customize-btn customize-btn--dark">
            Send brief <FiSend aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
