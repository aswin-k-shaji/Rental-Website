import React from 'react';
import { useNavigate } from "react-router-dom";
import './Hero.css';
import { assets } from '../assets/assets';

const Hero = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/collection');
  };

  return (
    <div className="hero-section">
      {/* Background image container */}
      <div className="hero-bg-image"></div>
      

      
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
        <div className="hero-visual">

        </div>
      </div>
    </div>
  );
};

export default Hero;