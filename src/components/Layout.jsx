import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState("upload");

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className="content-area">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
