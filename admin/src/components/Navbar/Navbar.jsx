import React from "react";
import './Navbar.css'
import logo from "../../assets/logo.png";
// import {navprofile} from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="logo">
        <img src={logo} className="nav-logo" />
        <div>
          <h2>SHOPPER</h2>
          <span>Admin panel</span>
        </div>
      </div>
      <div className="profile-logo">
        <p>M</p>
      </div>
    </div>
  );
};

export default Navbar;
