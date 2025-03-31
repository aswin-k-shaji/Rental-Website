import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import './Navbar.css';
import { ShopeContext } from '../context/ShopeContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setShowSearch, getCartCount } = useContext(ShopeContext);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

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
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleOrders = () => {
    navigate('/profile/request');
  };

  const handleProfile = () => {
    if (userId) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleStartRental = (e) => {
    e.preventDefault(); // Prevent default <NavLink> behavior
    if (userId) {
      navigate('/profile/items/add');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Rental</h2>

      <ul className="navbar-links">
        <li className="signup">
          <NavLink
            style={{ color: 'white', padding: '10px 45px', marginRight: '30px' }}
            to="/signup"
            exact="true"
            onClick={handleStartRental}
          >
            Start Rental
          </NavLink>
        </li>
        <li>
          <NavLink to="/" exact="true">
            Home
          </NavLink>
        </li>
        <li>|</li>
        <li>
          <NavLink to="/about" exact="true">
            About
          </NavLink>
        </li>
        <li>|</li>
        <li>
          <NavLink to="/contact" exact="true">
            Contact
          </NavLink>
        </li>
        <li>|</li>
      </ul>

      {/* Right Icons */}
      <div className="navbar-icons">
        <img
          src={assets.search}
          onClick={() => setShowSearch(true)}
          alt="Search"
          className="navbar-icon"
        />
        {userId ? (
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
                <p onClick={handleOrders}>Orders</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <img src={assets.user} alt="User" className="navbar-icon" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
