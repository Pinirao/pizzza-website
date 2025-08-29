import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext'; // <-- Import useCart
import { Link } from 'react-router-dom';

// 3D Slider Hero Section Component
const SliderHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoSlideRef = useRef(null);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Authentic Italian Pizza",
      subtitle: "Handcrafted with premium ingredients and baked to perfection"
    },
    {
      image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
      title: "Wood-Fired Excellence",
      subtitle: "Traditional cooking for authentic flavor in every bite"
    },
    {
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
      title: "Fresh Daily Ingredients",
      subtitle: "Locally sourced, organic ingredients for the perfect pizza"
    },
    {
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80",
      title: "Fast Delivery Guaranteed",
      subtitle: "Hot pizza delivered in 30 minutes or less"
    }
  ];

  // Set up automatic sliding
  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, []);

  const goToNextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="slider-hero">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''} ${
              index === currentSlide - 1 || (currentSlide === 0 && index === slides.length - 1)
                ? 'prev'
                : ''
            } ${
              index === currentSlide + 1 || (currentSlide === slides.length - 1 && index === 0)
                ? 'next'
                : ''
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <div className="hero-buttons">
                <Link to="/menu" className="btn-primary">Order Now</Link>
                <Link to="/menu" className="btn-secondary">View Menu</Link>
              </div>
            </div>
          </div>
        ))}
        
        <button className="slider-nav prev-btn" onClick={goToPrevSlide}>
          &#10094;
        </button>
        <button className="slider-nav next-btn" onClick={goToNextSlide}>
          &#10095;
        </button>
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

// Modern Pizza Card Component
const PizzaCard = ({ pizza, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="pizza-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pizza-image-container">
        <img src={pizza.image} alt={pizza.name} className="pizza-image" />
        <div className={`pizza-overlay ${isHovered ? 'overlay-visible' : ''}`}>
          <button className="quick-add-btn" onClick={() => onAddToCart(pizza)}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="pizza-info">
        <h3>{pizza.name}</h3>
        <p>{pizza.description}</p>
        <div className="price-add">
          <span className="price">${pizza.price.toFixed(2)}</span>
          <button className="add-button" onClick={() => onAddToCart(pizza)}>+</button>
        </div>
      </div>
    </div>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    { icon: '🚀', title: 'Fast Delivery', description: 'Hot pizza delivered in 30 minutes or less' },
    { icon: '👨‍🍳', title: 'Expert Chefs', description: 'Our pizzaiolos have decades of experience' },
    { icon: '🌱', title: 'Fresh Ingredients', description: 'Locally sourced, organic ingredients' },
    { icon: '🔥', title: 'Wood-Fired Oven', description: 'Traditional cooking for authentic flavor' }
  ];

  return (
    <section className="features">
      <div className="container">
        <h2>Why Choose Us</h2>
        <p className="section-subtitle">We're committed to delivering the best pizza experience</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      text: 'The best pizza I\'ve ever had! The crust is perfectly crispy and the ingredients are always fresh.', 
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
    },
    { 
      id: 2, 
      name: 'Mike Thompson', 
      text: 'Their delivery is always on time and the pizza arrives hot and delicious. Highly recommended!', 
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
    },
    { 
      id: 3, 
      name: 'Emily Rodriguez', 
      text: 'The variety of toppings and the quality of ingredients make Pizza Paradise my go-to pizza place.', 
      rating: 4,
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1899&q=80'
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <p className="section-subtitle">Don't just take our word for it</p>
        
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="customer-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="customer-info">
                  <h4>{testimonial.name}</h4>
                  <div className="rating">
                    {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                  </div>
                </div>
              </div>
              <p>"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section Component
const ProcessSection = () => {
  const steps = [
    { number: '01', title: 'Choose Your Pizza', description: 'Select from our menu or create your own custom pizza with fresh ingredients.' },
    { number: '02', title: 'We Prepare It', description: 'Our expert chefs handcraft your pizza with care using traditional methods.' },
    { number: '03', title: 'Bake to Perfection', description: 'Your pizza is baked in our wood-fired oven for that authentic flavor.' },
    { number: '04', title: 'Fast Delivery', description: 'We deliver your hot, fresh pizza right to your door in record time.' }
  ];

  return (
    <section className="process">
      <div className="container">
        <h2>How It Works</h2>
        <p className="section-subtitle">From our kitchen to your door in simple steps</p>
        
        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="process-visual">
          <div className="chef-image">
            <img src="https://images.alphacoders.com/101/1016857.jpg" alt="Pizza chef preparing dough" />
          </div>
          <div className="oven-image">
            <img src="https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80" alt="Wood-fired pizza oven" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Instagram Section Component
const InstagramSection = () => {
  const instagramPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', likes: '2,345', comments: '128' },
    { id: 2, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80', likes: '1,876', comments: '94' },
    { id: 3, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2035&q=80', likes: '3,210', comments: '201' },
    { id: 4, image: 'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80', likes: '2,567', comments: '156' },
    { id: 5, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80', likes: '1,943', comments: '112' },
    { id: 6, image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', likes: '2,801', comments: '178' }
  ];

  return (
    <section className="instagram">
      <div className="container">
        <h2>Follow Us on Instagram</h2>
        <p className="section-subtitle">@PizzaParadise #PizzaLovers</p>
        
        <div className="instagram-grid">
          {instagramPosts.map(post => (
            <div key={post.id} className="instagram-post">
              <img src={post.image} alt="Instagram post" />
              <div className="post-overlay">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Home Component
function Home() {
  const { addToCart } = useCart(); // <-- Use the context

  const featuredPizzas = [
    { id: 1, name: 'Margherita', description: 'Classic pizza with fresh mozzarella and basil', price: 12.99, image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' },
    { id: 2, name: 'Pepperoni', description: 'Spicy pepperoni with mozzarella cheese', price: 14.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80' },
    { id: 3, name: 'BBQ Chicken', description: 'Grilled chicken with BBQ sauce and red onions', price: 15.99, image: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80' },
    { id: 4, name: 'Vegetarian', description: 'Fresh vegetables and mozzarella on tomato sauce', price: 13.99, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2035&q=80' },
    { id: 5, name: 'Hawaiian', description: 'Ham, pineapple, and mozzarella cheese', price: 14.99, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: 6, name: 'Supreme', description: 'Pepperoni, sausage, mushrooms, peppers, and onions', price: 16.99, image: 'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80' },
  ];

  // Handler to add pizza to cart
  const handleAddToCart = (pizza) => {
    addToCart(pizza);
    // Optionally, redirect to cart page:
    // window.location.href = '/cart';
  };

  return (
    <div className="modern-pizza-app">
      <main>
        <SliderHeroSection />
        
        <FeaturesSection />
        
        <section className="featured-pizzas">
          <div className="container">
            <h2>Our Signature Pizzas</h2>
            <p className="section-subtitle">Handcrafted with the finest ingredients</p>
            
            <div className="pizza-grid">
              {featuredPizzas.map(pizza => (
                <PizzaCard key={pizza.id} pizza={pizza} onAddToCart={handleAddToCart} />
              ))}
            </div>
            
            <div className="view-all-container">
              <Link to="/menu" className="view-all-btn">View Full Menu</Link>
            </div>
          </div>
        </section>
        
        <ProcessSection />
        
        <TestimonialsSection />
        
        <InstagramSection />
        
        <section className="newsletter">
          <div className="container">
            <h2>Get Special Offers</h2>
            <p>Subscribe to our newsletter for exclusive deals and new flavor announcements</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;

// Modern CSS Styles
const styles = `
  /* Modern CSS Reset and Base Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
    overflow-x: hidden;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  /* Header Styles */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem 0;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: all 0.3s ease;
  }
  
  .header.scrolled {
    padding: 0.5rem 0;
    background-color: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  .header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.5rem;
  }
  
  .logo-icon {
    font-size: 2rem;
    margin-right: 0.5rem;
  }
  
  .nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  
  .nav a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .nav a:hover {
    color: #e74c3c;
  }
  
  .cta-button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }
  
  .mobile-menu-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .mobile-menu-toggle span {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 2px 0;
    transition: 0.3s;
  }
  
  /* Slider Hero Section */
  .slider-hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  margin-top: 0;
}
  
  .slider-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transform: scale(1.1);
    transition: all 0.8s cubic-bezier(0.77, 0, 0.175, 1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .slide.active {
    opacity: 1;
    transform: scale(1);
    z-index: 1;
  }
  
  .slide.prev {
    opacity: 0;
    transform: translateX(-100%) scale(1.1);
  }
  
  .slide.next {
    opacity: 0;
    transform: translateX(100%) scale(1.1);
  }
  
  .slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .slide-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    max-width: 800px;
    padding: 0 20px;
    transform: translateY(50px);
    transition: transform 0.8s ease;
  }
  
  .slide.active .slide-content {
    transform: translateY(0);
  }
  
  .slide-content h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .slide-content p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  
  .slider-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: background 0.3s ease;
  }
  
  .slider-nav:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  
  .prev-btn {
    left: 30px;
  }
  
  .next-btn {
    right: 30px;
  }
  
  .slider-dots {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 10;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .dot.active {
    background: white;
    transform: scale(1.2);
  }
  
  .dot:hover {
    background: rgba(255, 255, 255, 0.8);
  }
  
  /* Features Section */
  .features {
    padding: 5rem 0;
    background-color: #fff;
  }
  
  .features h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  .section-subtitle {
    text-align: center;
    color: #7f8c8d;
    margin-bottom: 3rem;
    font-size: 1.2rem;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .feature-card {
    text-align: center;
    padding: 2rem;
    border-radius: 10px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  .feature-card p {
    color: #7f8c8d;
  }
  
  /* Featured Pizzas Section */
  .featured-pizzas {
    padding: 5rem 0;
    background-color: #f8f9fa;
  }
  
  .featured-pizzas h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  .pizza-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .pizza-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .pizza-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  .pizza-image-container {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  .pizza-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .pizza-card:hover .pizza-image {
    transform: scale(1.1);
  }
  
  .pizza-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(231, 76, 60, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .overlay-visible {
    opacity: 1;
  }
  
  .quick-add-btn {
    background: white;
    color: #e74c3c;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .quick-add-btn:hover {
    background: #f8f9fa;
    transform: scale(1.05);
  }
  
  .pizza-info {
    padding: 1.5rem;
  }
  
  .pizza-info h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }
  
  .pizza-info p {
    color: #7f8c8d;
    margin-bottom: 1rem;
  }
  
  .price-add {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #e74c3c;
  }
  
  .add-button {
    background: #e74c3c;
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .add-button:hover {
    background: #c0392b;
    transform: rotate(90deg);
  }
  
  .view-all-container {
    text-align: center;
  }
  
  .view-all-btn {
    background: transparent;
    color: #e74c3c;
    border: 2px solid #e74c3c;
    padding: 0.8rem 2rem;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .view-all-btn:hover {
    background: #e74c3c;
    color: white;
    transform: translateY(-3px);
  }
  
  /* Process Section */
  .process {
    padding: 5rem 0;
    background: white;
  }
      /* Process Steps */
  .process-step {
    text-align: center;
    padding: 2rem;
  }
  
  .step-number {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #e74c3c;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto 1.5rem;
  }
  
  .process-step h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  .process-step p {
    color: #7f8c8d;
  }
  
  .process-visual {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .chef-image, .oven-image {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
  
  .chef-image img, .oven-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .chef-image:hover img, .oven-image:hover img {
    transform: scale(1.05);
  }
  
  /* Testimonials Section */
  .testimonials {
    padding: 5rem 0;
    background: #f8f9fa;
  }
  
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .testimonial-card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .testimonial-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .customer-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1rem;
  }
  
  .customer-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .customer-info h4 {
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }
  
  .rating {
    color: #f1c40f;
  }
  
  .testimonial-card p {
    font-style: italic;
    color: #7f8c8d;
  }
  
  /* Instagram Section */
  .instagram {
    padding: 5rem 0;
    background: white;
  }
  
  .instagram-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .instagram-post {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    aspect-ratio: 1/1;
  }
  
  .instagram-post img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .instagram-post:hover img {
    transform: scale(1.1);
  }
  
  .post-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(231, 76, 60, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .instagram-post:hover .post-overlay {
    opacity: 1;
  }
  
  /* Newsletter Section */
  .newsletter {
    padding: 5rem 0;
    background: #e74c3c;
    color: white;
    text-align: center;
  }
  
  .newsletter h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .newsletter p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .newsletter-form {
    display: flex;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .newsletter-form input {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 30px 0 0 30px;
    font-size: 1rem;
  }
  
  .newsletter-form button {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 1rem 1.5rem;
    border-radius: 0 30px 30px 0;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .newsletter-form button:hover {
    background: #1a252f;
  }
  
  /* Buttons */
  .btn-primary, .btn-secondary {
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
  }
  
  .btn-primary {
    background: #e74c3c;
    color: white;
    border: none;
  }
  
  .btn-primary:hover {
    background: #c0392b;
    transform: translateY(-3px);
  }
  
  .btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
  }
  
  .btn-secondary:hover {
    background: white;
    color: #e74c3c;
    transform: translateY(-3px);
  }
  
  /* Responsive Design */
  @media (max-width: 992px) {
    .slide-content h1 {
      font-size: 2.5rem;
    }
    
    .slide-content p {
      font-size: 1.2rem;
    }
    
    .process-visual {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .nav {
      position: fixed;
      top: 80px;
      left: 0;
      width: 100%;
      background: white;
      flex-direction: column;
      padding: 2rem;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .nav-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .mobile-menu-toggle {
      display: flex;
    }
    
    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .slider-nav {
      width: 40px;
      height: 40px;
    }
    
    .prev-btn {
      left: 15px;
    }
    
    .next-btn {
      right: 15px;
    }
    
    .newsletter-form {
      flex-direction: column;
      gap: 1rem;
    }
    
    .newsletter-form input,
    .newsletter-form button {
      border-radius: 30px;
    }
  }
  
  @media (max-width: 576px) {
    .slide-content h1 {
      font-size: 2rem;
    }
    
    .slide-content p {
      font-size: 1rem;
    }
    
    .features-grid,
    .pizza-grid,
    .testimonials-grid {
      grid-template-columns: 1fr;
    }
    
    .logo-text {
      font-size: 1.2rem;
    }
  }
  
  /* Animation Keyframes */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .modern-pizza-app {
    animation: fadeIn 1s ease-out;
  }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);