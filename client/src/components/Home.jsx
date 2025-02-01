import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      console.log(userId);

      if (!userId) {
        alert("You need to log in first.");
        setLoading(false); // Stop loading if no userId is found
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/user/user?id=${userId}`);
        const user = response.data.user;
        if (user) {
          setUserDetails({ name: user.name, email: user.email });
        } else {
          setError("User not found."); // Set error if user is not found
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later."); // Set error if request fails
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div>
      <div className="user-info">
        <h2>Welcome, {userDetails.name}</h2>
        <p>Email: {userDetails.email}</p>
      </div>
      <div></div>
    </div>
  );
};

export default Home;