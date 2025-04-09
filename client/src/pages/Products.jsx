import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import axios from "axios";
import { CategoryContext } from "../context/CategoryContext";
import "./Products.css";

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { categories } = useContext(CategoryContext);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState(category || "All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 50;

  useEffect(() => {
    if (categories.length > 0) {
      const activeCategories = [{ _id: "All", name: "All" }, ...categories.filter((cat) => cat.isActive)];
      const foundCategory = activeCategories.find((cat) => cat._id === category);
      setCurrentCategory(foundCategory ? foundCategory._id : "All");
    }
  }, [category, categories]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:4000/api/category/by-category", {
          categoryId: currentCategory === "All" ? null : currentCategory,
        });

        if (res.status === 200) {
          setProducts(res.data);
          setFilteredProducts(res.data);
          setSortedProducts(res.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentCategory) fetchProducts();
  }, [currentCategory]);

  useEffect(() => {
    if (products.length === 0) return;
    let filtered = [...products];
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.category &&
           (typeof item.category === 'string' ?
             item.category.toLowerCase().includes(searchTerm.toLowerCase()) :
             (item.category.name && item.category.name.toLowerCase().includes(searchTerm.toLowerCase()))))
      );
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  useEffect(() => {
    if (filteredProducts.length === 0) return;
    let sorted = [...filteredProducts];
    if (sortType === "low-high") {
      sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortType === "high-low") {
      sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    setSortedProducts(sorted);
  }, [sortType, filteredProducts]);

  const handleCategoryChange = (newCategory) => {
    setCurrentCategory(newCategory);
    setSearchTerm("");
    navigate(`/products/${newCategory}`, { replace: true });
  };

  const handleCategoryClick = (category) => {
    if (category === "more...") {
      navigate("/category");
    }
  };

  const totalPages = Math.ceil((sortedProducts.length || 1) / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="products-container">
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat._id}
            className={currentCategory === cat._id ? "active" : ""}
            onClick={() => handleCategoryChange(cat._id)}
          >
            {cat.name}
          </button>
        ))}
        {categories.length > 9 && (
          <button
            className="category-item more-button"
            onClick={() => handleCategoryClick("more...")}
          >
            more...
          </button>
        )}
      </div>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="relevant">Sort By: Relevant</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : (
        <div className="product-list">
          {currentProducts && currentProducts.length > 0 ? (
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
            <p>No products found. Try a different search term or category.</p>
          )}
        </div>
      )}

      {sortedProducts.length > productsPerPage && (
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
