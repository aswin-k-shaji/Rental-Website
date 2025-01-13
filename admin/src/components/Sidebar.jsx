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
    <div className="sidebar-container" style={{ width: "17%", paddingLeft: '40px' }}>
      <div className="sidebar-menu" style={{ height: '500px' }}>
        <div className="dropdown">
          <div className="dropdown-header" onClick={() => toggleDropdown('items')}>
            <img src={assets.lists} alt="" />
            <p>ITEMS</p>
          </div>
          {openDropdown === 'items' && (
            <div className="dropdown-content">
              <NavLink className="NavLink" to="/List">📄 View Items</NavLink>
              <NavLink className="NavLink" to="/add">➕ Add Item</NavLink>
            </div>
          )}
        </div>
        <div className="dropdown">
          <div className="dropdown-header" onClick={() => toggleDropdown('orders')}>
            <img src={assets.checkout} alt="" />
            <p>ORDERS</p>
          </div>
          {openDropdown === 'orders' && (
            <div className="dropdown-content">
              <NavLink className="NavLink" to="/orders">📄 View Orders</NavLink>
            </div>
          )}
        </div>
        <div className="dropdown">
          <div className="dropdown-header" onClick={() => toggleDropdown('users')}>
            <img src={assets.users} alt="" />
            <p>USERS</p>
          </div>
          {openDropdown === 'users' && (
            <div className="dropdown-content">
              <NavLink className="NavLink" to="/users">👥 View Users</NavLink>
              {/* <NavLink className="NavLink" to="/AddUser">➕ Add User</NavLink> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
