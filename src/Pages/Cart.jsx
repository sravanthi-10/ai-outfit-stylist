import React from 'react';
import './Cart.css';
import { useCart } from '../Pages/CartContext';
//import { useNavigate } from 'react-router-dom';  

const Cart = () => {
  const { state, dispatch } = useCart();
  //const navigate = useNavigate();  

  const removeItem = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  };

  const updateQuantity = (product, quantity) => {
    if (quantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity },
    });
  };

  const calculateTotalAmount = () => {
    return state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      
      {state.cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {state.cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
                </div>
                <p className="cart-item-price">₹ {item.price * item.quantity}</p>
              </div>
              
              <button className="cart-item-remove-btn" onClick={() => removeItem(item)}>Remove</button>
            </div>
          ))}
          
          <div className="cart-total">
            <p>Total Amount: ₹ {calculateTotalAmount()}</p>
          </div>
        </div>
      )}
    </div>

  );
};

export default Cart;
