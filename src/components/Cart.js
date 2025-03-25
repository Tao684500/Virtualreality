import React from 'react';
import "../scss/cart.scss";

const Cart = ({ cartItems, onClearCart, onCheckout, showCart, toggleCart }) => {
  const totalItems = cartItems.length;

  let totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);

  if (totalItems > 5) {
    totalPrice *= 0.8; // 20% Discount
  } else if (totalItems > 3) {
    totalPrice *= 0.9; // 10% Discount
  }

  return (
    <div className={`cart ${showCart ? 'show' : ''}`}>
      <div className="cart-header">
        <h3>Cart</h3>
      </div>
      {totalItems > 0 ? (
        <div className='list-table'>
          <div className='header-table'>
            <div className='txt-table'>Name</div>
            <div className='txt-price'>Price</div>
          </div>
          {cartItems.map((item, index) => (
            <div className='table-detail' key={index}>
              <div className='table'>{item.title}</div>
              <div className='price'>${item.price}</div>
            </div>
          ))}
          <h4 className='total'>Total: ${totalPrice.toFixed(2)}</h4>
          <div className='btn'>
          <button className='btn-red' onClick={onClearCart}>Clear Cart</button>
          <button className='btn-green ' onClick={onCheckout}>Checkout</button>
          </div>
        </div>
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
};

export default Cart;
