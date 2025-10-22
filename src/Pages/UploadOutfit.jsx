import React, { useState, useEffect } from "react";
import './UploadOutfit.css'
const UploadOutfit = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null); // for preview
  const [styleIdeas, setStyleIdeas] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load API keys and Cloudinary info from .env
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

  // Cleanup object URL on unmount or image change
  useEffect(() => {
    return () => {
      if (imageURL) URL.revokeObjectURL(imageURL);
    };
  }, [imageURL]);

  const analyzeStyle = async () => {
    if (!image) return alert("Please upload an image first!");

    setLoading(true);
    setStyleIdeas("");
    setError("");

    try {
      // 1️⃣ Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        { method: "POST", body: formData }
      );

      const cloudData = await cloudRes.json();
      if (!cloudData.secure_url) throw new Error("Cloudinary upload failed");

      const publicImageUrl = cloudData.secure_url;

      // 2️⃣ Send public URL to OpenAI
      const prompt = `Here is an outfit image: ${publicImageUrl}. Suggest styling tips and outfit combinations.`;

      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const openaiData = await openaiRes.json();

      if (openaiData.choices && openaiData.choices.length > 0) {
        const ideas = openaiData.choices[0].message.content;
        setStyleIdeas(openaiData.choices[0].message.content);
        const saved = JSON.parse(localStorage.getItem("styleIdeas")) || [];
        saved.push({
          image: cloudData.secure_url,
          text: ideas,
          date: new Date().toLocaleString()
        });
        localStorage.setItem("styleIdeas", JSON.stringify(saved));
      } 
    } catch (err) {
      console.error(err);
      setError(err.message || "Error analyzing image!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>👗 Upload Your Outfit</h2>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      {imageURL && <img src={imageURL} alt="Outfit"/>}
      <button onClick={analyzeStyle} disabled={loading} className="btn">
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {styleIdeas && (
        <div className="style-ideas">
          <h3>Style Ideas:</h3>
          <ul>
            {styleIdeas.split("\n").map((line, idx) => (
              line.trim() !== "" && <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadOutfit;
