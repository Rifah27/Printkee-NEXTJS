import React from "react";
import "../styles/OurServices.css";
import {
  FaGift,
  FaRecycle,
  FaRegLightbulb,
  FaUserTie,
  FaLaptop,
  FaRegClock,
} from "react-icons/fa";

const services = [
  {
    icon: <FaGift aria-hidden="true" />,
    title: "Corporate Gifting Solutions",
    description:
      "Enhance your brand presence with our premium corporate gifting solutions. From employee appreciation gifts to client giveaways and event merchandise, we create thoughtful and high-quality promotional items that strengthen business relationships and build trust.",
    keywords:
      "Corporate Gifts Delhi NCR, Business Promotional Products, Client Gifting Ideas",
  },
  {
    icon: <FaRecycle aria-hidden="true" />,
    title: "Eco-Friendly Promotional Products",
    description:
      "Go green with our eco-friendly promotional products! Choose from bamboo bottles, reusable jute bags, recycled notebooks, and other sustainable items designed to support your company’s green initiatives and showcase your commitment to the environment.",
    keywords:
      "Eco-Friendly Corporate Gifts, Sustainable Promotional Items, Green Gifting Solutions",
  },
  {
    icon: <FaUserTie aria-hidden="true" />,
    title: "Apparel & Uniform Customization",
    description:
      "Stand out with customized branded apparel – including t-shirts, caps, polo shirts, and jackets – printed or embroidered with your company logo. Perfect for team events, promotions, and internal branding campaigns.",
    keywords:
      "Custom T-Shirts in Delhi NCR, Branded Apparel Manufacturer, Logo Printed Uniforms",
  },
  {
    icon: <FaLaptop aria-hidden="true" />,
    title: "Tech Accessories & Gadgets",
    description:
      "Upgrade your brand with useful tech promotional products like power banks, Bluetooth speakers, USB drives, and wireless chargers. Modern, practical, and perfect for impressing clients and employees alike.",
    keywords:
      "Promotional Tech Gadgets, Custom Branded Tech Items, Corporate Tech Gifts",
  },
  {
    icon: <FaRegClock aria-hidden="true" />,
    title: "Executive & Desktop Gifts",
    description:
      "Choose from a wide range of premium executive gifts like diaries, pens, desk organizers, and clocks. Ideal for creating a professional touch in your corporate gifting strategy.",
    keywords:
      "Executive Gifts Delhi NCR, Desktop Promotional Products, Office Branding Items",
  },
  {
    icon: <FaRegLightbulb aria-hidden="true" />,
    title: "Fully Customizable Gift Kits",
    description:
      "Create your own branded gift box with our fully customizable kits. Mix and match products like apparel, stationery, and accessories to create the perfect gift set for employees, clients, or event participants.",
    keywords:
      "Custom Gift Kits, Corporate Gift Boxes, Employee Gift Sets",
  },
];

const OurServices = () => {
  return (
    <section
      className="our-services"
      aria-labelledby="our-services-heading"
    >
      <h2 id="our-services-heading" className="section-title">
        Our Services
      </h2>

      <p className="section-description">
        Explore our diverse range of custom promotional products and corporate gifting
        solutions designed to boost your brand visibility and leave a lasting impression
        on your clients.
      </p>

      <div className="services-grid">
        {services.map((service, index) => (
          <article
            className="service-card"
            key={index}
            aria-labelledby={`service-title-${index}`}
            data-keywords={service.keywords}
          >
            <div className="service-icon">{service.icon}</div>

            <h3 id={`service-title-${index}`} className="service-title">
              {service.title}
            </h3>

            <p className="service-description">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
