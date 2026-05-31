import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RelatedCategories.css';
import { Link } from 'react-router-dom';

const RelatedCategories = ({ categorySlug, currentSubcategorySlug }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/subcategory/subcategories/related-subcategories/${currentSubcategorySlug}`
        );
        setRelated(res.data.relatedSubcategories);
      } catch (err) {
        console.error('Failed to fetch related categories:', err);
      }
    };

    fetchRelated();
  }, [currentSubcategorySlug]);

  return (
    <section
      className="related-categories"
      aria-labelledby="related-categories-heading"
    >
      <h2 id="related-categories-heading">Explore More in This Category</h2>

      <div className="related-grid">
        {related.map((cat) => (
          <article key={cat.slug} className="related-item-wrapper">
            <Link
              to={`/${categorySlug}/${cat.slug}`}
              aria-label={`Explore ${cat.name} category`}
              className="related-item"
            >
              <img
                src={cat.image}
                alt={cat.name ? `${cat.name} category image` : "Related category"}
                className="related-item-img"
              />
              <p className="item-name">{cat.name}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedCategories;
