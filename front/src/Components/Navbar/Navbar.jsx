import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
const Navbar = () => {
  const [menu, setMenu] = useState("Shop");
  const menuRef = useRef();
  const menuDownToggle = (e) => {
    // console.log(menuRef.current.classList);
    menuRef.current.classList.toggle("nav-link-visible");
    e.target.classList.toggle("rotate");
    // console.log(e.target.classList);
  };
  const { getTotalCartItems } = useContext(ShopContext);
  return (
    <div className="Navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <i
        onClick={menuDownToggle}
        className="fa-solid fa-circle-arrow-right drop-icon"
      ></i>
      <ul ref={menuRef} className="nav-menus">
        <li
          onClick={() => {
            setMenu("Shop");
          }}
        >
          <Link to="/">Shop</Link> {menu === "Shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Men");
          }}
        >
          <Link to="/mens"> Mens</Link>
          {menu === "Men" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Womens");
          }}
        >
          <Link to="/womens">Womens</Link>
          {menu === "Womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Kids");
          }}
        >
          <Link to="/kids">Kids</Link> {menu === "Kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-car-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
