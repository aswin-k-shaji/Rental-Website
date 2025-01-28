import React, { useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <img src={assets.Contact} alt="Contact" className="contact-image" />
          <div className="contact-details">
            <h2>Get in Touch</h2>
            <div className="contact-info-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Our Location</h3>
                <p>123 Rental Street</p>
                <p>Business District, City 12345</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone Numbers</h3>
                <p>Main: +1 (987) 256-7285</p>
                <p>Support: +1 (987) 256-7286</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>Rental@gmail.com</p>
                <p>Support@rental.com</p>
              </div>
            </div>

            <div className="contact-info-item">
              <i className="fas fa-clock"></i>
              <div>
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>

        <div className="map-section">
          <h2>Find Us</h2>
        </div>
      </div>
    </div>
  );
};

export default Contact;