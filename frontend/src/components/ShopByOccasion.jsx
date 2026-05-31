import React from "react";
import "../styles/ShopByOccasion.css";

import onboardingImg from "/assets/onboarding.webp";
import festiveImg from "/assets/festive.webp";
import clientImg from "/assets/client.webp";
import conferenceImg from "/assets/conference.webp";

const occasions = [
  {
    id: 1,
    title: "Welcome Onboard Kits",
    description:
      "Kickstart new employee journeys with thoughtfully designed employee welcome kits. Our personalized onboarding gift boxes include branded stationery, eco-friendly drinkware, tech accessories, and customized merchandise that reflect your company culture.",
    image: onboardingImg,
    cta: "Explore Kits",
  },
  {
    id: 2,
    title: "Festive Celebration Hampers",
    description:
      "Celebrate special occasions with premium festive hampers for corporate gifting. Choose from luxury chocolates, gourmet treats, dry fruits, and personalized gift boxes to spread joy during Diwali, Christmas, New Year, and other festive celebrations.",
    image: festiveImg,
    cta: "Shop Hampers",
  },
  {
    id: 3,
    title: "Client Thank You Gifts",
    description:
      "Strengthen professional relationships with premium client appreciation gifts. From elegant desk essentials to luxury hampers, our corporate gifting solutions ensure your brand leaves a memorable impact on clients, partners, and associates.",
    image: clientImg,
    cta: "Send a Gift",
  },
  {
    id: 4,
    title: "Event & Expo Giveaways",
    description:
      "Make your brand unforgettable at trade shows, corporate events, and exhibitions with custom giveaways and promotional products. Choose from branded T-shirts, eco-friendly bags, pens, bottles, and tech accessories designed to boost brand recall.",
    image: conferenceImg,
    cta: "Browse Giveaways",
  },
];

const ShopByOccasion = () => (
  <section className="occasion-wrapper" aria-labelledby="occasion-heading">
    <h2 id="occasion-heading" className="occasion-heading">
      Corporate Gifting by Category
    </h2>

    <p className="occasion-sub">
      Discover a wide range of corporate gifting solutions in Delhi NCR, Noida,
      Gurgaon, and across India. At PrintKee, we specialize in curated branded
      gifts, employee welcome kits, festive hampers, client thank you presents,
      and promotional giveaways that help your business build strong connections
      and lasting impressions.
    </p>

    <div className="occasion-grid">
      {occasions.map(({ id, title, description, image, cta }) => (
        <article
          key={id}
          className="occasion-card"
          aria-labelledby={`occasion-title-${id}`}
        >
          <div className="image-box">
            <img
              src={image}
              alt={`${title} – Corporate Gifting by PrintKee`}
              className="occasion-img"
            />
          </div>

          <h3 id={`occasion-title-${id}`} className="occasion-title">
            {title}
          </h3>

          <p className="occasion-description">{description}</p>

          <button
            className="occasion-btn"
            aria-label={`${cta} for ${title}`}
          >
            {cta} <span aria-hidden="true">→</span>
          </button>
        </article>
      ))}
    </div>
  </section>
);

export default ShopByOccasion;
