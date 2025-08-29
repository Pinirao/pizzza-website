import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  useEffect(() => {
    // Animation on component mount
    const timer = setTimeout(() => {
      if (formRef.current) {
        formRef.current.style.opacity = '1';
        formRef.current.style.transform = 'translateY(0)';
      }
      if (infoRef.current) {
        infoRef.current.style.opacity = '1';
        infoRef.current.style.transform = 'translateY(0)';
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }, 3000);
    }
  };
  
  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1 className="animated-title">Get in Touch</h1>
        <p className="animated-subtitle">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
      </div>
      
      <div className="contact-content">
        <form 
          ref={formRef}
          className="contact-form animated-form" 
          onSubmit={handleSubmit}
        >
          <h2>Send Us a Message</h2>
          
          <div className="form-group">
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              required 
            />
            <label htmlFor="name">Your Name</label>
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              required 
            />
            <label htmlFor="email">Your Email</label>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
              required 
            ></textarea>
            <label htmlFor="message">Your Message</label>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
          
          <button type="submit" className="submit-btn">
            {isSubmitted ? (
              <div className="success-animation">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <span>Message Sent!</span>
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
        
        <div ref={infoRef} className="contact-info animated-info">
          <h2>Contact Information</h2>
          
          <div className="info-item">
            <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div className="info-content">
              <h3>Our Location</h3>
              <p>123 Pizza Street, Food City, Yummyland</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
              </svg>
            </div>
            <div className="info-content">
              <h3>Email Us</h3>
              <p>info@pizzarestaurant.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <div className="info-content">
              <h3>Call Us</h3>
              <p>(123) 456-7890</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
            </div>
            <div className="info-content">
              <h3>Opening Hours</h3>
              <p>Mon-Thu: 11am - 10pm</p>
              <p>Fri-Sat: 11am - 11pm</p>
              <p>Sun: 12pm - 9pm</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="map-container">
        <div className="pizza-marker">
          <div className="pizza-slice"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;