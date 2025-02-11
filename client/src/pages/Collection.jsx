import React, { useContext, useEffect, useState } from 'react'
import { ShopeContext } from '../context/ShopeContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import './collection.css';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopeContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    setFilterProducts(productsCopy);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.pricePerDay - b.pricePerDay)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.pricePerDay - a.pricePerDay)));
        break;

      default:
        applyFilter();
        break;
    }
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products]);

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="collection-container">
      <div className="filter-container">
        <p>Filters</p>
        <div className="filter-category">
          <p>CATEGORIES</p>
          <div className='inpu'>
            <p><input className='inputt' type="checkbox" value="Men" onChange={togglecategory} />  Car</p>
            <p><input className='inputt' type="checkbox" value="Bike" onChange={togglecategory} />  Bike</p>
            <p><input className='inputt' type="checkbox" value="Electronics" onChange={togglecategory} />  Electronics</p>
            <p><input className='inputt' type="checkbox" value="Machines" onChange={togglecategory} />  Machines</p>
            <p><input className='inputt' type="checkbox" value="House/Rooms" onChange={togglecategory} />  House/Rooms</p>
          </div>
        </div>
        <div className="filter-price">
          <p>Price</p>
          <select onChange={(e) => setSortType(e.target.value)} >
            <option value="relevent">Relevent</option>
            <option value="low-high">Low to high</option>
            <option value="high-low">High to low</option>
          </select>
        </div>
      </div>
      <div className="product-list-container">
        <Title text1="ALL" text2="COLLECTIONS" />
        <div className="product-list">
          {currentProducts.map((item, index) => (
            <ProductItem
              key={index}
              title={item.title}
              id={item._id}
              pricePerDay={item.pricePerDay}
              image={item.image}
            />
          ))}
        </div>
        {filterProducts.length > productsPerPage && (
          <div className="pagination-container">
            <button
              className="pagination-button"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-number">
              Page {currentPage} of {Math.ceil(filterProducts.length / productsPerPage)}
            </span>
            <button
              className="pagination-button"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filterProducts.length / productsPerPage)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;