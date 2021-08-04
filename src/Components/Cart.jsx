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

  const calculateItemPrice = (price, productDetail) => {
    let qty = 0;
    productDetail.forEach((detail) => {
      qty += detail.quantity;
    });
    return price * qty;
  };
  useEffect(() => {}, [cartItems]);
  return (
    <div className="container">
      <Row>
        {cartItems &&
          cartItems.map((product) => {
            return (
              <Col xs={4} style={{ fontSize: "12px" }}>
                <h5 className="text-center">{product.name}</h5>
                <img src={product.images[0].url} className="cart-img" alt="" />
                {product.details.map((detail) => {
                  return (
                    <div className="">
                      <Row>
                        <Col className="cart-card">
                          <p>Size: {detail.size}</p>
                          <ColorSquares
                            color={detail.color}
                            height={"15px"}
                            width={"15px"}
                          ></ColorSquares>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="cart-card">
                          <i className="fas fa-minus"></i>
                          <input value={detail.quantity} />
                          <i className="fas fa-plus"></i>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
                <p className="text-center">
                  {calculateItemPrice(
                    product.details[0].price,
                    product.details
                  )}
                </p>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
