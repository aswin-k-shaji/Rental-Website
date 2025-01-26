import React, { useContext, useEffect, useState } from 'react'
import { ShopeContext } from '../context/ShopeContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import './collection.css';

const Collection = () => {
  const { products , search , showSearch } = useContext(ShopeContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  // const [price, setPrice] = useState([]);
  const [sortType,setSortType] = useState('relevent')

  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };


    const applyFilter = ()=>{

      let productsCopy=products.slice();
      if(showSearch && search){
        productsCopy = productsCopy.filter(item=>item.title.toLowerCase().includes(search.toLowerCase()))
      }

      if (category.length>0) {
        productsCopy = productsCopy.filter(item=>category.includes(item.category));
      }
      setFilterProducts(productsCopy)
    }



    //----------------------------------

    const sortProduct =()=>{
      let fpCopy = filterProducts.slice();
      switch(sortType){
        case 'low-high':setFilterProducts(fpCopy.sort((a,b)=>(a.pricePerDay - b.pricePerDay)));
        break;

        case 'high-low':setFilterProducts(fpCopy.sort((a,b)=>(b.pricePerDay - a.pricePerDay)))
        break;

        default:applyFilter();
        break;
      }
    }
    useEffect(()=>{
      applyFilter();
    },[category,search,showSearch])


  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className="collection-container">
      <div className="filter-container">
        <p>Filters</p>
        <div className="filter-category">
          <p>CATEGORIES</p>
          <div>
            <p><input type="checkbox" value="Men" onChange={togglecategory} />  Car</p>
            <p><input type="checkbox" value="Bike" onChange={togglecategory} />  Bike</p>
            <p><input type="checkbox" value="Electronics" onChange={togglecategory} />  Electronics</p>
            <p><input type="checkbox" value="Machines" onChange={togglecategory} />  Machines</p>
            <p><input type="checkbox" value="House/Rooms" onChange={togglecategory} />  House/Rooms</p>
          </div>
        </div>
        <div className="filter-price">
          <p>Price</p>
          <select  onChange={(e)=>setSortType(e.target.value)} >
            <option value="relevent">Relevent</option>
            <option value="low-high">Low to high</option>
            <option value="high-low">High to low</option>
          </select>
        </div>
      </div>
      <div className="product-list-container">
        <Title text1="ALL" text2="COLLECTIONS" />
        <div className="product-list">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              title={item.title}
              id={item._id}
              pricePerDay={item.pricePerDay}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
