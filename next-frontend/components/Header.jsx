"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import {
  FiChevronDown,
  FiGrid,
  FiMenu,
  FiPhone,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";

const categories = {
  "Apparel and Accessories": {
    href: "/apparel-and-accessories",
    items: [
      { name: "Polo T-Shirts", href: "/apparel-and-accessories/polo-t-shirts" },
      { name: "Round Neck T-Shirts", href: "/apparel-and-accessories/round-neck-t-shirts" },
      { name: "Caps", href: "/apparel-and-accessories/caps" },
      { name: "Corporate Shirts", href: "/apparel-and-accessories/corporate-shirts" },
      { name: "Winter Wear", href: "/apparel-and-accessories/winter-wear" },
    ],
  },
  "Bags and Travel": {
    href: "/bags-and-travel",
    items: [
      { name: "Backpacks", href: "/bags-and-travel/backpacks" },
      { name: "Foldable Bags", href: "/bags-and-travel/foldable-bags" },
      { name: "Duffle Bags", href: "/bags-and-travel/duffle-bags" },
      { name: "Tote Bags", href: "/bags-and-travel/tote-bags" },
    ],
  },
  "Drink Ware": {
    href: "/drink-ware",
    items: [
      { name: "Sipper", href: "/drink-ware/sipper" },
      { name: "Bamboo Bottle", href: "/drink-ware/bamboo-bottle" },
      { name: "Coffee Mug", href: "/drink-ware/coffee-mug" },
      { name: "Ceramic Mug", href: "/drink-ware/ceramic-mug" },
    ],
  },
  "Technology Accessories": {
    href: "/technology-accessories",
    items: [
      { name: "Wireless Charging", href: "/technology-accessories/wireless-charging" },
      { name: "Computer Accessories", href: "/technology-accessories/computer-accessories" },
      { name: "Power Banks", href: "/technology-accessories/power-banks" },
      { name: "Desktop & Mousepad", href: "/technology-accessories/desktop-and-mousepad" },
    ],
  },
  "Office and Writing": {
    href: "/office-and-writing",
    items: [
      { name: "File and Folder", href: "/office-and-writing/file-and-folder" },
      { name: "Notebook & Diary Sets", href: "/office-and-writing/notebooks-and-diary-sets" },
      { name: "Pen & Writing Set", href: "/office-and-writing/pen-and-writing-set" },
      { name: "Lanyard & ID Card", href: "/office-and-writing/lanyard-and-id-card" },
    ],
  },
  "Eco-Products": {
    href: "/eco-products",
    items: [
      { name: "Cork Sheet", href: "/eco-products/cork-sheet" },
      { name: "Cork Coaster", href: "/eco-products/cork-coaster" },
      { name: "Cork Gift Boxes", href: "/eco-products/cork-premium-gift-boxes" },
      { name: "Cork Desk Accessories", href: "/eco-products/cork-desk-top-accessories" },
    ],
  },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/brands", label: "Brands" },
  { href: "/blogs", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const openMega = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaOpen(true);
  };

  const closeMegaDelayed = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setMegaOpen(false);
      closeTimeoutRef.current = null;
    }, 150);
  };
  const [query, setQuery] = useState("");

  const runSearch = (event) => {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header__notice">
        <div className="container">
          <span>Premium corporate gifting, promotional products & custom branding across India</span>
          <a href="tel:+918750708222"><FiPhone aria-hidden="true" /> +91 87507 08222</a>
        </div>
      </div>

      <div className="site-header__main">
        <div className="container site-header__main-inner">
          <Link href="/" className="site-logo" aria-label="PrintKee home">
            <span className="site-logo__mark" aria-hidden="true">
              <img src="/assets/printkeeLogo.webp" alt="" />
            </span>
            <span className="site-logo__text">
              <b>PrintKee</b>
            </span>
          </Link>

          <form className="site-search" onSubmit={runSearch}>
            <FiSearch aria-hidden="true" />
            <input
              type="search"
              placeholder="Search apparel, bottles, tech gifts..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search products"
            />
            <button type="submit">Search</button>
          </form>

          <div className="site-header__actions">
            <Link href="/customize" className="site-icon-link" aria-label="Customize products">
              <FiShoppingBag aria-hidden="true" />
              <span>Customize</span>
            </Link>
            <Link href="/login" className="site-icon-link" aria-label="Login">
              <FiUser aria-hidden="true" />
              <span>Login</span>
            </Link>
            <Link href="/contact" className="site-quote-btn">Request Quote</Link>
          </div>

          <button
            className="site-menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <div className="container site-nav__inner">
          <div
            className="site-nav__mega-wrap"
            onMouseEnter={openMega}
            onMouseLeave={closeMegaDelayed}
          >
            <button
              className="site-nav__category-btn"
              onClick={() => {
                if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = null;
                }
                setMegaOpen((open) => !open);
              }}
              aria-expanded={megaOpen}
            >
              <FiGrid aria-hidden="true" /> All Categories <FiChevronDown aria-hidden="true" />
            </button>

            {megaOpen && (
              <div className="site-mega-menu" onMouseEnter={openMega} onMouseLeave={closeMegaDelayed}>
                <div className="site-mega-menu__feature">
                  <p>PrintKee Catalog</p>
                  <h2>Customized promotional products for every campaign.</h2>
                  <Link href="/contact">Talk to gifting expert</Link>
                </div>
                <div className="site-mega-menu__grid">
                  {Object.entries(categories).map(([title, data]) => (
                    <div key={title} className="site-mega-menu__column">
                      <Link href={data.href} className="site-mega-menu__title" onClick={() => setMegaOpen(false)}>
                        {title}
                      </Link>
                      {data.items.map((item) => (
                        <Link href={item.href} key={item.href} onClick={() => setMegaOpen(false)}>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="site-nav__links">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "is-active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <a href="mailto:sales@printkee.com" className="site-nav__email">sales@printkee.com</a>
        </div>
      </nav>

      {menuOpen && (
        <div className="site-mobile-panel">
          <form className="site-search site-search--mobile" onSubmit={runSearch}>
            <FiSearch aria-hidden="true" />
            <input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search products"
            />
            <button type="submit">Go</button>
          </form>

          <div className="site-mobile-panel__links">
            {links.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="site-mobile-panel__categories">
            <p>All Categories</p>
            {Object.entries(categories).map(([title, data]) => (
              <Link key={title} href={data.href} onClick={() => setMenuOpen(false)}>
                {title}
              </Link>
            ))}
          </div>

          <Link href="/contact" className="site-quote-btn" onClick={() => setMenuOpen(false)}>
            Request Quote
          </Link>
        </div>
      )}
    </header>
  );
}
