import React, { useContext } from "react";
import "./CartItems.css";
// import remove_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
  const { all_product, cartItems, RemoveFromCart, getTotalAmount } =
    useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-format-manu">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format">
                <div className="product-image">
                  <img src={e.image} alt="" />
                </div>
                <p className="product-name">{e.name}</p>
                <p className="product-new-price">${e.new_price}</p>
                <button className="product-quantity">{cartItems[e.id]}</button>
                <p className="product-total-price">
                  ${e.new_price * cartItems[e.id]}
                </p>
                <ion-icon
                  className="cross-icon"
                  name="close-outline"
                  onClick={() => RemoveFromCart(e.id)}
                ></ion-icon>
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-totals">
          <h2>Cart Totals</h2>
          <div className="cartitem-total-section">
            <div className="subtotal">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="shipping-fee">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="total-price">
              <p>Total</p>
              <p>${getTotalAmount()}</p>
            </div>
          </div>
          <button className="proceed-to-checkout">PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code.Enter it here</p>
          <div className="submitpromocode">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
