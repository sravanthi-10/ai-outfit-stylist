import React, { useEffect, useState } from "react";
import "./MyCloset.css";

const MyCloset = () => {
  const [closetItems, setClosetItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("styleIdeas")) || [];
    setClosetItems(saved);
  }, []);

  const handleDeleteItem = (indexToDelete) => {
    const updated = closetItems.filter((_, index) => index !== indexToDelete);
    setClosetItems(updated);
    localStorage.setItem("styleIdeas", JSON.stringify(updated));
  };

  return (
    <div className="closet-page">
      <h2>👗 My Closet</h2>

      {closetItems.length > 0 ? (
        <div className="closet-grid">
          {closetItems.map((item, index) => (
            <div key={index} className="flip-card">
              <div className="flip-card-inner">
                {/* Front */}
                <div className="flip-card-front">
                  <img src={item.image} alt={`Outfit ${index + 1}`} />
                </div>

                {/* Back */}
                <div className="flip-card-back">
                  <div className="back-content">
                    <div>
                      <h3>Style Tips</h3>
                      <ul>
                        {item.text.split("\n").map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p>Uploaded: {item.date}</p>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteItem(index)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-msg">Your closet is empty! Try uploading an outfit.</p>
      )}
    </div>
  );
};

export default MyCloset;
