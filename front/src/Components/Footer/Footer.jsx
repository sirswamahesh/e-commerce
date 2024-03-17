import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";
// import instagram_icon from "../Assets/instagram_icon.png";
// import pintester_icon from "../Assets/pintester_icon.png";
// import whatsapp_icon from "../Assets/whatsapp_icon.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Product</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
          <i className="fa-brands fa-github"></i>
        </div>
        <div className="footer-icon-container">
          <i className="fa-brands fa-instagram"></i>
        </div>
        <div className="footer-icon-container">
          <i className="fa-brands fa-linkedin-in"></i>
        </div>
      </div>
      <hr />
      <div className="footer-copyright">
        Copyrigth @ 2023-All Right Reserved.
      </div>
    </div>
  );
};

export default Footer;
