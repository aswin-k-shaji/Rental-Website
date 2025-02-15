import { useState, useEffect } from 'react';
import './ImageCarousel.css';

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Product categories data with background colors
  const categories = [
    {
      name: 'Electronics',
      description: 'Latest gadgets and tech devices at incredible prices',
      ctaText: 'Browse Electronics',
      color: 'rgba(66, 0, 131, 0.6)'
    },
    {
      name: 'Bikes',
      description: 'Mountain, road and electric bikes for every terrain',
      ctaText: 'Explore Bikes',
      color: 'rgba(131, 58, 180, 0.6)'
    },
    {
      name: 'Machines',
      description: 'Industrial and home equipment for professionals',
      ctaText: 'Shop Machines',
      color: 'rgba(195, 20, 50, 0.6)'
    },
    {
      name: 'Accessories',
      description: 'Essential add-ons to upgrade your experience',
      ctaText: 'View Accessories',
      color: 'rgba(225, 77, 42, 0.6)'
    }
  ];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === categories.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? categories.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 2000); // Changed to 2 seconds as requested earlier

    return () => clearInterval(timer);
  }, []);

  // Get current category
  const currentCategory = categories[currentIndex];

  // Generate background style based on current category
  const getOverlayStyle = () => {
    const color = currentCategory.color;
    return {
      background: `linear-gradient(135deg, ${color} 0%, rgba(195, 20, 50, 0.6) 100%)`
    };
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {/* Using a div instead of img, with background color */}
        <div 
          className={`carousel-image ${isTransitioning ? 'transitioning' : ''}`}
          style={{ backgroundColor: '#f5f5f5' }}
        />
        
        <div className="carousel-overlay" style={getOverlayStyle()}>
          <div className="carousel-content">
            <h2>{currentCategory.name}</h2>
            <p>{currentCategory.description}</p>
            <button className="book-now-btn">{currentCategory.ctaText}</button>
          </div>
        </div>
      </div>

      <button 
        onClick={prevSlide}
        className="nav-button prev-button"
        aria-label="Previous category"
      >
        ‹
      </button>
      
      <button 
        onClick={nextSlide}
        className="nav-button next-button"
        aria-label="Next category"
      >
        ›
      </button>

      <div className="carousel-dots">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to category ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;