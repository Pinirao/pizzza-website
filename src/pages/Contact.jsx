import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  useEffect(() => {
    // Generate CAPTCHA on component mount
    generateCaptcha();
    
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
  
  // Generate random CAPTCHA text
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaText(result);
    setCaptchaInput('');
    setCaptchaError('');
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'captcha') {
      setCaptchaInput(value);
      if (captchaError) setCaptchaError('');
    } else {
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
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }
    
    // Validate CAPTCHA
    if (captchaInput !== captchaText) {
      setCaptchaError('CAPTCHA code is incorrect');
      return false;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      
      // FormSubmit will handle the email sending
      // The form will submit normally to FormSubmit
      
      // Create a temporary form to submit the data
      const form = e.target;
      const formDataToSubmit = new FormData(form);
      
      // Add the captcha value to the form data
      formDataToSubmit.append('captcha', captchaInput);
      
      fetch(form.action, {
        method: 'POST',
        body: formDataToSubmit,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          setIsSubmitted(true);
          // Reset form after successful submission
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
          generateCaptcha();
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form. Please try again later.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
    }
  };
  
  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1 className="animated-title">Get in Touch</h1>
        <p className="animated-subtitle">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
      </div>
      
      {isSubmitted ? (
        <div className="submission-success">
          <div className="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="25" fill="none"/>
              <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <h2>Thank You for Your Message!</h2>
          <p>We've received your inquiry and will respond to you within 24 hours.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="back-to-form-btn"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <div className="contact-content">
          <form 
            ref={formRef}
            className="contact-form animated-form" 
            onSubmit={handleSubmit}
            action="https://formsubmit.co/sisirao566@gmail.com"
            method="POST"
          >
            {/* Add FormSubmit hidden fields */}
            <input type="hidden" name="_subject" value="New contact form submission from Pizza Restaurant!" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_autoresponse" value="Thank you for contacting us! We'll get back to you within 24 hours." />
            <input type="hidden" name="_next" value="http://localhost:3000/contact#success" />
            
            <h2>Send Us a Message</h2>
            
            <div className="form-row">
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
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  required 
                />
                <label htmlFor="phone">Your Phone</label>
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                  required 
                />
                <label htmlFor="subject">Subject</label>
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                required 
                rows="5"
              ></textarea>
              <label htmlFor="message">Your Message</label>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            
            {/* CAPTCHA Section */}
            <div className="captcha-container">
              <div className="captcha-display">
                <span>{captchaText}</span>
                <button type="button" onClick={generateCaptcha} className="refresh-captcha">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                </button>
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  id="captcha" 
                  name="captcha" 
                  value={captchaInput}
                  onChange={handleChange}
                  placeholder="Enter CAPTCHA code"
                  className={captchaError ? 'error' : ''}
                  required 
                />
                {captchaError && <span className="error-message">{captchaError}</span>}
              </div>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="submitting-animation">
                  <div className="spinner"></div>
                  <span>Sending...</span>
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
            
            <div className="whatsapp-button">
              <a href="https://wa.me/91868826727" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
                </svg>
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
      
      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.522184210635!2d78.3842743148772!3d17.43495098804973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e8aaefb1d7%3A0x5e02bdd5e6483fa2!2sPizza%20Street!5e0!3m2!1sen!2sin!4v1639567896543!5m2!1sen!2sin" 
          width="100%" 
          height="450" 
          style={{border: 0}} 
          allowFullScreen="" 
          loading="lazy" 
          title="Our Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;