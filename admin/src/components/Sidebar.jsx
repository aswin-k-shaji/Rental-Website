import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { assets } from '../assets/assets';

const Sidebar = () => {
  // Retrieve the saved dropdown state from localStorage
  const [openDropdown, setOpenDropdown] = useState(localStorage.getItem('openDropdown') || null);

  const toggleDropdown = (menu) => {
    const newDropdown = openDropdown === menu ? null : menu;
    setOpenDropdown(newDropdown);
    // Save the new dropdown state to localStorage
    localStorage.setItem('openDropdown', newDropdown);
  };

  useEffect(() => {
    // Retrieve the active submenu from localStorage and keep it open
    const activeMenu = localStorage.getItem('activeMenu');
    if (activeMenu) {
      setOpenDropdown(activeMenu);
    }
  }, []);

  const handleSubmenuClick = (menu) => {
    localStorage.setItem('activeMenu', menu);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <NavLink to="/" className="menu-item">
          <img src={assets.home || '🏠'} alt="" />
          <span>Home</span>
        </NavLink>

        <div className="menu-group">
          <div 
            className={`menu-item ${openDropdown === 'items' ? 'active' : ''}`} 
            onClick={() => toggleDropdown('items')}
          >
            <img src={assets.lists} alt="" />
            <span>Items</span>
          </div>
          <div className={`submenu ${openDropdown === 'items' ? 'open' : ''}`}>
            <NavLink 
              to="/List" 
              className="submenu-item"
              onClick={() => handleSubmenuClick('items')}
            >
              <span>📄</span> View Items
            </NavLink>
            <NavLink 
              to="/new" 
              className="submenu-item"
              onClick={() => handleSubmenuClick('items')}
            >
              <span>➕</span>New Category
            </NavLink>
          </div>
        </div>

        <div className="menu-group">
          <div 
            className={`menu-item ${openDropdown === 'orders' ? 'active' : ''}`}
            onClick={() => toggleDropdown('orders')}
          >
            <img src={assets.checkout} alt="" />
            <span>Orders</span>
          </div>
          <div className={`submenu ${openDropdown === 'orders' ? 'open' : ''}`}>
            <NavLink 
              to="/orders" 
              className="submenu-item"
              onClick={() => handleSubmenuClick('orders')}
            >
              <span>📄</span> View Orders
            </NavLink>
          </div>
        </div>

        <div className="menu-group">
          <div 
            className={`menu-item ${openDropdown === 'users' ? 'active' : ''}`}
            onClick={() => toggleDropdown('users')}
          >
            <img src={assets.users} alt="" />
            <span>Users</span>
          </div>
          <div className={`submenu ${openDropdown === 'users' ? 'open' : ''}`}>
            <NavLink 
              to="/users" 
              className="submenu-item"
              onClick={() => handleSubmenuClick('users')}
            >
              <span>👥</span> View Users
            </NavLink>
          </div>
        </div>

        <NavLink to="/Message" className="menu-item">
          <img src={assets.home || '🏠'} alt="" />
          <span>Message</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
