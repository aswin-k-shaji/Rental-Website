import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
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
            <NavLink to="/List" className="submenu-item">
              <span>📄</span> View Items
            </NavLink>
            <NavLink to="/add" className="submenu-item">
              <span>➕</span> Add Item
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
            <NavLink to="/orders" className="submenu-item">
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
            <NavLink to="/users" className="submenu-item">
              <span>👥</span> View Users
            </NavLink>
          </div>
        </div>
        <NavLink to="/" className="menu-item">
          <img src={assets.home || '🏠'} alt="" />
          <span>Message</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;