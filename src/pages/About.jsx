import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Marco Rossi",
      role: "Head Chef",
      image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      bio: "With over 20 years of experience in Italian cuisine, Marco brings authentic flavors from Naples to your plate.",
      specialties: ["Neapolitan Pizza", "Traditional Recipes"]
    },
    {
      id: 2,
      name: "Sophia Chen",
      role: "Pastry Chef",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      bio: "Sophia's desserts have won multiple awards, and her tiramisu is legendary among our regulars.",
      specialties: ["Desserts", "Gelato", "Pastries"]
    },
    {
      id: 3,
      name: "Antonio García",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=897&q=80",
      bio: "Antonio ensures everything runs smoothly, from supply chain to customer experience.",
      specialties: ["Operations", "Customer Service"]
    },
    {
      id: 4,
      name: "Lena Petrova",
      role: "Master Pizzaiola",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=886&q=80",
      bio: "Lena trained in Italy for 5 years and has perfected the art of wood-fired pizza making.",
      specialties: ["Wood-Fired Pizza", "Dough Mastery"]
    }
  ];

  // Values data
  const values = [
    {
      title: "Quality Ingredients",
      description: "We source only the finest, freshest ingredients from local farmers and trusted Italian suppliers.",
      icon: "🌱"
    },
    {
      title: "Authentic Recipes",
      description: "Our recipes have been passed down through generations, preserving traditional Italian flavors.",
      icon: "📜"
    },
    {
      title: "Craftsmanship",
      description: "Every pizza is handcrafted with care and baked to perfection in our wood-fired ovens.",
      icon: "👨‍🍳"
    },
    {
      title: "Community",
      description: "We believe in building relationships with our customers and supporting our local community.",
      icon: "🤝"
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title"
          >
            Our Story of Passion & Flavor
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle"
          >
            Crafting authentic Italian pizzas with love since 1995
          </motion.p>
        </div>
        <div className="hero-image">
          <motion.img 
            src="https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80" 
            alt="Artisan pizza"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </section>

      {/* Tabs Section */}
      <section className="about-tabs">
        <div className="tabs-header">
          <button 
            className={activeTab === 'story' ? 'active' : ''}
            onClick={() => setActiveTab('story')}
          >
            Our Story
          </button>
          <button 
            className={activeTab === 'team' ? 'active' : ''}
            onClick={() => setActiveTab('team')}
          >
            Our Team
          </button>
          <button 
            className={activeTab === 'values' ? 'active' : ''}
            onClick={() => setActiveTab('values')}
          >
            Our Values
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'story' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="story-content"
            >
              <div className="story-text">
                <h2>From Naples to Your Neighborhood</h2>
                <p>Our journey began in 1995 when founder Giovanni Bianchi returned from Naples, Italy with a dream to bring authentic Italian pizza to his hometown. Starting as a small family operation, we've grown into a beloved local institution while staying true to our roots.</p>
                <p>Every pizza we serve is a testament to our commitment to tradition and quality. Our dough is fermented for 48 hours, our sauce is made from San Marzano tomatoes imported from Italy, and our mozzarella is freshly made each day.</p>
                <div className="stats-container">
                  <div className="stat">
                    <span className="stat-number">28</span>
                    <span className="stat-label">Years Serving</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">10K+</span>
                    <span className="stat-label">Happy Customers</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">100+</span>
                    <span className="stat-label">Awards Won</span>
                  </div>
                </div>
              </div>
              <div className="story-image">
                <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Restaurant interior" />
              </div>
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="team-content"
            >
              <h2>Meet Our Culinary Artists</h2>
              <p className="team-intro">Our talented team brings passion and expertise to every dish we create.</p>
              <div className="team-grid">
                {teamMembers.map(member => (
                  <motion.div 
                    key={member.id}
                    className="team-card"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="member-image">
                      <img src={member.image} alt={member.name} />
                      <div className="image-overlay">
                        <div className="specialties">
                          {member.specialties.map((spec, index) => (
                            <span key={index} className="specialty">{spec}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="member-info">
                      <h3>{member.name}</h3>
                      <p className="role">{member.role}</p>
                      <p className="bio">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'values' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="values-content"
            >
              <h2>What We Stand For</h2>
              <p className="values-intro">Our commitment to excellence guides everything we do.</p>
              <div className="values-grid">
                {values.map((value, index) => (
                  <motion.div 
                    key={index}
                    className="value-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="value-icon">{value.icon}</div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={ref} className="testimonials-section">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.6 }}
        >
          What Our Customers Say
        </motion.h2>
        <motion.div 
          className="testimonials-container"
          variants={staggerChildren}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="testimonial" variants={fadeIn}>
            <div className="testimonial-content">
              <p>"The best pizza I've ever had outside of Italy! The crust is perfectly crispy and the ingredients are always fresh."</p>
              <div className="testimonial-author">
                <span className="author-name">Sarah Johnson</span>
                <span className="author-desc">Food Critic</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="testimonial" variants={fadeIn}>
            <div className="testimonial-content">
              <p>"This place has become our family's weekly tradition. The atmosphere is warm, and the staff feels like family."</p>
              <div className="testimonial-author">
                <span className="author-name">Mike Thompson</span>
                <span className="author-desc">Regular Customer</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="testimonial" variants={fadeIn}>
            <div className="testimonial-content">
              <p>"As an Italian expat, I can say this is the most authentic pizza I've found outside my homeland. Bravo!"</p>
              <div className="testimonial-author">
                <span className="author-name">Giulia Rossi</span>
                <span className="author-desc">From Naples, Italy</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Visit Us Section */}
      <section className="visit-section">
        <div className="visit-content">
          <div className="visit-text">
            <h2>Visit Us</h2>
            <p>Experience the taste of authentic Italian pizza in a warm, welcoming atmosphere.</p>
            <div className="info-item">
              <strong>Address:</strong>
              <span>123 Pizza Street, Food City, FC 12345</span>
            </div>
            <div className="info-item">
              <strong>Hours:</strong>
              <span>Mon-Thu: 11am-10pm | Fri-Sat: 11am-11pm | Sun: 12pm-9pm</span>
            </div>
            <div className="info-item">
              <strong>Contact:</strong>
              <span>(123) 456-7890 | info@pizzaparadise.com</span>
            </div>
            <button className="cta-button">Get Directions</button>
          </div>
          <div className="visit-image">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Restaurant ambiance" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          overflow-x: hidden;
        }
        
        /* Hero Section */
        .about-hero {
          display: flex;
          align-items: center;
          min-height: 80vh;
          padding: 40px 20px;
          background: linear-gradient(135deg, #fff 0%, #f9f9f9 100%);
        }
        
        .hero-content {
          flex: 1;
          padding: 0 40px;
        }
        
        .hero-title {
          font-size: 3.5rem;
          color: #2c3e50;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          color: #7f8c8d;
          margin-bottom: 30px;
          max-width: 500px;
        }
        
        .hero-image {
          flex: 1;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .hero-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 20px;
        }
        
        /* Tabs Section */
        .about-tabs {
          padding: 80px 20px;
          background: #fff;
        }
        
        .tabs-header {
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
          border-bottom: 1px solid #eee;
        }
        
        .tabs-header button {
          padding: 15px 30px;
          background: none;
          border: none;
          font-size: 1.1rem;
          font-weight: 600;
          color: #7f8c8d;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .tabs-header button:hover {
          color: #e74c3c;
        }
        
        .tabs-header button.active {
          color: #e74c3c;
        }
        
        .tabs-header button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #e74c3c;
          border-radius: 3px 3px 0 0;
        }
        
        .tab-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        /* Story Content */
        .story-content {
          display: flex;
          gap: 40px;
          align-items: center;
        }
        
        .story-text {
          flex: 1;
        }
        
        .story-text h2 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 20px;
        }
        
        .story-text p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #5a5a5a;
          margin-bottom: 20px;
        }
        
        .stats-container {
          display: flex;
          gap: 30px;
          margin-top: 40px;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #e74c3c;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: #7f8c8d;
        }
        
        .story-image {
          flex: 1;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .story-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
        
        /* Team Content */
        .team-content h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 20px;
        }
        
        .team-intro {
          text-align: center;
          font-size: 1.1rem;
          color: #7f8c8d;
          margin-bottom: 50px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }
        
        .team-card {
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .member-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }
        
        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .team-card:hover .member-image img {
          transform: scale(1.1);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(231, 76, 60, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .team-card:hover .image-overlay {
          opacity: 1;
        }
        
        .specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          padding: 0 15px;
        }
        
        .specialty {
          background: #fff;
          color: #e74c3c;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .member-info {
          padding: 20px;
        }
        
        .member-info h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .role {
          color: #e74c3c;
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 0.9rem;
        }
        
        .bio {
          color: #7f8c8d;
          line-height: 1.5;
          font-size: 0.95rem;
        }
        
        /* Values Content */
        .values-content h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 20px;
        }
        
        .values-intro {
          text-align: center;
          font-size: 1.1rem;
          color: #7f8c8d;
          margin-bottom: 50px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }
        
        .value-card {
          background: #fff;
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .value-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .value-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        
        .value-card h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-bottom: 15px;
        }
        
        .value-card p {
          color: #7f8c8d;
          line-height: 1.6;
        }
        
        /* Testimonials Section */
        .testimonials-section {
          padding: 80px 20px;
          background: #f8f9fa;
        }
        
        .testimonials-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 50px;
        }
        
        .testimonials-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .testimonial {
          background: #fff;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
        }
        
        .testimonial-content p {
          font-style: italic;
          color: #5a5a5a;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }
        
        .testimonial-author {
          display: flex;
          flex-direction: column;
        }
        
        .author-name {
          font-weight: 700;
          color: #2c3e50;
        }
        
        .author-desc {
          font-size: 0.9rem;
          color: #7f8c8d;
        }
        
        /* Visit Us Section */
        .visit-section {
          padding: 80px 20px;
          background: #fff;
        }
        
        .visit-content {
          display: flex;
          gap: 40px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .visit-text {
          flex: 1;
        }
        
        .visit-text h2 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 20px;
        }
        
        .visit-text > p {
          font-size: 1.1rem;
          color: #7f8c8d;
          margin-bottom: 30px;
        }
        
        .info-item {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        }
        
        .info-item strong {
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .cta-button {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.3s ease;
        }
        
        .cta-button:hover {
          background: #c0392b;
          transform: translateY(-3px);
        }
        
        .visit-image {
          flex: 1;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .visit-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
        
        /* Responsive Design */
        @media (max-width: 968px) {
          .about-hero {
            flex-direction: column;
            text-align: center;
          }
          
          .hero-content {
            padding: 0 20px 40px;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.2rem;
            margin-left: auto;
            margin-right: auto;
          }
          
          .story-content {
            flex-direction: column;
          }
          
          .visit-content {
            flex-direction: column;
          }
        }
        
        @media (max-width: 768px) {
          .tabs-header {
            flex-direction: column;
            align-items: center;
          }
          
          .tabs-header button {
            width: 100%;
            text-align: center;
          }
          
          .stats-container {
            flex-direction: column;
            gap: 20px;
          }
          
          .hero-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default About;