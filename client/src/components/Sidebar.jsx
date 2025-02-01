import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  return (
    <div className="sidebar">
      <NavLink to="/profile" activeClassName="active" onClick={() => handleItemClick(null)}>Home</NavLink>
      <div className="nav-item">
        <NavLink
          to="/profile/items"
          activeClassName="active"
          onClick={() => handleItemClick('items')}
        >
          Items
        </NavLink>
        {activeItem === 'items' && (
          <div className="sub-options">
            <NavLink to="/profile/view" activeClassName="active">View Items</NavLink>
            <NavLink to="/profile/items/add" activeClassName="active">Add Items</NavLink>
          </div>
        )}
      </div>
      <NavLink to="/profile/orders" activeClassName="active" onClick={() => handleItemClick(null)}>Orders</NavLink>
      <NavLink to="/profile/cart" activeClassName="active" onClick={() => handleItemClick(null)}>Cart</NavLink>
      <NavLink to="/profile/request" activeClassName="active" onClick={() => handleItemClick(null)}>Request</NavLink>
    </div>
  );
};

export default Sidebar;
