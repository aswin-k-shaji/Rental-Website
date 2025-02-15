import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();

  const handleItemClick = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  return (
    <div className="sidebar">
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? 'active' : '')}
        onClick={() => handleItemClick(null)}
      >
        Home
      </NavLink>
      <div className="nav-item">
        <NavLink
          to="/profile/items"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={() => handleItemClick('items')}
        >
          Items
        </NavLink>
        {activeItem === 'items' && (
          <div className="sub-options">
            <NavLink
              to="/profile/items/add"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Add Items
            </NavLink>
          </div>
        )}
      </div>
      <NavLink
        to="/profile/orders"
        className={({ isActive }) => (isActive ? 'active' : '')}
        onClick={() => handleItemClick(null)}
      >
        Orders
      </NavLink>
      <NavLink
        to="/profile/cart"
        className={({ isActive }) => (isActive ? 'active' : '')}
        onClick={() => handleItemClick(null)}
      >
        Saved
      </NavLink>
      <NavLink
        to="/profile/request"
        className={({ isActive }) => (isActive ? 'active' : '')}
        onClick={() => handleItemClick(null)}
      >
        Request
      </NavLink>
    </div>
  );
};

export default Sidebar;
