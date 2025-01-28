import React, { useContext } from 'react';
import { ShopeContext } from '../context/ShopeContext';
import { Link } from 'react-router-dom';
import './ProductItem.css';

const ProductItem = ({id, image, title, pricePerDay }) => {
  const { currency } = useContext(ShopeContext);

  return (
    <Link to={`/product/${id}`} className="card-link">
      <div className="card">
        <div>
          <img src={image[0]} alt={title}/>
        </div>
        <p>{title}</p>
        <p>{currency}{pricePerDay}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
