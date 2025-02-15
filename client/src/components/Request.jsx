import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Request.css";

const Request = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        toast.error("User not logged in.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/order/owner-orders?ownerId=${userId}`);

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load requests.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="request-container">
      <h2>Order Requests</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Item</th>
              <th>Image</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Delivery Info</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId.firstName} {order.userId.lastName}</td>
                <td>{order.itemId.title}</td>
                <td>
                  {order.itemId.image && order.itemId.image.length > 0 && (
                    <img 
                      src={order.itemId.image[0]} 
                      alt="Item" 
                      className="order-image"
                    />
                  )}
                </td>
                <td>Rs {order.totalAmount}</td>
                <td>{order.orderStatus}</td>
                <td>
                  <strong>Name:</strong> {order.deliveryInfo.firstName} {order.deliveryInfo.lastName} <br />
                  <strong>Email:</strong> {order.deliveryInfo.email} <br />
                  <strong>Phone:</strong> {order.deliveryInfo.phone} <br />
                  <strong>Address:</strong> {order.deliveryInfo.street}, {order.deliveryInfo.city}, {order.deliveryInfo.state}, {order.deliveryInfo.zipcode}, {order.deliveryInfo.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Request;
