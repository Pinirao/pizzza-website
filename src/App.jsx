import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // correct path
import './styles/main.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './components/Cart';
import MyAccount from './pages/MyAccount';
import Footer from './components/Footer';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/myaccount">My Account</Link>
    </nav>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <header>
          <h1>Pizza Website</h1>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myaccount" element={<MyAccount />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;