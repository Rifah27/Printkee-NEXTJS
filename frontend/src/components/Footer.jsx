import React from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import logo from "/assets/vorixaLogo.png";

const Footer = () => {
  return (
    <footer className="footer-wrapper light-footer" role="contentinfo">
      <div className="footer-grid">

        {/* Column 1: Branding & About */}
        <div className="footer-branding">
          <img
            src={logo}
            alt="MF Global Services company logo"
            className="footer-logo-img"
          />

          <p className="footer-description">
            Vorixa is your trusted partner in corporate gifting.
            We provide end-to-end customized gifting solutions that help brands
            create meaningful connections — with premium packaging, high-quality
            products, and timely delivery.
          </p>

          <a
            href="/about"
            className="footer-about-btn"
            aria-label="Read more about Vorixa"
          >
            Read More <span className="sr-only"> about Vorixa</span>
          </a>
        </div>

        {/* Column 2: Important Links */}
        <div className="footer-column">
          <h3 className="footer-heading">Important Links</h3>
          <ul>
            <li><a href="/about" aria-label="About Us page">About Us</a></li>
            <li><a href="/contact" aria-label="Contact page">Contact</a></li>
            <li><a href="/brands" aria-label="Brands page">Brands</a></li>
            <li><a href="/blogs" aria-label="Blog page">Blog</a></li>
            <li><a href="/services" aria-label="Services page">Services</a></li>
            <li><a href="/sitemap" aria-label="Sitemap page">Sitemap</a></li>
          </ul>
        </div>

        {/* Column 3: Our Products */}
        <div className="footer-column">
          <h3 className="footer-heading">Our Products</h3>
          <ul>
            <li><a href="/custom-gifting" aria-label="Custom gifting products">Custom Gifting</a></li>
            <li><a href="/bulk-orders" aria-label="Bulk orders page">Bulk Orders</a></li>
            <li><a href="/branding-solutions" aria-label="Branding solutions page">Branding Solutions</a></li>
            <li><a href="/employee-gifts" aria-label="Employee gifts page">Employee Gifts</a></li>
            <li><a href="/festival-gifts" aria-label="Festival gifts page">Festival Gifts</a></li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div className="footer-column">
          <h3 className="footer-heading">Follow Us</h3>

          <div className="footer-socials">
            <a
              href="https://www.facebook.com/share/1DF9K4wAHX/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
            >
              <FaFacebookF aria-hidden="true" />
            </a>

            <a
              href="https://www.instagram.com/vorixa?igsh=MThmZDVhamJ1dGp6Mw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram profile"
            >
              <FaInstagram aria-hidden="true" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our LinkedIn page"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <a href="tel:8750708222" className="footer-phone-link" aria-label="Call Vorixa at 8750708222">
          <FaPhoneAlt aria-hidden="true" /> 87507 08222
        </a>
        <span className="footer-divider">|</span>
        &copy; {new Date().getFullYear()} Vorixa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
