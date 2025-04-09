import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContext";
import "./Category.css";

const Category = () => {
  const { categories } = useContext(CategoryContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="category-page">
      <h2>SELECT A CATEGORY</h2>
      <input
        type="text"
        placeholder="Search category..."
        className="search-box"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="category-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div
              key={category._id}
              className="category-box"
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
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
