import { useState, useEffect } from 'react';
import './ImageCarousel.css';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Replace these with your actual image paths from the assets folder
  const images = [
    '/assets/rental1.jpg',
    '/assets/rental2.jpg',
    '/assets/rental3.jpg',
    '/assets/rental4.jpg'
  ];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <img
          src={images[currentIndex]}
          alt={`Rental property ${currentIndex + 1}`}
          className={`carousel-image ${isTransitioning ? 'transitioning' : ''}`}
        />
        
        <div className="carousel-overlay">
          <div className="carousel-content">
            <h2>Find Your Perfect Space</h2>
            <p>Exclusive properties starting from $899/month</p>
            <button className="book-now-btn">Book Now</button>
          </div>
        </div>
      </div>

      <button 
        onClick={prevSlide}
        className="nav-button prev-button"
        aria-label="Previous slide"
      >
        ‹
      </button>
      
      <button 
        onClick={nextSlide}
        className="nav-button next-button"
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;