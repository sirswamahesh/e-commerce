import React from "react";
import "./BreadCrums.css";
// import arrow_icon from "../Assets/breadcrum_arrow.png";

const BreadCrums = (props) => {
  const { product } = props;
  return (
    <div className="bread-crums">
      HOME <ion-icon name="chevron-forward-outline"></ion-icon>SHOP{" "}
      <ion-icon name="chevron-forward-outline"></ion-icon>
      {
        product.category
      } <ion-icon name="chevron-forward-outline"></ion-icon> {product.name}
    </div>
  );
};

export default BreadCrums;
