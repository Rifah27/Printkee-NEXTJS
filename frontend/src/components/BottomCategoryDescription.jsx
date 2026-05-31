// src/components/BottomCategoryDescription.jsx

import React from 'react';
import categoryDescriptions from '../data/subcategorydescriptions';
import '../styles/BottomCategoryDescription.css';

const BottomCategoryDescription = ({ subcategory }) => {
    const description = categoryDescriptions[subcategory];

    if (!description) return null;

    return (
        <section className="bottom-category-description">
            <div className="bcd-container">
                <h3 className="bcd-title">{subcategory}</h3>
                <p className="bcd-text">{description}</p>
            </div>
        </section>
    );
};

export default BottomCategoryDescription;
