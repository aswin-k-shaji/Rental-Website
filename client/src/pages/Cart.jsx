import React, { useContext, useEffect, useState } from 'react';
import { ShopeContext } from '../context/ShopeContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import './Cart.css';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopeContext);
  const [cartdata, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        tempData.push({
          _id: items,
          Quantity: cartItems[items]
        });
      }
    }
    setCartData(tempData); // Update the state here
    console.log(tempData);
  }, [cartItems]);

  return (
    <div className="cart-container">
      <div className="cart-title">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {
          cartdata.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className="cart-item">
                <div>
                  <img className='imgg' src={productData.image[0]} alt="" />
                  <div className="cart-item-details">
                    <p>{productData.title}</p>
                    <div className="cart-item-price">
                      <p>{currency}{productData.pricePerDay}</p>
                    </div>
                  </div>
                </div>
                <div className="cart-item-input">
                  <input onClick={(e)=>e.target.value === '' || e.target.value === '0'? null :updateQuantity(item._id,Number(e.target.value))} type="number" min={1} defaultValue={item.Quantity} />
                  <img onClick={()=>updateQuantity(item._id,0)} src={assets.bin_icon} alt="Remove item" className="cart-item-remove" />
                </div>
              </div>
            );
          })
        }
      </div>  
      <div className="cart-total">
        <CartTotal />
      </div>
      <div>
        <button onClick={()=>navigate('/place-order')} >Rent Items</button>
      </div>
    </div>
  );
}

export default Cart;
