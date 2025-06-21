import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const imageUrl = url ? `${url}/images/${image}` : "fallback_image_url";
  const cartCount = cartItems?.[id] || 0;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={imageUrl} alt={name} />
        {cartCount === 0 ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets?.add_icon_white || "fallback_icon_url"}
            alt="Add to Cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets?.remove_icon_red || "fallback_icon_url"}
              alt="Remove from Cart"
            />
            <p>{cartCount}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets?.add_icon_green || "fallback_icon_url"}
              alt="Add more"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-ratings">
          <p>{name}</p>
          <img src={assets?.rating_starts || "fallback_icon_url"} alt="Rating" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

FoodItem.defaultProps = {
  id: "",
  name: "Unknown Item",
  price: 0,
  description: "No description available",
  image: "placeholder.jpg",
};

export default FoodItem;
