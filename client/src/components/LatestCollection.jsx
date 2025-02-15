import React, { useContext, useEffect, useState } from 'react';
import { ShopeContext } from '../context/ShopeContext';
import Title from './Title';
import ProductItem from './ProductItem';
import './LatestCollection.css';

const LatestCollection = () => {
  const { products} = useContext(ShopeContext);
  const [latestProducts, setLatestProducts] = useState([]);

  // useEffect(() => {
  //   if (Array.isArray(products) && products.length > 0) {
  //     setLatestProducts(products.slice(0,2));
  //   }
  // }, [products]);

  useEffect(() => {
    setLatestProducts(products);
  }, [products]);
  

  console.log(latestProducts);

  return (
    <div className="latest-collection">
      <div className="latest-collection-title">
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p>
        The latest collection features a diverse range of rental properties, offering everything from modern apartments to cozy homes. With updated interiors, premium amenities, and competitive pricing, these new listings are perfect for those looking for comfort and convenience. Whether you need a short-term stay or a long-term lease, our latest selection has something for everyone. Don't miss out—browse now and find your ideal space!         </p>
      </div>
      

      <div className="product-list">
        {latestProducts.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} title={item.title} pricePerDay={item.pricePerDay} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
