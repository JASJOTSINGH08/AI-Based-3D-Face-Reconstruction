import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>IMAGEtoSTL</h1>
      <div className="menu">
        <span>Tools ▼</span>
        <span>File Viewers ▼</span>
        <span>Convert ▼</span>
        <span>Language ▼</span>
      </div>
    </nav>
  );
};

export default Navbar;
