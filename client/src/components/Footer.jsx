import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Helpful Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-use">Terms of Use</a></li>
            <li><a href="/about-us">About Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Get in touch</h3>
          <p>3, 10/47/2, Indus Motor Company Pvt LTD M.G. Road, Thevara, Ernakulam, Kerala, 682015</p>
          <p>support@indusgo.in</p>
          <p>+1800 4122 4791</p>
        </div>
        <div className="footer-section">
          <h3>Follow us on</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/IndusGo" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/IndusGo" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/indusgo/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/indus-go" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCwt-8VqjmO-gy-OzRx9RQwA" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Download App</h3>
          <div className="app-links">
            <a href="https://play.google.com/store/apps/details?id=com.indusgo" target="_blank" rel="noopener noreferrer">
              <img src="/google-play-badge.png" alt="Google Play Badge" />
            </a>
            <a href="https://apps.apple.com/in/app/indus-go/id1532715417" target="_blank" rel="noopener noreferrer">
              <img src="/app-store-badge.png" alt="App Store Badge" />
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        &copy; 2025 Indus Go. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;