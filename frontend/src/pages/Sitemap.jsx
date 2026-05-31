import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/Sitemap.css';

const Sitemap = () => {
  return (
    <>
      <Helmet>
        <title>Sitemap | MF Global Services</title>
        <meta
          name="description"
          content="Navigate all MF Global Services pages including categories, brands, blogs, and contact information through our easy-to-use sitemap."
        />
        <meta
          name="keywords"
          content="sitemap, MF Global Services, Printkee sitemap, corporate gifting sitemap, categories, brands"
        />
        <link rel="canonical" href="https://printkee.com/sitemap" />
      </Helmet>

      <div className="sitemap-container">
        <h1 className="sitemap-heading">Sitemap</h1>
        <p className="sitemap-description">Explore all key pages and collections on Printkee.</p>

        {/* Main Pages */}
        <section className="sitemap-section">
          <h2 className="sitemap-subheading">Main Pages</h2>
          <ul className="sitemap-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blogs">Blog</Link></li>
            <li><Link to="/brands">Brands</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </section>

        {/* Categories */}
        <section className="sitemap-section">
          <h2 className="sitemap-subheading">Popular Categories</h2>
          <ul className="sitemap-list">
            <li><Link to="/bags-and-travel">Bags and Travel</Link></li>
            <li><Link to="/eco-products">Eco-Products</Link></li>
            <li><Link to="/apparel-and-accessories">Apparel & Accessories</Link></li>
            <li><Link to="/collection">Collection</Link></li>
            <li><Link to="/drink-ware">Drink Ware</Link></li>
            <li><Link to="/technology-accessories">Technology Accessories</Link></li>
            <li><Link to="/trophy-and-momento">Trophy and Momento</Link></li>
            <li><Link to="/office-and-writing">Office & Writing</Link></li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Sitemap;
