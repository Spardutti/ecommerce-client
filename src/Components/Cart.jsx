import { Row } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../Context/Contexts";
import { CartItem } from "./CartItem";
import { checkStock, updatePurchases } from "../API/API";
import { GoBackArrow } from "./Styled/GoBackArrow";
import { Redirect } from "react-router";

// DISPLAY THE CART PAGE
export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const checkoutButton = async (userId) => {
    setLoading(true);
    const response = await checkStock(userId);
    if (response.status === 200) {
      const { date_created, id, items, payer } = response.data;
      const purchase = {
        date: new Date(date_created).toLocaleDateString(),
        id: id,
        items: items,
        payer: payer,
        status: null,
      };
      await updatePurchases(userId, purchase);
      window.location.replace(response.data.init_point);
      setLoading(false);
    }
    setLoading(false);
  };

  return user ? (
    <div className="container">
      <GoBackArrow route={"/"} />
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
          {loading ? (
            <div className="spinner-grow"></div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => checkoutButton(user._id)}
            >
              Checkout
            </button>
          )}
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
  ) : (
    <Redirect to="/" />
  );
};
