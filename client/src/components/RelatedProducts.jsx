import React, { useContext, useEffect, useState } from 'react';
import { ShopeContext } from '../context/ShopeContext';
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProducts = ({ category }) => {

  console.log(category);
  
  const { products } = useContext(ShopeContext);
  const [related, setRelated] = useState([]);
  
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
    
      productsCopy = productsCopy.filter((item) => category === item.category);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category]);

  return (
    <div>
      <div>
        <div>
          <Title text1={'RELATED'} text2={'ITEMS'} />
        </div>
        <div className='gridcolumn'>
          {related.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} title={item.title} pricePerDay={item.pricePerDay} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
