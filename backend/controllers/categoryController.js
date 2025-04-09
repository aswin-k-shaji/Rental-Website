import Category from "../models/Category.js";
import itemModel from "../models/items.js";


// Add a new category
export const addCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({
      name,
      description,
      isActive,
    });

    await newCategory.save();
    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Failed to add category", error: error.message });
  }
};

// Change category status
export const changeCategoryStatus = async (req, res) => {
  try {
    const { id, isActive } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category status updated successfully", category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Failed to update category status", error: error.message });
  }
};

// Fetch all categories
export const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully", category: deletedCategory });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error: error.message });
  }
};

// Fetch a category by ID and get all items belonging to it

export const fetchProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;

    let products;

    if (!categoryId || categoryId === "All") {
      // Fetch all products if no specific category is provided
      products = await itemModel.find().populate("category");
    } else {
      // Fetch products for a specific category
      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      products = await itemModel.find({ category: categoryId }).populate("category");
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};


export const getCategoryNameById = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ name: category.name });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Server error" });
  }
};


