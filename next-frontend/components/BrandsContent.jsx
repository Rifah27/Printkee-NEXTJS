import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiMessageSquare } from "react-icons/fi";
import { brandRoutes } from "../lib/brandRoutes";
import {
  brandIndustries,
  brandPartners,
  brandTestimonials,
  brandTrustPoints,
} from "../lib/brandContent";

export default function BrandsContent() {
  return (
    <main className="brands-page">
      <section className="brands-hero">
        <div className="container brands-hero__inner">
          <div className="brands-hero__copy">
            <p className="brands-kicker">Trusted by Leading Brands</p>
            <h1>
              Trusted brand solutions<br />for your business.
            </h1>
            <p>
              PrintKee helps companies create high-quality custom promotional
              items, branded merchandise, employee welcome kits, festive hampers,
              event giveaways, and premium corporate gifts across India.
            </p>
            <div className="brands-hero__actions">
              <Link href="/contact" className="brands-btn brands-btn--primary">
                Request a quote <FiArrowRight aria-hidden="true" />
              </Link>
              <Link href="/customize" className="brands-btn brands-btn--ghost">
                Start customizing
              </Link>
            </div>
          </div>

          <div className="brands-hero__panel" aria-label="PrintKee trust summary">
            <strong>1000+</strong>
            <span>happy clients served with custom branding, bulk order support, and pan-India delivery.</span>
          </div>
        </div>
      </section>

      <section className="brands-logo-band" aria-label="Trusted brand logos">
        <div className="container brands-logo-band__inner">
          <span>Trusted by leading brands</span>
          <div>
            {brandPartners.map((brand) => (
              <img key={brand.name} src={brand.logo} alt={`${brand.name} logo`} />
            ))}
          </div>
        </div>
      </section>

      <section className="brands-section brands-list-section">
        <div className="container">
          <div className="brands-section__head">
            <p className="brands-kicker">Brands We Offer</p>
            <h2>Browse premium brand partners for corporate gifting and bulk orders.</h2>
            <p>
              Choose from trusted labels across apparel, travel, tech, and lifestyle products. Each brand page has dedicated catalogue support, bulk order guidance, and custom gifting options.
            </p>
          </div>

          <div className="brands-list-grid">
            {brandRoutes.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="brand-card">
                <img src={brand.logo} alt={`${brand.name} logo`} />
                <strong>{brand.name}</strong>
                <p>{brand.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="brands-section">
        <div className="container">
          <div className="brands-section__head">
            <p className="brands-kicker">Why PrintKee</p>
            <h2>Built for customized promotional products at business scale.</h2>
            <p>
              The live PrintKee promise is simple: strong product quality,
              dependable delivery, custom branding, and quantity-friendly pricing
              for corporate gifting campaigns.
            </p>
          </div>

          <div className="brands-proof-grid">
            {brandTrustPoints.map((point) => (
              <article key={point.title}>
                <div>
                  <strong>{point.value}</strong>
                  <span>{point.label}</span>
                </div>
                <h3>{point.title}</h3>
                <p>{point.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brands-section brands-section--warm">
        <div className="container brands-industries">
          <div>
            <p className="brands-kicker">Industries We Serve</p>
            <h2>Gifting programs for teams, schools, startups, and offices.</h2>
          </div>
          <div className="brands-industry-list">
            {brandIndustries.map((industry) => (
              <span key={industry}>
                <FiCheckCircle aria-hidden="true" />
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="brands-section">
        <div className="container">
          <div className="brands-section__head">
            <p className="brands-kicker">What Our Clients Say</p>
            <h2>Reliable execution for gifting moments that matter.</h2>
          </div>
          <div className="brands-testimonial-grid">
            {brandTestimonials.map((testimonial) => (
              <article key={testimonial.name}>
                <FiMessageSquare aria-hidden="true" />
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brands-cta">
        <div className="container brands-cta__inner">
          <div>
            <p className="brands-kicker">Need 100+ Gifts?</p>
            <h2>Let&apos;s customize something perfect for your brand.</h2>
          </div>
          <Link href="/contact" className="brands-btn brands-btn--dark">
            Talk to a gifting expert <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
