import React, { useContext } from "react";
import "./DisplayProduct.css";
import star_img from "../Assets/star_icon.png";
import star_dull_img from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const DisplayProduct = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  // console.log(addTocart);
  return (
    <div className="display-product">
      <div className="displayproduct-left">
        <div className="displayproduct-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="displayproduct-main-img">
          <img src={product.image} alt="" />
        </div>
      </div>
      <div className="displayproduct-right">
        <h2>{product.name}</h2>
        <div className="displayproduct-star-list">
          <img src={star_img} alt="" />
          <img src={star_img} alt="" />
          <img src={star_img} alt="" />
          <img src={star_img} alt="" />
          <img src={star_dull_img} alt="" />
          (122)
        </div>
        <div className="displayproduct-prices">
          <div className="displayproduct-old-price">${product.old_price}</div>
          <div className="displayproduct-new-price">${product.new_price}</div>
        </div>
        <div className="displayproduct-discription">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            saepe doloremque non dolores nam mollitia.
          </p>
        </div>
        <div className="displayproduct-select-size">
          <h3>Select size</h3>
          <div className="displayproduct-select-size-list">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <div
          className="displayproduct-addtocart"
          onClick={() => {
            addToCart(product.id);
          }}
        >
          ADD TO CART
        </div>
        <div className="displayproduct-category">
          <span>Category </span> :Women, T-Shirt,Crop-Top
        </div>
        <div className="displayproduct-tags">
          <span>Tags</span> : Modern, Latest
        </div>
      </div>
    </div>
  );
};

export default DisplayProduct;
