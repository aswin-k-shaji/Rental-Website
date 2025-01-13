import React from "react";
import "./Navbar.css";

const Navbar = ({setToken}) => {
  return (
   <>
    <nav className="navbar">
      <div style={{marginLeft:'40px'}} className="navbar-logo">Rental</div>
      <button onClick={()=>setToken('')} className="logout-button">Logout</button>
    </nav>
   </>
  );
};

export default Navbar;