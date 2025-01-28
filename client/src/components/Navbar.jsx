import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import './Navbar.css';
import { ShopeContext } from '../context/ShopeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { setShowSearch, getCartCount } = useContext(ShopeContext);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage

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

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Clear user ID from local storage
    navigate('/login'); // Redirect to login page
  };

  const handleProfile = () => {
    if (userId) {
      navigate('/profile'); // Navigate to profile page if user ID is set
    } else {
      navigate('/login'); // Redirect to login if no user ID is found
    }
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Rental</h2>

      <ul className="navbar-links">
        <li>
          <NavLink to="/" exact="true">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/collection" exact="true">
            Items
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" exact="true">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" exact="true">
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Right Icons */}
      <div className="navbar-icons">
        <img
          src={assets.search}
          onClick={() => setShowSearch(true)}
          alt="Search"
          className="navbar-icon"
        />
        {userId && (
          <div className="dropdown" ref={dropdownRef}>
            <img
              src={assets.user}
              alt="User"
              className="navbar-icon"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <p onClick={handleProfile}>My Profile</p>
                <p>Orders</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
            <Link to="/Cart" className="cart-container1">
              <img src={assets.cart} alt="Cart" className="cart-image" />
              <p className="cart-count">{getCartCount()}</p>
            </Link>
          </div>
        )}
        {!userId && (
          <Link to="/login">
            <img
              src={assets.user}
              alt="User"
              className="navbar-icon"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
