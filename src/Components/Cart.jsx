import { Col, Row } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../Context/Contexts";
import { CartItem } from "./CartItem";

// DISPLAY THE CART PAGE
export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    user && setCartItems(user.cart);
  }, [user]);

  useEffect(() => {
    let sum = 0;
    cartItems &&
      cartItems.forEach((item) => {
        sum += item.price * item.quantity;
      });
    setTotal(sum);
  }, [cartItems]);

  return (
    <div className="container">
      <Row>
        {cartItems &&
          cartItems.map((product, index) => {
            return (
              <CartItem
                product={product}
                key={index}
                cartItems={cartItems}
                setCartItems={setCartItems}
                index={index}
                id={user._id}
                setUser={setUser}
              />
            );
          })}
      </Row>
      <div className="text-center bg-dark text-light w-75 mx-auto">
        <p className="mt-3">Total: ${total.toLocaleString()}</p>
      </div>
    </div>
  );
};
