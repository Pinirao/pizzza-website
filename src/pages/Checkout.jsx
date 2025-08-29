import React from 'react';
import { useHistory } from 'react-router-dom';
import Cart from '../components/Cart';

const Checkout = () => {
    const history = useHistory();

    const handlePayment = () => {
        // Logic for handling payment would go here
        alert('Payment successful!');
        history.push('/'); // Redirect to home after payment
    };

    return (
        <div className="checkout">
            <h1>Checkout</h1>
            <Cart />
            <button onClick={handlePayment} className="checkout-button">
                Complete Purchase
            </button>
        </div>
    );
};

export default Checkout;