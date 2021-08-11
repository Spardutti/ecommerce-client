import { Col, Row } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../Context/Contexts";
import { CartItem } from "./CartItem";
import { checkStock } from "../API/API";
import { Redirect } from "react-router";

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

  const checkoutButton = async (id) => {
    const response = await checkStock(id);
    if (response.status === 200) {
      window.location.replace(response.data);
    }
  };

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
      {cartItems && cartItems.length ? (
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={() => checkoutButton(user._id)}
          >
            Checkout
          </button>
          <div className="text-center bg-dark text-light w-75 mx-auto">
            <p className="mt-3">Total: ${total.toLocaleString()}</p>
          </div>
        </div>
      ) : (
        <div className="text-center bg-dark text-light w-75 mx-auto">
          <p className="mt-3">Cart is empty</p>
        </div>
      )}
    </div>
  );
};
