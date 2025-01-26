import React, { useContext, useEffect, useState } from 'react';
import { ShopeContext } from '../context/ShopeContext';
import { useParams, useNavigate } from 'react-router-dom';
import './Product.css';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();

  const { products, currency} = useContext(ShopeContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState();

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        console.log(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div>
      {/* product data */}
      <div className="product-images">
        {/* product images */}
        <div>
          <div>
            {productData.image.map((item, index) => (
              <img onClick={()=>setImage(item)} src={item} key={index} alt={`Product Image ${index + 1}`} />
            ))}
          </div>
          <div>
            <img src={image} alt="" />
          </div>
        </div>
        {/* product info */}
        <div>
           <h1>{productData.title}</h1>
           <div>
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_dull_icon} alt="" />
            <p>(122)</p>
           </div>
        </div>
        <p>{currency}{productData.pricePerDay}</p>
        <p>{productData.description}</p>
        <p>{productData.contact}</p>
        <p>{productData.category}</p>
        <p>{productData.owner}</p>
        <div>
          <p>{productData.location}</p>
        </div>
        <div>
          <button>Add to favorite</button>
          <hr/>
        </div>
      </div>
      {/* Descriptiom & Review Section */}
      <div>
        <div>
          <b className='' >Description</b>
          <p>Reviews(300)</p>
        </div>
        <div>
          <p></p>
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
