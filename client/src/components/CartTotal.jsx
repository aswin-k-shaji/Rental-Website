import React, { useContext } from 'react';
import { ShopeContext } from '../context/ShopeContext';
import Title from './Title';
import './CartTotal.css';

const CartTotal = () => {
  const { currency, getCartAmount } = useContext(ShopeContext);

  return (
    <div className="cart-total-container">
      <div className="cart-total-title">
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>

      <div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr className="cart-total-divider" />
        <div className="cart-total-summary">
          <b>Total</b>
          <b>{currency}{getCartAmount()}</b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
