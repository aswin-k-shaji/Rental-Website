import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const [numItems, setNumItems] = useState(0);
  const [numOrders, setNumOrders] = useState(0);
  const [numOwnerOrders, setNumOwnerOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        alert("You need to log in first.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user details
        const userRes = await axios.get(`http://localhost:4000/api/user/user?id=${userId}`);
        const user = userRes.data.user;
        
        if (user) {
          setUserDetails({ name: user.name, email: user.email });
        } else {
          setError("User not found.");
        }

        // Fetch number of items created by user
        const itemsRes = await axios.get(`http://localhost:4000/api/user/${userId}/items`);
        setNumItems(itemsRes.data.items.length);

        // Fetch orders placed by the user (using the same logic as Orders component)
        const ordersRes = await axios.post("http://localhost:4000/api/Order/orders", { userId });
        const ordersData = ordersRes.data.orders || [];
        setNumOrders(ordersData.length);

        // Fetch owner orders (using the same endpoint structure as Orders component)
        const ownerOrdersRes = await axios.post("http://localhost:4000/api/Order/orders", {
          userId,
          isOwner: true  // Add this flag to differentiate owner orders in the backend
        });
        const ownerOrdersData = ownerOrdersRes.data.orders || [];
        setNumOwnerOrders(ownerOrdersData.length);

      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      <div className="user-info">
        <h2>Welcome, {userDetails.name}</h2>
        <p>Email: {userDetails.email}</p>
      </div>
      <div className="stats-container">
        <div className="stat-box">
          <h3>Items Created</h3>
          <p>{numItems}</p>
        </div>
        <div className="stat-box">
          <h3>Requests</h3>
          <p>{numOrders}</p>
        </div>
        <div className="stat-box">
          <h3>Owner Orders</h3>
          <p>{numOwnerOrders}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;