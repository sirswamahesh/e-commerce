import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  // console.log(item);
  return (
    <div className="item">
      <Link to={`/product/${item.id}`}>
        <img src={item.image} onClick={() => window.scrollTo(0, 0)} alt="" />
      </Link>
      <p>{item.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${item.new_price}</div>
        <div className="item-price-old">${item.old_price}</div>
      </div>
    </div>
  );
};

export default Item;
