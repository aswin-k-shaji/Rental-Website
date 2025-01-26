import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import './Navbar.css';
import { ShopeContext } from '../context/ShopeContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { setShowSearch } = useContext(ShopeContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Rental</h2>

      <ul className="navbar-links">
        <li>
          <NavLink exact to="/" activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/collection" activeClassName="active-link">
            Items
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active-link">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active-link">
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Right Icons */}
      <div className="navbar-icons">
        <img 
          src={assets.search} 
          onClick={()=>setShowSearch(true)}
          alt="Search" 
          className="navbar-icon" 
        />
        <div className="dropdown" ref={dropdownRef}>
          <img
            src={assets.user}
            alt="User"
            className="navbar-icon"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <p>My Profile</p>
              <p>Orders</p>
              <p>Logout</p>
            </div>
          )}
          <div>
            <img src={assets.cart} alt="" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;