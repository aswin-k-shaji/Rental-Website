import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContext";
import "./Category.css";

const Category = () => {
  const { categories, loading } = useContext(CategoryContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  useEffect(() => {
    if (!loading && categories.length > 0) {
      setCategoriesLoaded(true);
    }
  }, [loading, categories]);

  useEffect(() => {
    if (!location.pathname.startsWith("/products/")) {
      setSelectedCategory(null);
    }
  }, [location.pathname]);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "more") {
      navigate("/category");
    } else {
      setSelectedCategory(categoryId);
      navigate(`/products/${categoryId}`);
    }
  };

  return (
    <div className="category-container">
      <div className={`category-slider ${categoriesLoaded ? "loaded" : ""}`}>
        {categoriesLoaded ? (
          <>
            {categories.slice(0, 9).map((category) => (
              <button
                key={category._id}
                className={`category-item ${selectedCategory === category._id ? "active" : ""}`}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
              </button>
            ))}
            {categories.length > 9 && (
              <button className="category-item" onClick={() => handleCategoryClick("more")}>
                more...
              </button>
            )}
          </>
        ) : (
          // Placeholder shimmer elements while loading
          Array(10).fill().map((_, index) => (
            <div key={index} className="category-item-placeholder"></div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;