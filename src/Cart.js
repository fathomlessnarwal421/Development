import { useState, useReducer } from "react";
import "./App.css";

function Cart(props) {
    //price, cardData, cartItems, addButton, minusButton

    return (
        <div class="Cart">
        <h2>Cart</h2>
        <div class="cart_item">
          <p class="thick">Total: </p>
          <p class="thick">${props.price}</p>
        </div>
        {props.cartData.map((item, index) => (
          <div class="cart_item">
          <p>{item.name} x {props.cartItems.get(item.name)}</p>
          <p>${item.price*props.cartItems.get(item.name)}</p>
          {/* <button onClick={() => addToCart(item, "+")}>+</button>
          <button onClick={() => addToCart(item, "-")}>-</button> */}
          <button onClick={() => props.addButton(item, "+")}>+</button>
          <button onClick={() => props.minusButton(item, '-')}>-</button>
          </div>
        ))}
      </div>
    );
    
}

export default Cart