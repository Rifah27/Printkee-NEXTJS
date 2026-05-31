// src/components/SubcategoryDescription.jsx

import React from "react";
import subcategoryDescriptions from "../../data/subcategorydescriptions";
import "./SubcategoryDescription.css";

const SubcategoryDescription = ({ subcategory }) => {
  const rawHTML = subcategoryDescriptions[subcategory];

  if (!rawHTML) return null;

  // Convert bullet lines into <li> items
  const bulletLines = rawHTML.match(/^ *• *(.*)$/gm);
  let formattedHTML = rawHTML;

  if (bulletLines) {
    const listItems = bulletLines
      .map((line) => line.replace(/^ *• */, "").trim())
      .map((item) => `<li>${item}</li>`)
      .join("");

    // Replace the bullet block with a proper unordered list
    formattedHTML = rawHTML.replace(
      /(^ *• *.*(\n|$))+/gm,
      `<ul class="subcategory-description-list">${listItems}</ul>`
    );
  }

  const formatTitle = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const title = formatTitle(subcategory);

  return (
    <section
      className="subcategory-description-wrapper"
      aria-labelledby="subcategory-desc-title"
    >
      {/* <h2 id="subcategory-desc-title" className="subcategory-description-title">
        {title}
      </h2> */}

      <div
        className="subcategory-description-content"
        dangerouslySetInnerHTML={{ __html: formattedHTML }}
      />
    </section>
  );
};

export default SubcategoryDescription;
