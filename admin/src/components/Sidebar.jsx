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
          <span>HOME</span>
        </NavLink>

        <div className="menu-group">
          <div 
            className={`menu-item ${openDropdown === 'items' ? 'active' : ''}`} 
            onClick={() => toggleDropdown('items')}
          >
            <img src={assets.lists} alt="" />
            <span>ITEMS</span>
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
            <span>ORDERS</span>
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
            <span>USERS</span>
          </div>
          <div className={`submenu ${openDropdown === 'users' ? 'open' : ''}`}>
            <NavLink to="/users" className="submenu-item">
              <span>👥</span> View Users
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;