// src/Pages/Suggestions.jsx
import React, { useEffect, useState } from "react";
import "./Suggestions.css";

const Suggestions = () => {
  const [savedIdeas,setSavedIdeas] = useState([]);

  useEffect(() => {
    // Example: fetch from your backend or local storage later
    const saved = JSON.parse(localStorage.getItem("styleIdeas")) || [];
    setSavedIdeas(saved);
  }, []);

  return (
    <div className="suggestions-page">
      <h2>💡 Your Style Suggestions</h2>
      {savedIdeas.length > 0 ? (
        <div className="suggestions-grid">
          {savedIdeas.map((ideas, index) => (
            <div key={index} className="suggestion-card">
              <img src={ideas.image} alt={`Outfit ${index + 1}`} />
              <div className="suggestion-content">
              <h3>Look {index + 1}</h3>
              <p>{ideas.text}</p>
              <small>🕑 {ideas.date}</small>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">No saved suggestions yet. Try uploading an outfit!</p>
      )}
    </div>
  );
};

export default Suggestions;
