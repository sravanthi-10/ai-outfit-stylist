import React from 'react';
import './OutfitCard.css';

const OutfitCard = ({
  title,
  description,
  image,
  price,
  tags,
  matchScore,
  styleIdeas = [],
  onTryAI,
  onAddToCart,
}) => {
  return (
    <div className="outfit-card">
      {/* Image */}
      <div className="outfit-image-container">
        <img src={image} alt={title} className="outfit-image" />
        {matchScore && (
          <span className="match-score">{Math.round(matchScore * 100)}% Match</span>
        )}
      </div>

      {/* Content */}
      <div className="outfit-content">
        <h3 className="outfit-title">{title}</h3>
        <p className="outfit-description">{description}</p>
        <p className="outfit-price">₹ {price}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="outfit-tags">
            {tags.map((tag, index) => (
              <span key={index} className="outfit-tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Style Ideas */}
        {styleIdeas.length > 0 && (
          <div className="style-ideas">
            <h4>Styling Tips:</h4>
            <ul>
              {styleIdeas.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="outfit-actions">
          <button className="btn-ai" onClick={onTryAI}>Try AI Styling</button>
          <button className="btn-cart" onClick={onAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
