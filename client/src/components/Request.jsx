import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    <div>
      <h2>Order Requests</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Customer: {order.userId.firstName} {order.userId.lastName}</p>
              <p>Item ID: {order.itemId._id}</p>
              <p>Total Amount: Rs{order.totalAmount}</p>
              <p>Status: {order.orderStatus}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Request;
