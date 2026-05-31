import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/HeroSection.css";

const slides = [
  {
    image: "/assets/banner1.webp",
    title: "Customized Corporate Apparel",
    description:
      "Dress your team in style with premium shirts, jackets, and uniforms—personalized with your company logo.",
    tag: "Apparel & Uniforms",
    route: "/apparel-and-accessories",
  },
  {
    image: "/assets/banner2.webp",
    title: "Eco-Friendly Gift Solutions",
    description:
      "Make a sustainable impact with eco-conscious gifting options made from recycled and biodegradable materials.",
    tag: "Eco Products",
    route: "/eco-products",
  },
  {
    image: "/assets/banner3.webp",
    title: "Smart Tech Gifts",
    description:
      "Impress clients and employees with innovative, branded tech products like wireless chargers, earbuds, and gadgets.",
    tag: "Technology",
    route: "/technology-accessories",
  },
  {
    image: "/assets/banner4.webp",
    title: "Premium Drinkware Collection",
    description:
      "From stainless steel bottles to personalized mugs, our drinkware is perfect for daily use and corporate branding.",
    tag: "Drinkware",
    route: "/drink-ware",
  },
  {
    image: "/assets/banner1.webp",
    title: "Bags, Office, & Writing Essentials",
    description:
      "Discover a wide range of custom office bags, notebooks, and writing instruments—perfect for gifting and branding.",
    tag: "Office & Bags",
    route: "/office-and-writing",
  },
];

const HeroSection = () => {
  return (
    <section
      className="hero-slider-container"
      aria-label="Corporate gifting categories and promotional product highlights"
    >
      {/* JSON-LD FOR SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "PrintKee Corporate Gifting Highlights",
          image: slides.map((s) => s.image),
        })}
      </script>

      <Swiper
        aria-roledescription="carousel"
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="heroSwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Hidden IMG for SEO + background remains for UI */}
            <img
              src={slide.image}
              alt={`${slide.title} – ${slide.tag}`}
              loading={index === 0 ? "eager" : "lazy"}
              className="seo-hidden-image"
              style={{ display: "none" }}
            />

            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="overlay">
                <div className="content-box">
                  <p className="tag">{slide.tag}</p>

                  {/* Only ONE H1 remains for SEO hierarchy */}
                  <h1 className="title">{slide.title}</h1>

                  <p className="description">{slide.description}</p>

                  <button
                    className="show-products"
                    aria-label={`View products for ${slide.tag}`}
                    onClick={() => (window.location.href = slide.route)}
                  >
                    <span>Show products</span>
                    <span className="arrow-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
