import React from 'react';

function PizzaCard({ pizza, onAddToCart }) {
  return (
    <div>
      <h3>{pizza.name}</h3>
      <p>{pizza.description}</p>
      <button onClick={() => onAddToCart(pizza)}>Add to Cart</button>
    </div>
  );
}

export default PizzaCard;