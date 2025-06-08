import React from "react";
import "./Sidebar.css";

const Sidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "models", label: "My Models" },
    { id: "upload", label: "Upload" },
    { id: "edit", label: "Edit Model" },
    { id: "share", label: "Share" },
    { id: "settings", label: "Settings" }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Workspace</h3>
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => setActiveItem(item.id)}
          >
            <span className="sidebar-icon"></span>
            <span className="sidebar-label">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar"></div>
          <div className="user-details">
            <div className="user-name">John Doe</div>
            <div className="user-role">Pro Account</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
