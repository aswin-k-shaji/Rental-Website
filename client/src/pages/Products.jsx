import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import "./Products.css";
import { ShopeContext } from "../context/ShopeContext";
import Category from "../components/Category";

const categories = [
  "All", "Car", "Bike", "Electronics", "Machines", "House",
  "Accessories", "Kitchen", "Function", "Tools", "More..."
];

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ShopeContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState(category || "All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 50; // Show 50 products per page

  // Filter products based on category & search term
  useEffect(() => {
    let filtered = products;

    if (currentCategory !== "All") {
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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="products-container">
      {/* Category Buttons */}
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

      {/* Search & Sort Filters */}
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

      {/* Product List */}
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

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
