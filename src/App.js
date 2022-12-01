import "./App.css";
import { useState, useReducer } from "react";
import clothesData from "./assets/clothes_data.json";
import Menu from "./Menu"
import Cart from "./Cart"

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
clothesData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */



function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */


  const sortOptions = [
    {value: "featured", text: "Featured"},
    {value: "rating", text: "Best Rated"},
    {value: "price", text: "Price Low to High"}
  ]
  const [cartData, setCartData] = useState([])
  const [cartItems, setCartItems] = useState(new Map())
  const [price, setPrice] = useState(0.00)
  const [type, setType] = useState("all")
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [clothesItems, setClothesItems] = useState([...clothesData])
  const star = process.env.PUBLIC_URL + "/images/star.png"


  function addToCart(props, flag) {
    if (flag == "+") {
      if (cartItems.has(props.name)) {
        setCartItems(new Map(cartItems.set(props.name, cartItems.get(props.name) + 1)))
      }
      else {
        setCartItems(new Map(cartItems.set(props.name, 1)))
        setCartData([...cartData, props])
      }
      const new_price = Number(((price + props.price).toFixed(2)))
      setPrice(new_price)
    }

    else {
      if (cartItems.get(props.name) > 1) {
        setCartItems(new Map(cartItems.set(props.name, cartItems.get(props.name) - 1)))
      }
      else {
        cartItems.delete(props.name)
        setCartItems(new Map(cartItems))
        setCartData(cartData.filter(item => item.name != props.name))
      }
      const new_price = Number(((price - props.price).toFixed(2)))
      setPrice(new_price)
    }

    }


  function sortItems(props) {
    const data = [...clothesData]
    setSortBy(props)
    if (props == "featured") {
      setClothesItems(data.filter(item => item.type != type))
      
    }
    else if (props == "rating") {
      setClothesItems(clothesItems.sort((a,b) => {
        if (a.rating > b.rating) {
          return -1
        }
        if (a.rating < b.rating) {
          return 1
        }
        else {
          return 0
        }

      }))
    }
    else {
      setClothesItems(clothesItems.sort((a,b) => {
        if (a.price > b.price) {
          return 1
        }
        if (a.price < b.price) {
          return -1
        }
        else {
          return 0
        }

      }))

    }
  }

  function filterTypes(props) {
    console.log(clothesData)
    const data = [...clothesData]
    setType(props)
    if (props == "all"){
      if (sortBy == "rating") {
        setClothesItems(data.sort((a,b) => {
          if (a.rating > b.rating) {
            return -1
          }
          else if (a.rating < b.rating) {
            return 1
          }
          else {
            return 0
          }
        }))
      }
      if (sortBy == "price") {
        setClothesItems(data.sort((a,b) => {
        if (a.price > b.price) {
          return 1
        }
        else if (a.price < b.price) {
          return -1
        }
        else {
          return 0
        }

      }))
    }
        
      else {
        setClothesItems(data)
      }
    }

    else{
      if (sortBy == "rating") {
        setClothesItems(data.filter(item => item.type == props).sort((a,b) => {
          if (a.rating > b.rating) {
            return -1
          }
          else if (a.rating < b.rating) {
            return 1
          }
          else {
            return 0
          }
        }))
      }
      else if (sortBy == "price") {
        setClothesItems(data.filter(item => item.type == props).sort((a,b) => {
          if (a.price > b.price) {
            return 1
          }
          else if (a.price < b.price) {
            return -1
          }
          else {
            return 0
          }
        }))
      }
      else {
        setClothesItems(data.filter(item => item.type == props))
      }
      //reorder stuff
    }
      
  }


  return (
    <div className="App">
      <div class="header">
        <img src={star} alt="please im a star" class="header_img"/>
      <h1>Stacy's</h1> 
      </div>
      <div class="row">
      <div class="menu_options">
          <h3>Sort By</h3>
          <select name="sort"  onChange={(e) => sortItems(e.target.value)}>
          <option value="featured">Featured</option>
            <option value="price">Price Low to High</option>
            <option value="rating">Best Rated</option>
          </select>
          <h3>Categories</h3>
          <input type="radio" id="all" name="categories" onChange={() => filterTypes("all")}/>
          <label for="all">All</label>
          <br/>
          <input type="radio" id="tops" name="categories" onChange={() => filterTypes("tops")}/>
          <label for="tops">Tops</label>
          <br/>
          <input type="radio" id="bottoms" name="categories" onChange={() => filterTypes("bottoms")}/>
          <label for="bottoms">Bottoms</label>
          <br/>
          <input type="radio" id="accessories" name="categories" onChange={() => filterTypes("accessories")}/>
          <label for="accessories">Accessories</label>
        </div>
      <div class="Menu">
      {clothesItems.map((item, index) => ( // TODO: map bakeryData to BakeryItem components

        <Menu item={item} button={addToCart}/>
        /* <div class="bottom_row">
        <p>{item.price}</p>
        <button onClick={() => addToCart(item, "+")} class="button">Add to cart</button>
        </div> */
      ))}
      </div>
      <Cart 
      price={price}
      cartData={cartData}
      cartItems={cartItems}
      addButton={addToCart}
      minusButton={addToCart}/>
      {/* <div class="Cart">
        <h2>Cart</h2>
        <div class="cart_item">
          <p class="thick">Total: </p>
          <p class="thick">${price}</p>
        </div>
        {cartData.map((item, index) => (
          <div class="cart_item">
          <p>{item.name} x {cartItems.get(item.name)}</p>
          <p>${item.price*cartItems.get(item.name)}</p>
          <button onClick={() => addToCart(item, "+")}>+</button>
          <button onClick={() => addToCart(item, "-")}>-</button>
          </div>
        ))}
      </div> */}
      </div>
    </div>
  );
}

export default App;
