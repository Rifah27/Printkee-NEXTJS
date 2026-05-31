// components/CTABanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CTABanner.css';

const CTABanner = ({
  imageSrc,
  linkTo = '/contact',
  alt = 'Get a Quote – Corporate Gifting with PrintKee',
}) => {
  return (
    <div
      className="cta-banner"
      role="region"
      aria-label="Promotional call to action banner"
    >
      <figure className="cta-figure">
        <Link to={linkTo} aria-label="Visit contact page to request a quote">
          <img
            src={imageSrc}
            alt={alt}
            className="cta-full-image"
            loading="lazy"
            decoding="async"
          />
        </Link>
      </figure>
    </div>
  );
};

export default CTABanner;
