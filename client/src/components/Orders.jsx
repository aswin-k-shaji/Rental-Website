import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
import Title from "./Title";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/Order/orders", { userId });
      let ordersData = response.data.orders || [];

      ordersData = ordersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          try {
            const itemResponse = await axios.post("http://localhost:4000/api/product/single", {
              itemId: order.itemId,
            });
            return { ...order, item: itemResponse.data.item || null };
          } catch (err) {
            console.error("Error fetching item details for order:", order._id, err);
            return { ...order, item: null };
          }
        })
      );

      setOrders(ordersWithItems);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error fetching orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="orders-container">
      <Title text1={"YOUR"} text2={"ORDERS"}></Title>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item" onClick={() => handleItemClick(order.item._id)}>
              {order.item ? (
                <>
                  <img src={order.item.image[0]} alt={order.item.title} className="order-image" />
                  <div className="order-details">
                    <h2>{order.item.title}</h2>
                    <p><strong>Price per Day:</strong> Rs {order.item.pricePerDay}</p>
                    <p><strong>Start Date:</strong> {new Date(order.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    <p><strong>Return Date:</strong> {new Date(order.returnDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>

                    <p><strong>Total Amount:</strong> Rs {order.totalAmount}</p>
                  </div>
                </>
              ) : (
                <p className="error">Item details not available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
