import React, { useEffect, useState } from "react";
import "./Listproduct.css";

const Listproduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchData = async () => {
    await fetch(`${SERVER_URL}/allproducts`)
      .then((resp) => resp.json())
      .then((data) => {
        setAllProducts(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const remove_product = async (id) => {
    console.log(id);
    let result;
    await fetch(`${SERVER_URL}/removeproduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((res) => (result = res));

    if (result.success) {
      alert("Product is remove from the database");
      // console.log(result.name);
      await fetchData();
    }
  };
  return (
    <div className="listproduct">
      <h1>All product List</h1>
      <hr />
      <div className="listproduct-format">
        <p>Product</p>
        <p>Title</p>
        <p>Oldprice</p>
        <p>New price</p>
        <p> Category</p>
        <p>Remove</p>
      </div>

      <hr />
      <div className="productlists">
        {allproducts.map((product) => {
          return (
            <div key={product.id}>
              <div className="listproduct-format">
                <div className="product-image">
                  <img src={product.image} />
                </div>
                <p className="product-name">{product.name}</p>
                <p className="product-new-price">${product.old_price}</p>
                <button className="product-quantity">
                  {product.new_price}
                </button>
                <p className="product-category">{product.category}</p>
                <ion-icon
                  className="cross-icon"
                  name="close-outline"
                  onClick={() => remove_product(product.id)}
                ></ion-icon>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listproduct;
