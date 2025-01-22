import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './hero.css';

const Hero = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/product/list'); // Updated API endpoint
        if (res.data.success) {
          const items = res.data.items;
          // Assuming we want to pick the first item's image as the featured image
          const featuredImage = items.length > 0 ? items[0].image[0] : null; // Modify logic as needed
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-header">
          <div className="hero-tag">
            <p className="highlight"></p>
            <p className="offer"></p>
          </div>
          <h1 className="hero-title">
            <span></span>
            <br />Rental Items
          </h1>
        </div>
        <div className="hero-cta">
          <p className="cta-title">Rent items now</p>
          <p className="cta-description">
            Discover our wide selection of rental items for your every need.
            Quality guaranteed
          </p>
          <button className="cta-button">Browse Collection</button>
        </div>
      </div>

      {/* Hero right side */}
      <div className="hero-image">
        <img 
          src={image || "/api/placeholder/600/600"} 
          alt="Featured rental items" 
          className="main-image"
        />
      </div>
    </section>
  );
};

export default Hero;
