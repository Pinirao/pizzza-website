import React from 'react';

function PizzaCard({ pizza, onAddToCart }) {
  const { name, price = 0, img } = pizza;

  return (
    <div className="pizza-card">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p>₹{Number(price).toFixed(2)}</p>
      <button className="button" onClick={() => onAddToCart(pizza)}>
        Add to Cart
      </button>
    </div>
  );
}

export default PizzaCard;