import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

const categories = [
  "Car", "Bike", "Electronics", "Machines", "House",
  "Accessories", "Kitchen", "Function", "Tools", "Fashion",
  "Sports", "Books", "Music", "Furniture", "Toys"
];

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="category-page">
      <h2>
        SELECT A CATEGORY
      </h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search category..."
        className="search-box"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Boxes */}
      <div className="category-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div
              key={category}
              className="category-box"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))
        ) : (
          <p className="no-results">No categories found</p>
        )}
      </div>
    </div>
  );
};

export default Category;
