import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import Title from "./Title";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/${userId}/cart`);
      setCartItems(response.data.cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/cart/${userId}/${productId}`);
      setCartItems(cartItems.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="cart-containerr">
      <Title text1={"SAVED"} text2={"ITEMS"} />
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img 
              src={item.image[0]} 
              alt={item.title} 
              className="cart-item-image"
              onClick={() => navigate(`/product/${item._id}`)} 
              style={{ cursor: "pointer" }}
            />
            <div className="cart-item-details">
              <h3 onClick={() => navigate(`/product/${item._id}`)} style={{ cursor: "pointer" }}>
                {item.title}
              </h3>
              <p>Price per day: <strong>Rs {item.pricePerDay}</strong></p>
              <button className="remove-btn" onClick={() => removeItemFromCart(item._id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
