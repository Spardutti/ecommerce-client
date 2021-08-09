import { Col, Row } from "reactstrap";
import { ColorSquares } from "./Styled/ColorSquares";
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
    <Col xs={5} md={3} className=" cart-container">
      <h5 className="text-center">{product.name}</h5>
      <img src={product.image} className="cart-img" alt="" />
      <div className="">
        <Row>
          <Col className="cart-card">
            <p>Size: {product.size}</p>
            <ColorSquares
              color={product.color}
              height={"15px"}
              width={"15px"}
            ></ColorSquares>
          </Col>
        </Row>
        <Row className="mb-2">
          {loading ? (
            <div className="spinner-grow mx-auto"></div>
          ) : (
            <Col className="cart-card">
              <i className="fas fa-minus cursorPointer" onClick={decrement}></i>
              <p>{quantity}</p>
              <i className="fas fa-plus cursorPointer" onClick={increment}></i>
            </Col>
          )}
        </Row>
      </div>
      <p className="text-center">
        Total: ${(product.price * product.quantity).toLocaleString()}
      </p>
      <div className="text-center cart-button-del">
        <i
          className="fas fa-times cursorPointer text-danger"
          onClick={removeItem}
        ></i>
      </div>
    </Col>
  );
};
