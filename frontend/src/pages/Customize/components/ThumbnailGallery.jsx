import React from "react";
import "../styles/ThumbnailGallery.css";

const ThumbnailGallery = ({
  activeIndex,
  onThumbnailClick,
}) => {
  const sideLabels = ["Front View", "Back View", "Left View", "Right View"];

  return (
    <div className="thumbnail-navigation-container">
      <div className="thumbnail-buttons">
        {sideLabels.map((label, index) => (
          <button
            key={index}
            className={`thumbnail-button ${index === activeIndex ? "active-thumbnail-button" : ""}`}
            onClick={() => onThumbnailClick(index)}
          >
            {label}
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default ThumbnailGallery;