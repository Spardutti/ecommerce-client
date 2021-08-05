import { ColorSquares } from "./Styled/ColorSquares";
import { Col, Row } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../Context/Contexts";

export const Cart = () => {
  const { user } = useContext(userContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    user && setCartItems(user.cart);
  }, [user]);

  // TODO WE NEED A STATE TO TRACK PRICES MAYBE A LOOP AND ADD TO STATE.
  useEffect(() => {}, [cartItems]);
  return (
    <div className="container">
      <Row>
        {cartItems &&
          cartItems.map((product) => {
            return (
              <Col xs={6} md={4}>
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
                    <Col className="cart-card">
                      <i className="fas fa-minus"></i>
                      <input value={product.quantity} />
                      <i className="fas fa-plus"></i>
                    </Col>
                  </Row>
                </div>
                <p className="text-center">
                  {product.price * product.quantity}
                </p>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
