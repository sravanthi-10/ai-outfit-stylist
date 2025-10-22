import React, { useState ,useEffect} from 'react';
import './Stylist.css';
import OutfitCard from '../Components/OutfitCard';
import { useCart } from './CartContext';
import { useNavigate ,useLocation} from 'react-router-dom';

const Stylist = () => {
  const [preferences, setPreferences] = useState({
    occasion: '',
    color: '',
    budget: '',
    gender: ''
  });

  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const {dispatch} =useCart();

  const navigate =useNavigate();
  const location = useLocation();
  const isAuth=localStorage.getItem('isAuth') === 'true';

  useEffect(() => {
    const savedOutfits = sessionStorage.getItem('aiOutfits');
    if (savedOutfits) {
      setOutfits(JSON.parse(savedOutfits));
    }

    const autoAddItem = location.state?.autoAddItem || JSON.parse(sessionStorage.getItem('pendingCartItem') || 'null');
    if (autoAddItem && isAuth) {
      dispatch({ type: 'ADD_ITEM', payload: autoAddItem });
      alert(`${autoAddItem.title} added to cart 🛒`);
      sessionStorage.removeItem('pendingCartItem');
      navigate('/stylist', { replace: true });
    }
  }, [location, isAuth, dispatch, navigate]);

  

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutfits([]);
  
    try {
      const prompt = `
        Generate 3 outfit suggestions for a ${preferences.occasion || 'general'} occasion.
        Preferred color: ${preferences.color || 'any'}.
        Budget range: ${preferences.budget || 'any'}.
        Gender: ${preferences.gender || 'any'}.
        Each outfit should include:
        - "id"
        - "title"
        - "description"
        - "price"
        - "tags"
        - "matchScore"
        - "imageQuery" (short search phrase to find relevant photos on Pexels, e.g. "women pastel summer outfit")
  
        Return ONLY a JSON array.
      `;
  
      // 1️⃣ Call OpenAI
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
        }),
      });
  
      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || "";
  
      let aiOutfits = [];
      try {
        const cleaned = aiText.trim().replace(/```json|```/g, "");
        aiOutfits = JSON.parse(cleaned);
      } catch {
        console.warn("Failed to parse AI JSON. Response:", aiText);
        return;
      }
  
      // 2️⃣ Helper to fetch multiple images
      const fetchPexelsImages = async (query) => {
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3`;
        const res = await fetch(url, {
          headers: {
            Authorization: "eRmsVnOtEF0w3CgKTaQ2PkXBAGmOktDixoaPSHYVx58eRL12CEMhc6ex",
          },
        });
        const result = await res.json();
        return result.photos?.map((photo) => photo.src.large) || [];
      };
  
      // 3️⃣ Merge OpenAI outfit data with images
      const outfitsWithImages = await Promise.all(
        aiOutfits.map(async (outfit) => {
          const query =
            outfit.imageQuery ||
            `${outfit.title} ${outfit.tags.join(" ")} ${preferences.color} ${preferences.gender} outfit fashion`;
          const images = await fetchPexelsImages(query);
          return {
            ...outfit,
            image: images[0] || "https://via.placeholder.com/300",
            allImages: images,
          };
        })
      );
  
      setOutfits(outfitsWithImages);
      sessionStorage.setItem('aiOutfits', JSON.stringify(outfitsWithImages));

    } catch (err) {
      console.error("Error generating outfits:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddtoCart=(outfit)=>{
    if(!isAuth){
      alert("Please login First to add items to your Cart.");
      sessionStorage.setItem('pendingCartItem', JSON.stringify(outfit));
      navigate('/login');
      return;
    }
    dispatch({type:'ADD_ITEM',payload: outfit});
    alert(`${outfit.title} added to cart 🛒`);
  };
  
  return (
    <div className="stylist-container">
      <h1>🧠 Your Personal AI Stylist</h1>
      <p>Tell us your occasion, favorite color, or budget — and get instant outfit ideas.</p>

      <form className="stylist-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Occasion</label>
          <select name="occasion" onChange={handleChange}>
            <option value="">Select</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="party">Party</option>
            <option value="ethnic">Ethnic</option>
          </select>
        </div>

        <div className="form-group">
          <label>Preferred Color</label>
          <input type="text" name="color" placeholder="e.g. Black, Blue, Pink" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Budget Range (₹)</label>
          <input type="text" name="budget" placeholder="e.g. 1000–3000" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Gender (optional)</label>
          <select name="gender" onChange={handleChange}>
            <option value="">Any</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>

        <button type="submit" className="cta-btn">
          {loading ? 'Generating...' : 'Generate Outfits'}
        </button>
      </form>

      <div className="outfit-results">
        {outfits.length > 0 && <h2>✨ Recommended Outfits</h2>}
        <div className="outfit-grid">
          {outfits.map((outfit, index) => (
            <OutfitCard
              key={index}
              title={outfit.title}
              description={outfit.description}
              image={outfit.image}
              price={outfit.price}
              tags={outfit.tags}
              matchScore={outfit.matchScore}
              onTryAI={() => alert(`IN Progress Comming Soon!!`)}
              onAddToCart={() => handleAddtoCart(outfit)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stylist;
