import React from "react";
import "../styles/Testimonials.css";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Ananya Sharma",
    position: "HR Manager",
    company: "TechNova Pvt Ltd",
    review:
      "Printkee made our festive gifting process effortless and stylish. Great support and timely delivery!",
    logo: "/logos/technova.webp",
  },
  {
    name: "Rajeev Bansal",
    position: "Procurement Head",
    company: "FinEdge Solutions",
    review:
      "The onboarding kits were beautifully packed and reflected our brand perfectly. Highly recommended!",
    logo: "/logos/finedge.webp",
  },
  {
    name: "Sonal Mehta",
    position: "Marketing Lead",
    company: "GreenHive",
    review:
      "Our conference giveaways were a hit! Sleek tech gifts, fast execution, and custom branding was top-notch.",
    logo: "/logos/greenhive.webp",
  },
];

const brandLogos = [
  { src: "/assets/accenture.webp", alt: "Accenture" },
  { src: "/assets/amazon.webp", alt: "Amazon" },
  { src: "/assets/google.webp", alt: "Google" },
  { src: "/assets/microsoft.webp", alt: "Microsoft" },
  { src: "/assets/nike.webp", alt: "Nike" },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" className="section-title-2">
        What Our Clients Say
      </h2>

      <p className="section-subtitle-2">
        Hear from our happy clients about their experience with Printkee.
      </p>

      <div className="testimonials-container">
        {testimonials.map((item, index) => (
          <figure
            key={index}
            className="testimonial-card"
            aria-label={`Testimonial from ${item.name}`}
          >
            <FaQuoteLeft className="quote-icon" aria-hidden="true" />

            <blockquote className="testimonial-text">"{item.review}"</blockquote>

            <figcaption className="testimonial-footer">
              <h3 className="client-name">{item.name}</h3>
              <p className="client-role">
                {item.position}, {item.company}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="brand-logos-strip-2">
        <h3 className="brand-title-2">Trusted by Leading Brands</h3>

        <div className="brands-logo-container-2">
          {brandLogos.map((brand, index) => (
            <img
              key={index}
              src={brand.src}
              alt={`${brand.alt} logo`}
              className="brand-logo-2"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
