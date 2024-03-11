import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import BreadCrums from "../Components/BreadCrums/BreadCrums";
import DisplayProduct from "../Components/DisplayProduct/DisplayProduct";
import "./CSS/Product.css";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProduct from "../Components/RelatedProduct/RelatedProduct";
const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div className="product">
      <BreadCrums product={product} />
      <DisplayProduct product={product} />
      <DescriptionBox />
      <RelatedProduct />
    </div>
  );
};

export default Product;
