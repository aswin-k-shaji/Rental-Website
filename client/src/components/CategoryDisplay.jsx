import { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryDisplay.css";


const CategoryDisplay = ({ categoryId }) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (!categoryId || categoryId === "All") {
      setCategoryName("All");
      return;
    }
    fetchCategoryName(categoryId);
  }, [categoryId]);

  const fetchCategoryName = async (categoryId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/category/getone", {
        categoryId,
      });

      if (response.status === 200) {
        setCategoryName(response.data.name);
      } else {
        setCategoryName("Category not found");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      setCategoryName("Error fetching category");
    }
  };

  return <p className="category-name">{categoryName}</p>;
};

export default CategoryDisplay;
