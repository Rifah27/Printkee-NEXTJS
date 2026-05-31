import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WhyChooseUs.css";
import { Truck, Leaf, BadgeCheck, Users, Percent } from "lucide-react";

const WhyChooseUs = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const features = [
    {
      icon: <Users size={52} aria-hidden="true" role="presentation" />,
      title: "1000+ Happy Clients",
      subtitle: "Trusted for Customized Promotional Products",
      content:
        "We have delivered promotional products across Delhi NCR, Okhla, Gurgaon, Noida, and Haryana to more than a thousand satisfied clients. From corporates to coaching institutes, startups, and schools, PrintKee helps brands create a lasting impression with high-quality custom promotional items.",
    },
    {
      icon: <Truck size={52} aria-hidden="true" role="presentation" />,
      title: "Pan-India Shipping",
      subtitle: "Nationwide Delivery, Always On-Time",
      content:
        "Get your branded merchandise, corporate gifts, and promotional items delivered anywhere in India. With affordable pricing and timely logistics, PrintKee ensures your brand reaches the right audience without delays.",
    },
    {
      icon: <BadgeCheck size={52} aria-hidden="true" role="presentation" />,
      title: "Custom Branding",
      subtitle: "Personalized Corporate Gifting Solutions",
      content:
        "Boost your brand identity with fully customizable merchandise — including T-shirts, bags, stationery, tech items, and premium corporate gifts. Our high-quality materials and finishing ensure your promotional items truly stand out.",
    },
    {
      icon: <Percent size={52} aria-hidden="true" role="presentation" />,
      title: "Bulk Order Discounts",
      subtitle: "Save More on Promotional Gifts",
      content:
        "Enjoy exclusive discounts on large-quantity orders for client gifting, employee giveaways, event merchandise, and promotional campaigns. More quantity means more savings — without sacrificing quality.",
    },
    {
      icon: <Leaf size={52} aria-hidden="true" role="presentation" />,
      title: "Sustainable Options",
      subtitle: "Eco-Friendly Branded Merchandise",
      content:
        "Support a greener tomorrow with eco-friendly corporate gifting options. Choose from sustainable materials including bamboo, jute, recycled stationery, and other earth-friendly promotional products.",
    },
  ];

  const handleProceed = () => {
    if (!selectedOption) return;

    const routes = {
      "Polo T-Shirt": "/customize/polotshirt",
      "Round Neck T-Shirt": "/customize/roundneck",
      "Cap": "/customize/cap",
    };

    navigate(routes[selectedOption]);
    setShowPopup(false);
  };

  return (
    <section className="whychoose-section" aria-labelledby="whychoose-heading">
      <h2 id="whychoose-heading" className="whychoose-heading">
        Why Choose PrintKee for Your Customized Promotional Products?
      </h2>

      <h3 className="whychoose-subheading">
        PrintKee is your trusted partner for customized promotional products,
        corporate gifting, branded merchandise, and promotional gift items across
        Delhi NCR, Okhla, Gurgaon, Noida, and Haryana.
      </h3>

      {/* Features Section */}
      <section className="whychoose-grid" aria-label="Reasons to choose PrintKee">
        {features.map((feature, index) => (
          <article className="whychoose-card" key={index}>
            <div className="icon">{feature.icon}</div>
            <h4 className="card-title">{feature.title}</h4>
            <p className="card-subtitle">{feature.subtitle}</p>
            <p className="card-content">{feature.content}</p>
          </article>
        ))}
      </section>

      {/* CTA Button */}
      <button
        className="whychoose-cta"
        aria-label="Start customizing your promotional product"
        onClick={() => setShowPopup(true)}
      >
        Start Customizing <span className="arrow-1">→</span>
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <div className="popup">
            <h4 id="popup-title">What would you like to customize?</h4>

            <label htmlFor="customize-select" className="visually-hidden">
              Choose an item to customize
            </label>
            <select
              id="customize-select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Polo T-Shirt">Polo T-Shirt</option>
              <option value="Round Neck T-Shirt">Round Neck T-Shirt</option>
              <option value="Cap">Cap</option>
            </select>

            <div className="popup-buttons">
              <button
                onClick={handleProceed}
                disabled={!selectedOption}
                aria-disabled={!selectedOption}
              >
                Proceed
              </button>
              <button
                className="cancel-btn-2"
                aria-label="Close popup"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyChooseUs;
