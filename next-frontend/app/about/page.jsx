import Link from "next/link";
import { FiCheck } from "react-icons/fi";

const aboutText = `Vorixa is your trusted destination for custom corporate gifting and
promotional merchandise, designed to help brands stand out and leave a
lasting impression. We specialize in high-quality, customized products that
align perfectly with your brand identity and business goals.
With a strong focus on creativity, quality, and reliability, Vorixa works with
corporates, startups, educational institutions, and event organizers to
deliver end-to-end branding solutions. From product selection and
customization to production and on-time delivery, we ensure a smooth and
professional experience at every step.
Our extensive product range includes custom apparel, bags, drinkware,
eco-friendly products, office and writing essentials, technology accessories,
trophies, and curated welcome kits. Whether it's employee onboarding,
corporate events, client gifting, promotional campaigns, or brand
activations, Vorixa provides solutions that make an impact.
At Vorixa, we believe corporate gifting is more than just a product—it's a
powerful branding tool. Our commitment to premium quality, attention to
detail, and customer satisfaction has made us a preferred partner for
businesses across India.
Let Vorixa help you transform your brand ideas into memorable,
customized experiences.`;

const points = [
  ["Customization:", "Tailor products with logos, messages, and premium packaging."],
  ["Quality:", "We source premium materials and follow strict quality checks."],
  ["Experience:", "Trusted by leading brands nationwide."],
  ["Eco-Friendly Options:", "Promote sustainability with our green gifting catalog."],
  ["End-to-End Service:", "From concept to delivery—we manage everything."],
];

export default function AboutPage() {
  return (
    <main className="vorixa-page about-redesign">
      <section className="about-redesign__hero">
        <div className="container about-redesign__hero-grid">
          <div className="about-redesign__copy">
            <p>About Vorixa</p>
            <h1>About Vorixa</h1>
            <div className="about-redesign__text">
              {aboutText.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </div>
          <div className="about-redesign__visual">
            <img src="/assets/1.webp" alt="Corporate Gifting by MF Global Services" />
          </div>
        </div>
      </section>

      <section className="about-redesign__mission">
        <div className="container about-redesign__mission-grid">
          <img src="/assets/3.webp" alt="MF Global Services mission illustration" />
          <div>
            <p>Our Mission</p>
            <h2>Our Mission</h2>
            <span>
              Our mission is to simplify corporate gifting with innovative, customizable solutions that elevate your brand. Whether you&apos;re welcoming new employees, rewarding performers, or building client relationships, every gift we create is designed to make an impact.
            </span>
          </div>
        </div>
      </section>

      <section className="about-redesign__choose">
        <div className="container about-redesign__choose-grid">
          <div>
            <p>Why Choose Us?</p>
            <h2>Why Choose Us?</h2>
            <div className="about-redesign__points">
              {points.map(([label, text]) => (
                <article key={label}>
                  <FiCheck aria-hidden="true" />
                  <span><strong>{label}</strong> {text}</span>
                </article>
              ))}
            </div>
          </div>
          <img src="/assets/5.webp" alt="Reasons to choose MF Global Services" />
        </div>
      </section>

      <section className="about-redesign__trusted">
        <div className="container about-redesign__trusted-grid">
          <img src="/assets/8.webp" alt="Corporate clients of MF Global Services" />
          <div>
            <p>Trusted by Leading Brands</p>
            <h2>Trusted by Leading Brands</h2>
            <span>
              We have proudly partnered with 500+ corporate clients across industries such as technology, finance, healthcare, and education. Our reputation is built on trust, transparency, and timely delivery.
            </span>
          </div>
        </div>
      </section>

      <section className="about-redesign__cta">
        <div className="container">
          <h3>Looking to Create an Unforgettable Gifting Experience?</h3>
          <p>
            Get in touch today! Whether you&apos;re planning a large corporate campaign or a one-time luxury gift box, MF Global Services is your ideal gifting partner.
          </p>
          <Link href="/contact">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
