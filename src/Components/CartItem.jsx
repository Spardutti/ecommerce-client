import { useState, useEffect } from "react";
import { updateUserCart } from "../API/API";

// DISPLAY EACH ITEM IN THE CART

export const CartItem = (props) => {
  const { product, index, cartItems, id, setUser, setCartItems } = props;
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    product.quantity && setQuantity(product.quantity);
    return () => setQuantity("");
  }, []);

  const increment = async () => {
    setLoading(true);
    setQuantity(quantity + 1);
    let cart = [...cartItems];
    cart[index].quantity += 1;
    setCartItems(cart);
    await updateUserCart(id, cart);

    setLoading(false);
  };

  const decrement = async () => {
    setLoading(true);
    if (quantity === 1) {
      alert("Item cant have 0 quantity, either remove it. or leave at least 1");
      return;
    }
    setQuantity(quantity - 1);
    let cart = [...cartItems];
    cart[index].quantity -= 1;
    setCartItems(cart);
    await updateUserCart(id, cart);
    setLoading(false);
  };

  // REMOVE ITEM FROM CART
  const removeItem = async () => {
    setLoading(true);
    let cart = [...cartItems];
    cart.splice(index, 1);
    setCartItems(cart);
    const updatedUser = await updateUserCart(id, cart);
    setUser(updatedUser);
    setLoading(false);
  };

  return (
    <div className="cart-container">
      <div className="img-container">
        <img src={product.image} alt="" />
      </div>
      <div className="title">
        <h4>{product.name}</h4>
      </div>
      <div className="price">
        <p>$ {product.price.toLocaleString()}</p>
      </div>
      <div className="quantity">
        {product.quantity > 1 ? (
          <span className="minus fadeIn" onClick={decrement}>
            <i className="fas fa-minus"></i>
          </span>
        ) : (
          <span className="minus fadeOut" onClick={removeItem}>
            <i className="fas fa-trash text-danger"></i>
          </span>
        )}
        <span className="number">{product.quantity}</span>
        <span className="plus" onClick={increment}>
          <i className="fas fa-plus"></i>
        </span>
      </div>
    </div>
  );
};
