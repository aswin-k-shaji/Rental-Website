import React, { useEffect, useState } from "react";
import axios from "axios";
import './Orders.css'
import Title from "./Title"; 

const Orders = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from localStorage

      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch orders for the user
        const response = await axios.get(`http://localhost:4000/api/order/user/${userId}`);
        setOrders(response.data.orders); // Set the orders in state
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
<div className="orders-page">
  <Title text1={"Your"} text2={"Orders"} />
  {orders.length === 0 ? (
    <p className="no-orders">No orders found.</p>
  ) : (
    <div className="orders-list">
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h2 className="order-id">{order.itemId.title}</h2>
          <img
                  className="item-image"
                  src={order.itemId.image[0]}
                  alt={order.itemId.title}
                />
          <div className="order-info">
            <p className="order-status">Status: {order.orderStatus}</p>
            <p className="order-amount">Total Amount: ${order.totalAmount}</p>
            <p className="order-payment">Payment Method: {order.paymentMethod}</p>
            <p className="order-date">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          


        </div>
      ))}
    </div>
  )}
</div>
  );
};

export default Orders;