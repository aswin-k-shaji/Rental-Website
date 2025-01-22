import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Content.css';

const Content = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/product/list');
        const data = await response.json();
        if (data.success) {
          setItems(data.items);
        }
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="content-container">
      <h2>Available Items</h2>
      <div className="card-grid">
        {items.map((item) => (
          <div className="card" key={item._id} onClick={() => handleCardClick(item._id)}>
            <img src={item.image[0]} alt={item.title} className="card-image" />
            <div className="card-body">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-category">Category: {item.category}</p>
              <p className="card-location">Location: {item.location}</p>
              <p className="card-price">Price: {item.pricePerDay} Rs</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
