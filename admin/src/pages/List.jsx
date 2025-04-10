import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import './list.css';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [categoryMap, setCategoryMap] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Status options
  const statusOptions = ['available', 'Inactive', 'Hidden', 'Archive'];

  // Fetch Products
  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(backendUrl + '/api/product/list');
      if (res.data.success) {
        setList(res.data.items);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/category/list`);
      if (res.status === 200) {
        setCategories(res.data.items || []);
        console.log(res.data.items);
        
        
        // Create category map for quick lookup
        const categoryMapData = {};
        res.data.items.forEach(category => {
          categoryMapData[category._id] = category.name;
        });
        setCategoryMap(categoryMapData);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  // Fetch Category Name by ID if not in map
  const fetchCategoryName = async (categoryId) => {
    if (!categoryId || categoryMap[categoryId]) return; // Skip if already fetched
    try {
      const res = await axios.post(`${backendUrl}/api/category/getone`, { categoryId });
      if (res.status === 200) {
        setCategoryMap((prev) => ({ ...prev, [categoryId]: res.data.name }));
      }
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  // Fetch category names for all products
  useEffect(() => {
    list.forEach((item) => {
      if (item.category) fetchCategoryName(item.category);
    });
  }, [list]); // Runs when `list` changes

  // Handle Product Deletion
  const removeProduct = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) return;
    setDeletingId(id);
    try {
      const res = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Handle Search
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Handle Location Search
  const handleLocationSearch = (event) => {
    setLocationSearch(event.target.value);
  };

  // Handle Category Filter
  const handleCategoryFilter = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Handle Status Filter
  const handleStatusFilter = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Handle Sort Change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Toggle Sort Order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchText('');
    setLocationSearch('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSortBy('');
    setSortOrder('asc');
  };

  // Filter Products Based on Filters
  const filteredList = list.filter((item) => {
    // Name search
    const nameMatch = item.title.toLowerCase().includes(searchText.toLowerCase());
    
    // Category filter
    const categoryMatch = !selectedCategory || item.category === selectedCategory;
    
    // Status filter
    const statusMatch = !selectedStatus || item.status === selectedStatus;
    
    // Location search (assuming item has a location property)
    const locationMatch = !locationSearch || 
      (item.location && item.location.toLowerCase().includes(locationSearch.toLowerCase()));
    
    return nameMatch && categoryMatch && statusMatch && locationMatch;
  });

  // Sort filtered list
  const sortedList = [...filteredList].sort((a, b) => {
    if (!sortBy) return 0;
    
    let valueA, valueB;
    
    switch (sortBy) {
      case 'name':
        valueA = a.title;
        valueB = b.title;
        break;
      case 'category':
        valueA = categoryMap[a.category] || '';
        valueB = categoryMap[b.category] || '';
        break;
      case 'price':
        valueA = a.pricePerDay;
        valueB = b.pricePerDay;
        break;
      case 'status':
        valueA = a.status || 'available';
        valueB = b.status || 'available';
        break;
      default:
        return 0;
    }
    
    if (typeof valueA === 'string') {
      const comparison = valueA.localeCompare(valueB);
      return sortOrder === 'asc' ? comparison : -comparison;
    } else {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }
  });

  // Fetch List and Categories on Component Mount
  useEffect(() => {
    fetchList();
    fetchCategories();
  }, []);

  return (
    <div className="list-container">

      <div className="list-header">
        <h1 className="list-title">Product Inventory</h1>
        <div className="list-actions">
          <NavLink to="/add" className="add-product-btn">
            <i className="fas fa-plus"></i> Add New Product
          </NavLink>
        </div>
      </div>

      <div className="filter-container">
        <div className="search-filters">
          <div className="filter-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Search by name"
              className="filter-input"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          
          <div className="filter-group">
            <label>Location:</label>
            <input
              type="text"
              placeholder="Search by location"
              className="filter-input"
              value={locationSearch}
              onChange={handleLocationSearch}
            />
          </div>
          
          <div className="filter-group">
            <label>Category:</label>
            <select 
              className="filter-select"
              value={selectedCategory}
              onChange={handleCategoryFilter}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Status:</label>
            <select 
              className="filter-select"
              value={selectedStatus}
              onChange={handleStatusFilter}
            >
              <option value="">All Statuses</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="sort-controls">
          <div className="filter-group">
            <label>Sort By:</label>
            <select 
              className="filter-select"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="">Default</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="price">Price</option>
              <option value="status">Status</option>
            </select>
          </div>
          
          {sortBy && (
            <button 
              className="sort-order-btn" 
              onClick={toggleSortOrder}
              title={`Currently: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          )}
          
          <button onClick={resetFilters} className="reset-filters-btn">
            Reset Filters
          </button>
        </div>
      </div>

      <div className="results-info">
        <span>{sortedList.length} products found</span>
      </div>

      <div className="table-container">
        <table className="list-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price per day</th>
              <th>Status</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedList.length > 0 ? (
              sortedList.map((item) => (
                <tr key={item._id} className={`status-${item.status || 'available'}`}>
                  <td className="image-cell">
                    {item.image && item.image.length > 0 ? (
                      <img src={item.image[0]} alt={item.title} className="list-image" />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </td>
                  <td>
                    <NavLink to={`/product/${item._id}`} className="product-link">
                      {item.title}
                    </NavLink>
                  </td>
                  <td>{categoryMap[item.category] || "N/A"}</td>
                  <td className="price-cell">{item.pricePerDay} Rs</td>
                  <td>
                    <span className={`status-badge ${item.status || 'available'}`}>
                      {item.status || 'Available'}
                    </span>
                  </td>
                  <td>{item.location || "N/A"}</td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <NavLink to={`/product/edit/${item._id}`} className="edit-btn" title="Edit">
                        <i className="fas fa-edit"></i>
                      </NavLink>
                      <button
                        onClick={() => removeProduct(item._id)}
                        className="delete-btn"
                        disabled={deletingId === item._id}
                        title="Delete"
                      >
                        {deletingId === item._id ? 
                          <i className="fas fa-spinner fa-spin"></i> : 
                          <i className="fas fa-trash-alt"></i>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No products found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;