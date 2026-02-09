import React from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import './cart.css';

function Cart() {
  const { state, dispatch } = useAppContext();

  const handleDeleteItem = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', id: itemId });
    toast.info('Item removed from the cart.');
  };

  const handleIncrement = (itemId) => {
    dispatch({ type: 'INCREMENT_ITEM', id: itemId });
    toast.success('Item quantity increased.');
  };

  const handleDecrement = (itemId) => {
    dispatch({ type: 'DECREMENT_ITEM', id: itemId });
    toast.warning('Item quantity decreased.');
  };

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('User not logged in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId,
          items: state.cart
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        dispatch({ type: 'CLEAR_CART' });
      } else {
        toast.error(result.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <ul className="cart-items">
        {state.cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          state.cart.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <p>{item.name} - ${item.price} x {item.quantity}</p>
              <div className="cart-controls">
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item.id)}>+</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="total-section">
        <h2>Total: ${calculateTotal()}</h2>
        <button onClick={handlePlaceOrder} className="place-order-button">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
