import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from "../serverurl";
// import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefalutCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefalutCart());

  useEffect(() => {
    fetch(`/allproducts`)
      .then((res) => res.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem("auth-token")) {
      fetch(`${SERVER_URL}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId) => {
    // console.log("add to cart>>>>>>>>>>>>>>>>>>>>");

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${SERVER_URL}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data, ">>>."));
    } else {
      alert("Please authenticate using valid token");
    }
  };
  const RemoveFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${SERVER_URL}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };
  return (
    <ShopContext.Provider
      value={{
        all_product,
        cartItems,
        addToCart,
        RemoveFromCart,
        getTotalAmount,
        getTotalCartItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
