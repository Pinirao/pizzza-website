import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [checkoutStage, setCheckoutStage] = useState('cart'); // 'cart', 'checkout', 'success'
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  // Calculate prices
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const deliveryFee = subtotal > 0 ? 3.99 : 0;
  const total = subtotal + tax + deliveryFee - discount;

  // Animation for cart items
  useEffect(() => {
    if (cartItems.length === 0 && checkoutStage === 'cart') {
      const timer = setTimeout(() => {
        setIsCartOpen(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cartItems, checkoutStage]);

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'PIZZA20') {
      setDiscount(subtotal * 0.2);
      setCouponMessage('20% discount applied!');
    } else if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscount(10);
      setCouponMessage('$10 discount applied!');
    } else {
      setDiscount(0);
      setCouponMessage('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    setCheckoutStage('checkout');
  };

  const handlePlaceOrder = () => {
    setCheckoutStage('success');
    // In a real app, you would process the order here
  };

  const continueShopping = () => {
    setCheckoutStage('cart');
    setDiscount(0);
    setCouponCode('');
    setCouponMessage('');
  };

  if (!isCartOpen && cartItems.length === 0) {
    return (
      <div className="cart-closed">
        <button className="open-cart-btn" onClick={() => setIsCartOpen(true)}>
          <span className="cart-icon">🛒</span>
          <span className="item-count">0</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`cart-container ${isCartOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Your Order</h2>
        <button className="close-cart" onClick={() => setIsCartOpen(false)}>×</button>
      </div>

      {checkoutStage === 'success' ? (
        <div className="order-success">
          <div className="success-animation">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <h3>Order Confirmed!</h3>
          <p>Your delicious pizza is on its way</p>
          <p>Estimated delivery: 30-45 minutes</p>
          <button className="continue-shopping-btn" onClick={continueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : checkoutStage === 'checkout' ? (
        <div className="checkout-form">
          <h3>Delivery Information</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Delivery Address</label>
            <input type="text" placeholder="123 Pizza Street" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="(123) 456-7890" />
          </div>
          <div className="form-group">
            <label>Payment Method</label>
            <div className="payment-options">
              <label className="payment-option">
                <input type="radio" name="payment" defaultChecked />
                <span>Credit Card</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment" />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
          <button className="back-to-cart" onClick={() => setCheckoutStage('cart')}>
            ← Back to Cart
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add something delicious!</p>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{ width: 60, height: 40, objectFit: "cover", borderRadius: "6px" }}
                    />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-description">{item.description}</p>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >−</button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => removeItem(item.id)}
                  >×</button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-summary">
              <div className="coupon-section">
                <input 
                  type="text" 
                  placeholder="Coupon code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button onClick={applyCoupon}>Apply</button>
              </div>
              {couponMessage && (
                <p className={`coupon-message ${discount > 0 ? 'success' : 'error'}`}>
                  {couponMessage}
                </p>
              )}

              <div className="price-details">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="price-row discount">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="price-row">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;