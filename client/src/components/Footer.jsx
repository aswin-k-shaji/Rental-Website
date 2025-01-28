import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/shipping">Shipping</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/press">Press</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li><a href="/new-arrivals">New Arrivals</a></li>
            <li><a href="/sale">Sale</a></li>
            <li><a href="/gift-cards">Gift Cards</a></li>
            <li><a href="/collections">Collections</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="#" className="social-icon">Facebook</a>
            <a href="#" className="social-icon">Instagram</a>
            <a href="#" className="social-icon">Twitter</a>
            <a href="#" className="social-icon">Pinterest</a>
          </div>
          <div className="newsletter">
            <h5>Subscribe to Our Newsletter</h5>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-legal">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/accessibility">Accessibility</a>
        </div>
        <div className="footer-copyright">
          © 2025 E-Commerce Store. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;