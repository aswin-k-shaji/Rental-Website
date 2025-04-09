import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContext";
import "./Category.css";

const Category = () => {
  const { categories, loading } = useContext(CategoryContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "more") {
      navigate("/category");
    } else {
      setSelectedCategory(categoryId);
      navigate(`/products/${categoryId}`);
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/products/")) {
      setSelectedCategory(null);
    }
  }, [location.pathname]);

  return (
    <div className="category-container">
      {loading ? (
        <div className="loading-screen">Loading categories...</div>
      ) : (
        <div className="category-slider">
          {categories.slice(0, 9).map((category) => (
            <button
              key={category._id}
              className={`category-item ${selectedCategory === category._id ? "active" : ""}`}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
            </button>
          ))}
          <button className="category-item" onClick={() => handleCategoryClick("more")}>
            more...
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
