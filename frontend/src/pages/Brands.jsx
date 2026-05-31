import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/Brands.css';
import brandsList from "../data/brandsspl";

const Brands = () => {
  return (
    <div className="brands-container">
      <Helmet>
        <title>Our Brand Partners | MF Global Services</title>
        <meta
          name="description"
          content="MF Global Services partners with premium brands like Adidas, Puma, Noise, and American Tourister to provide top-quality corporate gifts. Explore our brand collaborations."
        />

        
        <link rel="canonical" href="https://printkee.com/brands" />
      </Helmet>

      <h1 className="brands-heading">Brands We Offer</h1>
      <p className="brands-description">
        At MF Global Services, we collaborate with top-tier national and international brands to deliver high-quality corporate gifts. From tech to lifestyle, these brands ensure your gifting experience is premium and memorable.
      </p>

      {/* Accessible List Role */}
      <div className="brands-grid" role="list">
        {brandsList.map((brand, index) => (
          <a
            href={brand.url}
            className="brand-card"
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label={`Visit ${brand.name} official website`}
          >
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="brand-logo"
            />
            <p className="brand-name">{brand.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Brands;
