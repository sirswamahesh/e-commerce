import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import cart_icon from "../../assets/cart_icon.png";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-nav">
        <i className="fa-solid fa-cart-plus"></i>
          <p style={{ textDecoration: "none" }}>Add Product</p>
        </div>
      </Link>

      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-nav">
        <i className="fa-solid fa-folder-minus"></i>
          <p style={{ textDecoration: "none" }}>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
