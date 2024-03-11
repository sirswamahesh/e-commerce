import React from "react";
import data_product from "../Assets/data";
import Item from "../Item/Item";
import "./RelatedProduct.css";

const RelatedProduct = () => {
  return (
    <div className="related-product">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedprodcutd-list">
        {data_product.map((item, i) => (
          <Item item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
