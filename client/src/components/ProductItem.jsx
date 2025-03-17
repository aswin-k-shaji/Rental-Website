import React, { useContext } from 'react';
import { ShopeContext } from '../context/ShopeContext';
import { Link } from 'react-router-dom';
import './ProductItem.css';

const ProductItem = ({id, image, title, pricePerDay }) => {
  const { currency } = useContext(ShopeContext);

  return (
    <Link to={`/product/${id}`} className="pi-card-link">
      <div className="pi-card">
        <div className="pi-image-container">
          <img className="pi-image" src={image[0]} alt={title}/>
        </div>
        <p className="pi-title">{title}</p>
        <p className="pi-price">{currency}{pricePerDay}</p>
      </div>
    </Link>
  );
};

export default ProductItem;