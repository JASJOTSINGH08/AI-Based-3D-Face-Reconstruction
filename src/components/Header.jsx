import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>3D Model Pro</h1>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Solutions</a></li>
            <li><a href="#">Enterprise</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="btn btn-secondary">Log In</button>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
