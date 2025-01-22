import React from 'react';
import './product.css';

const Product = ({ items }) => {
  return (
    <div className="product-container">
      {items.map((item, index) => (
        <div key={index} className="product-card">
          <img src={item.image} alt={item.name} className="product-image" />
          <h2 className="product-name">{item.name}</h2>
          <p className="product-price">{`$${item.price}`}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;
