import { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import axios from "axios";
import { CategoryContext } from "../context/CategoryContext";
import "./Products.css";
import CategoryDisplay from "../components/CategoryDisplay";

// Cache to store products by category
const productsCache = {
  data: {},
  timestamp: {},
  expiryTime: 5 * 60 * 1000, // 5 minutes cache expiry
};

// Skeleton loading placeholder component
const SkeletonItem = () => (
  <div className="skeleton-item">
    <div className="skeleton-image pulse"></div>
    <div className="skeleton-title pulse"></div>
    <div className="skeleton-price pulse"></div>
    <div className="skeleton-location pulse"></div>
  </div>
);

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { categories } = useContext(CategoryContext);

  // Get search params from URL if coming back from a product detail page
  const searchParams = new URLSearchParams(location.search);
  const initialSearchTerm = searchParams.get("search") || "";
  const initialLocationSearch = searchParams.get("location") || "";
  const initialSortType = searchParams.get("sort") || "relevant";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortType, setSortType] = useState(initialSortType);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [locationSearch, setLocationSearch] = useState(initialLocationSearch);
  const [currentCategory, setCurrentCategory] = useState(category || "All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // Flag to prevent excessive URL updates
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const productsPerPage = 50;

  // Function to update URL search params without triggering a reload
  const updateUrlSearchParams = useCallback(() => {
    // Don't update URL during initial load to prevent extra history entries
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (locationSearch) params.set("location", locationSearch);
    if (sortType !== "relevant") params.set("sort", sortType);
    
    // Use navigate without replace to maintain proper history
    const newUrl = `/products/${currentCategory}${params.toString() ? `?${params.toString()}` : ""}`;
    
    // Only update if the URL would actually change
    if (location.pathname + location.search !== newUrl) {
      navigate(newUrl, { replace: true }); // Using replace to avoid back-button issues
    }
  }, [searchTerm, locationSearch, sortType, currentCategory, navigate, location.pathname, location.search, isInitialLoad]);

  // Fetch products with caching
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    
    // Check cache first
    const cacheKey = currentCategory;
    const now = Date.now();
    
    if (
      productsCache.data[cacheKey] && 
      productsCache.timestamp[cacheKey] && 
      now - productsCache.timestamp[cacheKey] < productsCache.expiryTime
    ) {
      // Use cached data
      setProducts(productsCache.data[cacheKey]);
      // Need to run filtering logic again even when using cached data
      applyFilters(productsCache.data[cacheKey]);
      setLoading(false);
      return;
    }
    
    try {
      const endpoint = "http://localhost:4000/api/category/by-category";
      const payload = {
        categoryId: currentCategory === "All" ? null : currentCategory,
      };

      const res = await axios.post(endpoint, payload);

      if (res.status === 200) {
        // Update cache
        productsCache.data[cacheKey] = res.data;
        productsCache.timestamp[cacheKey] = now;
        
        setProducts(res.data);
        // Apply filters to the newly fetched data
        applyFilters(res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      setProducts([]);
      setFilteredProducts([]);
      setSortedProducts([]);
    } finally {
      setLoading(false);
    }
  }, [currentCategory]);

  // Helper function to apply filters to products
  const applyFilters = useCallback((productsToFilter) => {
    if (!productsToFilter || productsToFilter.length === 0) {
      setFilteredProducts([]);
      setSortedProducts([]);
      return;
    }
    
    let filtered = [...productsToFilter];
    
    // Filter by search term (title or category)
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
    
    // Filter by location
    if (locationSearch) {
      filtered = filtered.filter(
        (item) => 
          item.location && 
          item.location.toLowerCase().includes(locationSearch.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
    
    // Apply sorting to filtered products
    let sorted = [...filtered];
    if (sortType === "low-high") {
      sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortType === "high-low") {
      sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    
    setSortedProducts(sorted);
    setCurrentPage(1);
  }, [searchTerm, locationSearch, sortType]);

  // Fetch products when category changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update current category when URL parameter changes
  useEffect(() => {
    if (category === "All" || !category) {
      setCurrentCategory("All");
    } else if (categories.length > 0) {
      const foundCategory = categories.find((cat) => cat._id === category);
      setCurrentCategory(foundCategory ? foundCategory._id : "All");
    }
  }, [category, categories]);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    applyFilters(products);
    // Update URL with search parameters
    updateUrlSearchParams();
  }, [products, searchTerm, locationSearch, sortType, applyFilters, updateUrlSearchParams]);

  const handleCategoryChange = (newCategory) => {
    if (newCategory === currentCategory) return; // Don't reload if same category
    
    setCurrentCategory(newCategory);
    // Don't reset search terms to preserve filters
    navigate(`/products/${newCategory}${location.search}`, { replace: true });
  };

  const handleAllProducts = () => {
    if (currentCategory === "All") return; // Don't reload if already on All
    
    setCurrentCategory("All");
    // Don't reset search terms
    navigate(`/products/All${location.search}`, { replace: true });
  };

  const handleCategoryClick = (category) => {
    if (category === "more...") {
      navigate("/category");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleProductClick = (productId) => {
    const params = new URLSearchParams(location.search);

    // Store current category and all filter params for proper return
    const returnPath = `../products/${currentCategory}${location.search}`;

    // Navigate to product page with return info, replacing the current history entry
    navigate(`/product/${productId}`, { 
      state: { returnPath },
      replace: true // Prevent adding another entry to the history stack
    });
};


  const totalPages = Math.ceil((sortedProducts.length || 1) / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="products-container">
      <div className="category-filters">
        {/* All button with dedicated handler */}
        <button
          className={currentCategory === "All" ? "active" : ""}
          onClick={handleAllProducts}
        >
          All
        </button>
        {categories.filter(cat => cat.isActive).map((cat) => (
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
          onChange={handleSearchChange}
        />
        <input
          type="text"
          placeholder="Search by location..."
          value={locationSearch}
          onChange={handleLocationChange}
        />
        <select value={sortType} onChange={handleSortChange}>
          <option value="relevant">Sort By: Relevant</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <div>
        <CategoryDisplay categoryId={currentCategory} />
      </div>

      <div className="product-list">
        {loading ? (
          // Skeleton loading placeholders
          Array(8).fill(0).map((_, index) => (
            <SkeletonItem key={`skeleton-${index}`} />
          ))
        ) : currentProducts && currentProducts.length > 0 ? (
          currentProducts.map((item) => (
            <div key={item._id} onClick={() => handleProductClick(item._id)} className="product-item-wrapper">
              <ProductItem
                title={item.title}
                id={item._id}
                pricePerDay={item.pricePerDay}
                image={item.image}
                location={item.location}
              />
            </div>
          ))
        ) : (
          <p className="no-products-message">No products found. Try a different search term, location or category.</p>
        )}
      </div>

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