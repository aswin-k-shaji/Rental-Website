import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Hero.css';
import { useNavigate } from "react-router-dom";


const Hero = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/collection');
  };

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/product/list');
        if (res.data.success) {
          const items = res.data.items;
          const featuredImage = items.length > 0 ? items[0].image[0] : null;
          setImage(featuredImage);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, []);

  if (loading) return <div className="hero-loading">Loading...</div>;
  if (error) return <div className="hero-error">{error}</div>;

  return (
    <div className="hero-section">
      <div className="hero-wrapper">
        <div className="hero-content">
          <div className="hero-subtitle">Discover Unlimited Possibilities</div>
          <h1 className="hero-title">Rent Everything You Need</h1>
          <p className="hero-description">
            From tools to tech, we've got you covered. Quality rentals at your fingertips.
          </p>
          <div className="hero-cta-container">
            <button onClick={handleButtonClick} className="hero-primary-btn">Explore Rentals</button>
            <button className="hero-secondary-btn">How It Works</button>
          </div>
        </div>
        <div className="hero-image-container">
          <img 
            src={image || "/api/placeholder/600/600"} 
            alt="Featured rental items" 
            className="hero-image"
          />
          <div className="hero-image-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;