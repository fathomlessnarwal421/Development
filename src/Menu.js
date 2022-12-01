import "./App.css";

function Menu(props) {

    return (
        <div class="menu_item">
        <div class="top_row">
        <h3>{props.item.name}</h3>
        <img src={props.item.image}/>
        </div>
        <div class="bottom_row">
        <p>{props.item.price}</p>
        <button onClick={() => props.button(props.item, "+")} class="button">Add to cart</button>
        </div>
        </div>
    );
    
}

export default Menu