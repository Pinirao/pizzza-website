import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

function PizzaCard({ pizza, onAddToCart, onIncrement, onDecrement, getQuantity }) {
  const quantity = getQuantity(pizza.id);
  
  return (
    <div className="pizza-card">
      <div className="pizza-image-container">
        <img src={pizza.img} alt={pizza.name} />
        <div className="badge-container">
          {pizza.isPopular && <span className="popular-badge">🔥 Popular</span>}
          {pizza.isNew && <span className="new-badge">🆕 New</span>}
        </div>
        <div className="pizza-overlay">
          <button className="quick-view-btn">Quick View</button>
        </div>
      </div>
      
      <div className="pizza-info">
        <h3>{pizza.name}</h3>
        <p className="pizza-description">{pizza.description}</p>
        
        <div className="pizza-details">
          <div className="rating">
            {'⭐'.repeat(Math.floor(pizza.rating || 4))} 
            <span>({pizza.reviews || 50}+)</span>
          </div>
          
          <div className="tags">
            {pizza.tags?.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        
        <div className="price-add-container">
          <div className="price">
            <span className="current-price">₹{pizza.price}</span>
            {pizza.originalPrice && (
              <span className="original-price">₹{pizza.originalPrice}</span>
            )}
          </div>
          
          {quantity > 0 ? (
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={() => onDecrement(pizza)}>-</button>
              <span className="quantity-count">{quantity}</span>
              <button className="quantity-btn" onClick={() => onIncrement(pizza)}>+</button>
            </div>
          ) : (
            <button className="add-to-cart-btn" onClick={() => onAddToCart(pizza)}>
              <span className="cart-icon">🛒</span> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Menu() {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [pizzas, setPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulating API call
    const pizzaData = [
      {
        id: 1,
        name: "Margherita",
        price: 299,
        originalPrice: 399,
        img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=400&q=80",
        description: "Classic delight with 100% real mozzarella cheese",
        rating: 4.5,
        reviews: 120,
        tags: ["Vegetarian", "Classic"],
        category: "vegetarian"
      },
      { 
        id: 2, 
        name: "Pepperoni", 
        price: 349, 
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
        description: "Spicy pepperoni with extra cheese",
        rating: 4.7,
        reviews: 95,
        tags: ["Non-Vegetarian", "Spicy"],
        category: "non-vegetarian",
        isPopular: true
      },
      { 
        id: 3, 
        name: "Veggie Paradise", 
        price: 329, 
        img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
        description: "Golden corn, black olives, capsicum, and red paprika",
        rating: 4.3,
        reviews: 76,
        tags: ["Vegetarian", "Healthy"],
        category: "vegetarian"
      },
      { 
        id: 4, 
        name: "Paneer Tikka", 
        price: 379, 
        img: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
        description: "Flavorful paneer with spicy tikka masala",
        rating: 4.6,
        reviews: 112,
        tags: ["Vegetarian", "Spicy"],
        category: "vegetarian",
        isPopular: true
      },
      { 
        id: 5, 
        name: "Chicken Supreme", 
        price: 429, 
        img: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
        description: "Chicken sausage, chicken pepperoni, and grilled chicken",
        rating: 4.8,
        reviews: 88,
        tags: ["Non-Vegetarian", "Premium"],
        category: "non-vegetarian"
      },
      { 
        id: 6, 
        name: "Farmhouse", 
        price: 359, 
        img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
        description: "Capsicum, mushrooms, tomatoes, and onions",
        rating: 4.4,
        reviews: 64,
        tags: ["Vegetarian", "Classic"],
        category: "vegetarian"
      },
      { 
        id: 7, 
        name: "BBQ Chicken", 
        price: 449, 
        img: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
        description: "Grilled chicken with BBQ sauce and onions",
        rating: 4.9,
        reviews: 102,
        tags: ["Non-Vegetarian", "Premium"],
        category: "non-vegetarian",
        isPopular: true
      },
      { 
        id: 8, 
        name: "Truffle Mushroom", 
        price: 499, 
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
        description: "Gourmet pizza with truffle oil and assorted mushrooms",
        rating: 4.7,
        reviews: 57,
        tags: ["Vegetarian", "Premium", "New"],
        category: "premium",
        isNew: true
      }
    ];
    
    setPizzas(pizzaData);
    setFilteredPizzas(pizzaData);
  }, []);

  useEffect(() => {
    filterAndSortPizzas();
  }, [activeFilter, sortBy, searchQuery, pizzas]);

  const filterAndSortPizzas = () => {
    let filtered = [...pizzas];
    
    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(pizza => pizza.category === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pizza => 
        pizza.name.toLowerCase().includes(query) || 
        pizza.description.toLowerCase().includes(query) ||
        pizza.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
      default:
        // Default sorting (by id)
        filtered.sort((a, b) => a.id - b.id);
    }
    
    setFilteredPizzas(filtered);
  };

  const handleAddToCart = (pizza) => {
    addToCart({...pizza, quantity: 1});
  };

  const handleIncrement = (pizza) => {
    updateQuantity(pizza.id, (cartItems.find(item => item.id === pizza.id)?.quantity || 0) + 1);
  };

  const handleDecrement = (pizza) => {
    const currentItem = cartItems.find(item => item.id === pizza.id);
    if (currentItem && currentItem.quantity > 1) {
      updateQuantity(pizza.id, currentItem.quantity - 1);
    } else {
      updateQuantity(pizza.id, 0); // This should remove the item from cart
    }
  };

  const getQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <div className="menu-hero">
        <div className="hero-content">
          <h1>Artisanal Pizzas Crafted with Passion</h1>
          <p>Discover our handcrafted pizzas made with the finest ingredients and traditional techniques</p>
        </div>
      </div>
      
      {/* Menu Controls */}
      <div className="menu-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search pizzas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filters-container">
          <div className="category-filters">
            <button 
              className={activeFilter === 'all' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setActiveFilter('all')}
            >
              All Pizzas
            </button>
            <button 
              className={activeFilter === 'vegetarian' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setActiveFilter('vegetarian')}
            >
              🥗 Vegetarian
            </button>
            <button 
              className={activeFilter === 'non-vegetarian' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setActiveFilter('non-vegetarian')}
            >
              🍗 Non-Veg
            </button>
            <button 
              className={activeFilter === 'premium' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setActiveFilter('premium')}
            >
              💎 Premium
            </button>
          </div>
          
          <div className="sort-filter">
            <div className="sort-label">Sort by:</div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="popular">Popularity</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Pizza Grid */}
      <div className="pizza-grid">
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map(pizza => (
            <PizzaCard 
              key={pizza.id} 
              pizza={pizza} 
              onAddToCart={handleAddToCart}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              getQuantity={getQuantity}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>No pizzas found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .menu-page {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .menu-hero {
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                      url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80');
          background-size: cover;
          background-position: center;
          height: 300px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .menu-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(231, 76, 60, 0.8) 0%, rgba(192, 57, 43, 0.8) 100%);
          mix-blend-mode: multiply;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
          padding: 0 20px;
        }
        
        .hero-content h1 {
          font-size: 2.8rem;
          margin-bottom: 15px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        
        .hero-content p {
          font-size: 1.2rem;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .menu-controls {
          margin-bottom: 30px;
        }
        
        .search-box {
          position: relative;
          max-width: 500px;
          margin: 0 auto 30px;
        }
        
        .search-box input {
          width: 100%;
          padding: 16px 20px 16px 50px;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .search-box input:focus {
          outline: none;
          border-color: #e74c3c;
          box-shadow: 0 4px 16px rgba(231, 76, 60, 0.15);
        }
        
        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #7f8c8d;
          font-size: 1.2rem;
        }
        
        .filters-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          background: white;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }
        
        .category-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .filter-btn {
          padding: 10px 20px;
          border: 2px solid #e9ecef;
          background: white;
          color: #5a6c7d;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .filter-btn:hover {
          border-color: #e74c3c;
          color: #e74c3c;
          transform: translateY(-2px);
        }
        
        .filter-btn.active {
          background: #e74c3c;
          border-color: #e74c3c;
          color: white;
          box-shadow: 0 4px 12px rgba(231, 76, 60, 0.25);
        }
        
        .sort-filter {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .sort-label {
          font-weight: 500;
          color: #5a6c7d;
          white-space: nowrap;
        }
        
        .sort-select {
          padding: 10px 16px;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          background: white;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .sort-select:focus {
          outline: none;
          border-color: #e74c3c;
        }
        
        .pizza-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }
        
        .pizza-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .pizza-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
        }
        
        .pizza-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .pizza-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .pizza-card:hover .pizza-image-container img {
          transform: scale(1.1);
        }
        
        .badge-container {
          position: absolute;
          top: 15px;
          left: 15px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 2;
        }
        
        .popular-badge, .new-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .popular-badge {
          background: #e74c3c;
          color: white;
        }
        
        .new-badge {
          background: #27ae60;
          color: white;
        }
        
        .pizza-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .pizza-card:hover .pizza-overlay {
          opacity: 1;
        }
        
        .quick-view-btn {
          background: white;
          color: #e74c3c;
          border: none;
          padding: 12px 20px;
          border-radius: 24px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .quick-view-btn:hover {
          background: #e74c3c;
          color: white;
          transform: scale(1.05);
        }
        
        .pizza-info {
          padding: 20px;
        }
        
        .pizza-info h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #2c3e50;
          font-weight: 600;
        }
        
        .pizza-description {
          color: #7f8c8d;
          margin-bottom: 15px;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .pizza-details {
          margin-bottom: 20px;
        }
        
        .rating {
          color: #f39c12;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .rating span {
          color: #7f8c8d;
          font-size: 0.8rem;
        }
        
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .tag {
          background: #f8f9fa;
          color: #5a6c7d;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 500;
        }
        
        .price-add-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .price {
          display: flex;
          flex-direction: column;
        }
        
        .current-price {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2c3e50;
        }
        
        .original-price {
          font-size: 0.9rem;
          text-decoration: line-through;
          color: #7f8c8d;
        }
        
        .add-to-cart-btn {
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(231, 76, 60, 0.25);
        }
        
        .add-to-cart-btn:hover {
          background: #c0392b;
          transform: scale(1.05);
        }
        
        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8f9fa;
          border-radius: 12px;
          padding: 8px;
        }
        
        .quantity-btn {
          background: #e74c3c;
          color: white;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s ease;
        }
        
        .quantity-btn:hover {
          transform: scale(1.1);
        }
        
        .quantity-count {
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }
        
        .cart-icon {
          font-size: 1.2rem;
        }
        
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 40px;
          color: #7f8c8d;
        }
        
        .no-results h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #5a6c7d;
        }
        
        @media (max-width: 768px) {
          .menu-hero {
            height: 250px;
          }
          
          .hero-content h1 {
            font-size: 2.2rem;
          }
          
          .filters-container {
            flex-direction: column;
            align-items: stretch;
          }
          
          .category-filters {
            justify-content: center;
          }
          
          .sort-filter {
            justify-content: center;
          }
        }
        
        @media (max-width: 576px) {
          .menu-hero {
            height: 200px;
          }
          
          .hero-content h1 {
            font-size: 1.8rem;
          }
          
          .hero-content p {
            font-size: 1rem;
          }
          
          .category-filters {
            gap: 8px;
          }
          
          .filter-btn {
            padding: 8px 16px;
            font-size: 0.85rem;
          }
          
          .sort-filter {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}

export default Menu;