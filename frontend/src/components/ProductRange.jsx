import React from "react";
import "../styles/ProductRange.css";
import {
  Shirt,
  Briefcase,
  PenTool,
  Award,
  ChevronRight,
} from "lucide-react";

const productData = [
  {
    id: 1,
    icon: <Shirt size={38} />,
    title: "Custom Apparel",
    description:
      "Your team’s uniform or giveaway apparel is often the first impression people get of your brand. We offer high-quality custom t-shirts, polo shirts, hoodies, jackets, and corporate shirts that combine comfort, style, and branding impact.",
    points: [
      "Round Neck T-Shirts: Perfect for events, giveaways, and casual branding.",
      "Polo T-Shirts: Ideal for corporate uniforms and staff apparel.",
      "Hoodies & Jackets: Stylish and comfortable for premium winter giveaways.",
      "Corporate Shirts: Elegant and professional for office and client meetings."
    ],
    footer:
      "Every apparel item can be fully customized with your logo, brand colors, and messaging for maximum brand visibility."
  },

  {
    id: 2,
    icon: <Briefcase size={38} />,
    title: "Branded Bags",
    description:
      "A bag is more than utility — it's a moving advertisement for your brand. Our collection includes premium backpacks, laptop bags, sling bags, and drawstring bags.",
    points: [
      "Perfect for giveaways at coaching institutes, seminars, and corporate events.",
      "Durable, high-quality fabric ensures long-term brand visibility.",
      "Custom branding via printing, embroidery, and woven labels."
    ],
    footer:
      "Branded bags are functional, stylish, and leave a long-lasting branding impact."
  },

  {
    id: 3,
    icon: <PenTool size={38} />,
    title: "Stationery & Promotional Items",
    description:
      "Keep your brand visible every day with practical and high-demand stationery and promotional merchandise.",
    points: [
      "Pens, Notebooks, Diaries: Perfect daily-use items.",
      "Mugs & Drinkware: Ideal office gifts and event giveaways.",
      "Keychains, USB Drives, Small Gifts: Excellent for brand recall and hampers."
    ],
    footer:
      "These items are cost-effective and highly effective in building long-term brand engagement."
  },

  {
    id: 4,
    icon: <Award size={38} />,
    title: "Corporate Gifts & Awards",
    description:
      "Reward achievements, celebrate milestones, and impress clients with our premium corporate gifting range.",
    points: [
      "Enhance employee motivation and recognition.",
      "Celebrate student achievements or client milestones.",
      "Premium trophies, medals, and plaques designed to reflect prestige."
    ],
    footer:
      "From appreciation tokens to luxury awards, PrintKee ensures your gifts leave a lasting impression."
  },
];

const ProductRange = () => {
  return (
    <section className="productrange-section">
      <h2 className="productrange-heading">Our Product Range</h2>
      <p className="productrange-subheading">
        We offer a wide variety of products, each customizable to meet your specific branding goals.
      </p>

      <div className="productrange-grid">
        {productData.map((item) => (
          <div key={item.id} className="productrange-card">
            <div className="productrange-icon">{item.icon}</div>

            <h3 className="productrange-title">{item.title}</h3>

            <p className="productrange-description">{item.description}</p>

            <ul className="productrange-list">
              {item.points.map((point, idx) => (
                <li key={idx}>
                  <ChevronRight size={16} className="productrange-bullet-icon" />
                  {point}
                </li>
              ))}
            </ul>

            <p className="productrange-footer">{item.footer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductRange;
