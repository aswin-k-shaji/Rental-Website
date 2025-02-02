import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const View = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserItems();
  }, []);

  const fetchUserItems = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error("User not logged in!");
        return;
      }

      const res = await axios.get(`${backendUrl}/api/user/${userId}/items`);
      if (res.data.success) {
        setItems(res.data.items);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    try {
      const res = await axios.post(`${backendUrl}/api/product/remove`, { id });
      if (res.data.success) {
        toast.success("Item removed successfully!");
        setItems(items.filter(item => item._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item.");
    }
  };

  return (
    <div className="view-container">
      <h2>Your Created Items</h2>
      {loading ? <p>Loading...</p> : items.length === 0 ? <p>No items found.</p> : (
        <div className="items-list">
          {items.map(item => (
            <div key={item._id} className="item-card">
              <img src={item.image[0]} alt={item.title} className="item-img" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><strong>Price:</strong> Rs {item.pricePerDay} / day</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Contact:</strong> {item.contact}</p>
              <div className="buttons">
                <button className="details-btn" onClick={() => alert("Details page not implemented yet!")}>
                  Details
                </button>
                <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default View;
