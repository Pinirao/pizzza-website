import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MyAccount() {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'logout'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setView('logout');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setView('logout');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('login');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <div className="account-header">
          <h2>My Account</h2>
          <div className="account-tabs">
            <button 
              className={view === 'login' ? 'tab active' : 'tab'} 
              onClick={() => setView('login')}
            >
              Login
            </button>
            <button 
              className={view === 'register' ? 'tab active' : 'tab'} 
              onClick={() => setView('register')}
            >
              Register
            </button>
          </div>
        </div>

        <div className="account-content">
          {view === 'login' && (
            <form className="account-form" onSubmit={handleLogin}>
              <div className="input-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
                <span className="input-icon">✉️</span>
              </div>
              <div className="input-group">
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
                <span className="input-icon">🔒</span>
              </div>
              <div className="form-options">
                <label className="checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
              <button type="submit" className="btn-primary">Login</button>
              <div className="divider">
                <span>Or continue with</span>
              </div>
              <div className="social-login">
                <button type="button" className="btn-social google">
                  <span className="social-icon">G</span>
                  Google
                </button>
                <button type="button" className="btn-social facebook">
                  <span className="social-icon">f</span>
                  Facebook
                </button>
              </div>
              <p className="form-switch">
                New user?{' '}
                <button type="button" onClick={() => setView('register')}>
                  Create an account
                </button>
              </p>
            </form>
          )}

          {view === 'register' && (
            <form className="account-form" onSubmit={handleRegister}>
              <div className="input-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
                <span className="input-icon">👤</span>
              </div>
              <div className="input-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
                <span className="input-icon">✉️</span>
              </div>
              <div className="input-group">
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
                <span className="input-icon">🔒</span>
              </div>
              <label className="checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                I agree to the Terms and Privacy Policy
              </label>
              <button type="submit" className="btn-primary">Create Account</button>
              <div className="divider">
                <span>Or continue with</span>
              </div>
              <div className="social-login">
                <button type="button" className="btn-social google">
                  <span className="social-icon">G</span>
                  Google
                </button>
                <button type="button" className="btn-social facebook">
                  <span className="social-icon">f</span>
                  Facebook
                </button>
              </div>
              <p className="form-switch">
                Already have an account?{' '}
                <button type="button" onClick={() => setView('login')}>
                  Sign in
                </button>
              </p>
            </form>
          )}

          {view === 'logout' && isLoggedIn && (
            <div className="welcome-section">
              <div className="welcome-icon">🎉</div>
              <h3>Welcome back, {formData.name || 'Pizza Lover'}!</h3>
              <p>You're successfully logged in to your account.</p>
              <div className="account-actions">
                <Link to="/" className="btn-secondary">Browse Menu</Link>
                <Link to="/cart" className="btn-secondary">View Cart</Link>
              </div>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }
        
        .account-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
        }
        
        .account-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 450px;
          overflow: hidden;
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .account-header {
          background: linear-gradient(135deg, #ff7b5c 0%, #ff6347 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        
        .account-header h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
        }
        
        .account-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 4px;
        }
        
        .tab {
          flex: 1;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          padding: 10px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .tab.active {
          background: white;
          color: #ff6347;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .account-content {
          padding: 30px;
        }
        
        .account-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .input-group {
          position: relative;
        }
        
        .input-group input {
          width: 100%;
          padding: 16px 16px 16px 45px;
          border: 2px solid #f1f1f1;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .input-group input:focus {
          border-color: #ff6347;
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 99, 71, 0.2);
        }
        
        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
        }
        
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .checkbox {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 14px;
          color: #666;
        }
        
        .checkbox input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
        
        .checkmark {
          height: 18px;
          width: 18px;
          background-color: #f1f1f1;
          border-radius: 4px;
          margin-right: 8px;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .checkbox input:checked ~ .checkmark {
          background-color: #ff6347;
        }
        
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
          left: 6px;
          top: 2px;
          width: 4px;
          height: 9px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        .checkbox input:checked ~ .checkmark:after {
          display: block;
        }
        
        .forgot-link {
          color: #ff6347;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #ff7b5c 0%, #ff6347 100%);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(255, 99, 71, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 99, 71, 0.4);
        }
        
        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          color: #999;
          font-size: 14px;
        }
        
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #eee;
        }
        
        .divider::before {
          margin-right: 10px;
        }
        
        .divider::after {
          margin-left: 10px;
        }
        
        .social-login {
          display: flex;
          gap: 12px;
        }
        
        .btn-social {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border: 2px solid #f1f1f1;
          border-radius: 12px;
          background: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-social:hover {
          border-color: #ddd;
          transform: translateY(-1px);
        }
        
        .social-icon {
          font-weight: bold;
        }
        
        .form-switch {
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        
        .form-switch button {
          background: none;
          border: none;
          color: #ff6347;
          font-weight: 600;
          cursor: pointer;
        }
        
        .welcome-section {
          text-align: center;
          padding: 20px 0;
        }
        
        .welcome-icon {
          font-size: 60px;
          margin-bottom: 20px;
        }
        
        .welcome-section h3 {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }
        
        .welcome-section p {
          color: #666;
          margin-bottom: 25px;
        }
        
        .account-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 25px;
        }
        
        .btn-secondary {
          flex: 1;
          padding: 12px;
          border: 2px solid #ff6347;
          border-radius: 12px;
          color: #ff6347;
          text-decoration: none;
          font-weight: 600;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: rgba(255, 99, 71, 0.1);
        }
        
        .btn-logout {
          background: none;
          border: none;
          color: #999;
          text-decoration: underline;
          cursor: pointer;
          font-size: 14px;
        }
        
        @media (max-width: 480px) {
          .account-container {
            padding: 10px;
          }
          
          .account-header {
            padding: 20px;
          }
          
          .account-content {
            padding: 20px;
          }
          
          .social-login {
            flex-direction: column;
          }
          
          .account-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default MyAccount;