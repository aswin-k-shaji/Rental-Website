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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque hic dolore obcaecati voluptate doloremque tempore at expedita explicabo repellat debitis animi possimus, quia quae optio cum, numquam esse sequi sapiente?
        </p>
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
