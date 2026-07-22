import Link from "next/link";
import {
  FiArrowRight,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTruck,
} from "react-icons/fi";

const productLinks = [
  { href: "/apparel-and-accessories", label: "Custom Apparel" },
  { href: "/technology-accessories", label: "Corporate Tech Accessories" },
  { href: "/collection/welcome-kits", label: "Employee Joining Kits" },
  { href: "/eco-products", label: "Eco-Friendly Gifts" },
  { href: "/drink-ware", label: "Drinkware" },
  { href: "/bags-and-travel", label: "Bags & Travel" },
];

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/brands", label: "Brands" },
  { href: "/blogs", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/customize", label: "Customize" },
  { href: "/diwali-special", label: "Diwali Special" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__cta">
        <div className="container site-footer__cta-inner">
          <div>
            <span>Need 100+ gifts?</span>
            <h2>Let&apos;s customize something perfect for your team.</h2>
          </div>
          <Link href="/contact">
            Request a Quote <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link href="/" className="site-logo site-logo--footer" aria-label="Vorixa home">
            <span className="site-logo__mark" aria-hidden="true">
              <img src="/assets/vorixaLogo.png" alt="Vorixa" />
            </span>
          </Link>
          <p>
            Vorixa is your trusted partner in custom branding. We provide end-to-end customized
            gifting solutions with premium packaging, high-quality products, and timely delivery.
          </p>
          <div className="site-footer__badges">
            <span>Bulk Discounts</span>
            <span>Fast Delivery</span>
            <span>Premium Packaging</span>
          </div>
        </div>

        <div className="site-footer__column">
          <h3>Shop Products</h3>
          {productLinks.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </div>

        <div className="site-footer__column">
          <h3>Company</h3>
          {quickLinks.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </div>

        <div className="site-footer__column site-footer__contact">
          <h3>Contact</h3>
          <a href="tel:+918750708222"><FiPhone aria-hidden="true" /> +91 87507 08222</a>
          <a href="mailto:sales@vorixa.com"><FiMail aria-hidden="true" /> sales@vorixa.com</a>
          <span>
            <FiMapPin aria-hidden="true" />
            Address: F90/1, Beside ESIC Hospital, Okhla Industrial Area Phase 1, New Delhi - 110020, India
          </span>
          <span><FiTruck aria-hidden="true" /> Branded delivery across India</span>
          <div className="site-footer__socials">
            <a href="https://www.facebook.com/share/1DF9K4wAHX/" target="_blank" rel="noopener noreferrer" aria-label="Vorixa Facebook">
              <FiFacebook aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/vorixa?igsh=MThmZDVhamJ1dGp6Mw==" target="_blank" rel="noopener noreferrer" aria-label="Vorixa Instagram">
              <FiInstagram aria-hidden="true" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Vorixa LinkedIn">
              <FiLinkedin aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

        <div className="container site-footer__bottom">
        <span>&copy; {year} Vorixa. All rights reserved.</span>
        <span>Premium Custom Branding Solutions India</span>
      </div>
    </footer>
  );
}
