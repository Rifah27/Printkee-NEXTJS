import React from 'react';
import overviewList from '../data/overviewData';
import '../styles/ProductOverview.css';

const ProductOverview = ({ subcategory }) => {
  if (!subcategory) return null;

  const description = overviewList[subcategory] || `Explore our wide range of products in the ${subcategory} category. Find the best options tailored to your needs.`;

  return (
    <section className="product-overview">
      <h2 className="product-overview__title">{subcategory}</h2>
      <p className="product-overview__description">{description}</p>
    </section>
  );
};

export default ProductOverview;
