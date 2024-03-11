import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";
// import dropdown_icom from "../Components/Assets/dropdown_icon.png";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="shop-category-banner" src={props.banner} alt="" />
      <div className="shop-category-indexsort">
        <p>
          <span>Showing 1-12 </span> out of 36 products
        </p>
        <div className="shop-category-sort">
          Sort by <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
      </div>
      <div className="shop-category-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return <Item key={i} item={item} />;
          } else {
            return null;
          }
        })}
      </div>
      <div className="shop-category-loadmore">Explore more</div>
    </div>
  );
};

export default ShopCategory;
