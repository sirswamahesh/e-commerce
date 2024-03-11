import React, { useState, useEffect } from "react";
import "./Popular.css";
// import data_product from "../Assets/data";
import Item from "../Item/Item";
import { SERVER_URL } from "../../serverurl";
// import Offers from "../Offers/Offers";
const Popular = () => {
  const [popular_product, setPopular_product] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_URL}/popularinwomen`)
      .then((res) => res.json())
      .then((data) => setPopular_product(data));
  }, []);
  return (
    <div className="popular">
      <h1>popular in women</h1>
      <hr />
      <div className="product-item">
        {popular_product.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
