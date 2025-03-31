import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import "./Products.css";
import { backendUrl } from "../App";
import axios from "axios";
import Category from "../components/Category";

const categories = [
  "Car", "Bike", "Electronics", "Machines", "House",
  "Accessories", "Kitchen", "Function", "Tools","More..."
];

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState(category || "");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch product list from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(backendUrl+'/api/product/list');
        console.log(response);
        
        const data = await response.data;
        if (data.success) {
          setProducts(data.items);
          setFilteredProducts(data.items);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on category
  useEffect(() => {
    let filtered = products;
    if (currentCategory) {
      filtered = products.filter((item) => item.category === currentCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    }
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [currentCategory, searchTerm, products]);

  // Sort products
  useEffect(() => {
    let sorted = [...filteredProducts];
    if (sortType === "low-high") {
      sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortType === "high-low") {
      sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    setFilteredProducts(sorted);
  }, [sortType]);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCurrentCategory(newCategory);
    navigate(`/products/${newCategory}`);
  };

  // Get current page products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="products-container">
      <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={currentCategory === cat ? "active" : ""}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      <div className="filter-section">
        <div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div>
            <select onChange={(e) => setSortType(e.target.value)}>
              <option value="relevant">Sort By: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
        </div>
      </div>

      <div className="product-list">
        {currentProducts.length > 0 ? (
          currentProducts.map((item) => (
            <ProductItem
              key={item._id}
              title={item.title}
              id={item._id}
              pricePerDay={item.pricePerDay}
              image={item.image}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {filteredProducts.length > productsPerPage && (
        <div className="pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {Math.ceil(filteredProducts.length / productsPerPage)}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredProducts.length / productsPerPage)))} disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
