import React, { useState } from "react";
import "./Addproduct.css";
import { SERVER_URL } from "../../../../front/src/serverurl";
const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    images: "",
    new_price: "",
    old_price: "",
    category: "",
  });
  const handleImg = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const AddProductHandler = async () => {
    let responceData;
    let product = productDetails;

    let fromData = new FormData();
    fromData.append("product", image);

    await fetch(`${SERVER_URL}/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: fromData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responceData = data;
      });
    if (responceData.success) {
      product.images = responceData.image_url;

      await fetch(`${SERVER_URL}/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product added") : alert("failed");
        });
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-title-field">
        <p>Product Title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="price-section">
        <div className="price">
          <p className="old-price">Price</p>
          <input
            type="number"
            value={productDetails.old_price}
            onChange={changeHandler}
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="offer-price">
          <p className="new-price">Offer Price</p>
          <input
            type="number"
            value={productDetails.new_price}
            onChange={changeHandler}
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="product-category">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          id="category"
        >
          <option value="Women">Women</option>
          <option value="kid">kid</option>
          <option value="men">men</option>
        </select>
      </div>
      <div className="upload_img">
        <h2>Choose image</h2>
        <input
          type="file"
          onChange={handleImg}
          name="image"
          id="file-input"
        ></input>
      </div>

      <div className="add-product-btn">
        <button onClick={() => AddProductHandler()}>ADD</button>
      </div>
    </div>
  );
};

export default Addproduct;
