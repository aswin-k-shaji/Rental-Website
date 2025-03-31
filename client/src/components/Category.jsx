import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Category.css";

const categories = [
  "Car", "Bike", "Electronics", "Machines", "House",
  "Accessories", "Kitchen", "Function", "Tools","more..."
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/products/${category}`);
  };

  // Reset selected category when navigating to another page
  useEffect(() => {
    if (!location.pathname.startsWith("/products/")) {
      setSelectedCategory(null);
    }
  }, [location.pathname]);

  return (
    <div className="category-container">
      <div className="category-slider">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-item ${selectedCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <hr/>
    </div>
  );
};

export default Category;
