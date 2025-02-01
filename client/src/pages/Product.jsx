import React, { useContext, useEffect, useState } from 'react';
import { ShopeContext } from '../context/ShopeContext';
import { useParams, useNavigate } from 'react-router-dom';
import './Product.css';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopeContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductData();
  }, [productId, products]);

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };
  
  const handleAddToFavorite = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      addToCart(productData._id);
    } else {
      alert("You need to log in to add this item to favorites.");
      navigate('/login');
    }
  };
  

  const handleBookNow = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate(`/place-order/${productId}`);
    } else {
      alert("You need to log in to book this item.");
      navigate('/login');
    }
  };
  

  return productData ? (
    <div className="product-page">
      <div className="product-container">
        <div className="product-images-section">
          <div className="main-image">
            <img src={image} alt="Main Product" />
          </div>
          <div className="thumbnail-images">
            {productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} alt={`Product Image ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className="product-details">
          <h1 className="product-title">{productData.title}</h1>
          <div className="product-rating">
            <img src={assets.star_icon} alt="Star" />
            <img src={assets.star_icon} alt="Star" />
            <img src={assets.star_icon} alt="Star" />
            <img src={assets.star_icon} alt="Star" />
            <img src={assets.star_dull_icon} alt="Star" />
            <span>(122 reviews)</span>
          </div>
          <div className="product-price">{currency}{productData.pricePerDay}</div>
          <p className="product-description">{productData.description}</p>
          <p className="product-contact">Contact: {productData.contact}</p>
          <p className="product-category">Category: {productData.category}</p>
          <p className="product-owner">Owner: {productData.owner}</p>
          <p className="product-location">Location: {productData.location}</p>
          <button onClick={handleAddToFavorite} className="add-to-favorite">
            Add to Favorite
          </button>
          <button onClick={handleBookNow} className="add-to-favorite">Book Now</button>
        </div>
      </div>
      {/* Description & Review Section */}
      <div className="description-review">
        <div className="description-review-header">
          <b className="description-title">Description</b>
          <span className="review-count">Reviews (300)</span>
        </div>
        <div className="review-content">
          <p>Customer reviews will be displayed here.</p>
        </div>
      </div>
      {/* Display Related Products */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Product;