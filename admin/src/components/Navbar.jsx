import React from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = ({setToken}) => {
  return (
   <>
    <nav className="navbar">
      <Link to="/" className="navbar-logo" style={{ marginLeft: '40px', cursor: 'pointer',textDecoration:'none' }}>Rental</Link>
      <button onClick={() => setToken('')} className="logout-button">Logout</button>
    </nav>
   </>
  );
};

export default Navbar;