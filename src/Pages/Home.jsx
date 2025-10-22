import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Home.css';
import outfit1 from '../assets/outfit1.webp';
import outfit2 from '../assets/outfit2.webp';
import outfit3 from '../assets/outfit3.webp';
import outfit4 from '../assets/outfit4.webp';

const Home = () => {
  const navigate =useNavigate();
  return (
    <div className="home-container">
      
      {/* Hero Section */}
      <section className="hero">
        <h1>Revolutionize Your Style with AI</h1>
        <p>Get personalized outfit recommendations instantly.</p>
        <div className="hero-buttons">
          <button className="cta-btn" onClick={()=>navigate('/login')}>Get Started</button>
          <button className="cta-btn-outline" onClick={()=>navigate('/stylist')}>Explore Styles</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why AI Outfit Stylist?</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>AI Recommendations</h3>
            <p>Personalized outfit suggestions based on your style & preferences.</p>
          </div>
          <div className="card">
            <h3>Style Trends</h3>
            <p>Keep up with the latest fashion trends automatically.</p>
          </div>
          <div className="card">
            <h3>Virtual Try-On</h3>
            <p>See how outfits look on you with AI-generated previews.</p>
          </div>
          <div className="card">
            <h3>Save & Shop</h3>
            <p>Save your favorite outfits and shop online instantly.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <h2>Style Inspirations</h2>
        <div className="gallery-grid">
         <img src={outfit1} alt="Outfit 1" />
          <img src={outfit2} alt="Outfit 2" />
          <img src={outfit3} alt="Outfit 3" />
          <img src={outfit4} alt="Outfit 4" /> 
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta-section">
        <h2>Find Your Perfect Outfit Now</h2>
        <button className="cta-btn"onClick={()=>navigate('/stylist')}>Start Styling</button>
      </section>

    </div>
  )
}

export default Home;
