import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faTwitter, 
  faPinterest,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt,
  faClock,
  faPizzaSlice
} from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Main footer content */}
      <div className="footer-main">
        <div className="footer-container">
          
          {/* Brand/About section */}
          <div className="footer-section">
            <div className="footer-brand">
              <FontAwesomeIcon icon={faPizzaSlice} className="brand-icon" />
              <span className="brand-name">Pizza Paradise</span>
            </div>
            <p className="footer-description">
              Serving the most delicious pizzas since 2010. Made with fresh ingredients and traditional recipes for an authentic taste experience.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
          
          {/* Quick Links section */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/menu">Our Menu</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/nutrition">Nutrition Info</a></li>
              <li><a href="/gift-cards">Gift Cards</a></li>
            </ul>
          </div>
          
          {/* Contact Info section */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="footer-contact-details">
              <div className="contact-row">
                <span className="contact-icon">📍</span>
                <span>123 Pizza Street, Food City, FC 12345</span>
              </div>
              <div className="contact-row">
                <span className="contact-icon">📞</span>
                <span>(555) 123-PIZZA</span>
              </div>
              <div className="contact-row">
                <span className="contact-icon">✉️</span>
                <span>info@pizzaparadise.com</span>
              </div>
              <div className="contact-row">
                <span className="contact-icon">🕒</span>
                <span>Open: 11am - 11pm Daily</span>
              </div>
            </div>
          </div>
          
          {/* Newsletter section */}
          <div className="footer-section">
            <h3 className="footer-title">Get Special Offers</h3>
            <p className="newsletter-text">Subscribe to our newsletter for exclusive deals and new flavor announcements!</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
            <div className="app-download">
              <p>Order from our app</p>
              <div className="app-badges">
                <a href="#" className="app-badge">
                  <img src="/api/placeholder/120/40" alt="Download on App Store" />
                </a>
                <a href="#" className="app-badge">
                  <img src="/api/placeholder/120/40" alt="Get it on Google Play" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; {new Date().getFullYear()} Pizza Paradise. All rights reserved.</p>
          <div className="legal-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;