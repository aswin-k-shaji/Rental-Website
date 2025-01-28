import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/profile/home" activeClassName="active">Home</NavLink>
      <NavLink to="/profile/items" activeClassName="active">Items</NavLink>
      <NavLink to="/profile/orders" activeClassName="active">Orders</NavLink>
      <NavLink to="/profile/cart" activeClassName="active">Cart</NavLink>
      <NavLink to="/profile/request" activeClassName="active">Request</NavLink>
    </div>
  );
};

export default Sidebar;
