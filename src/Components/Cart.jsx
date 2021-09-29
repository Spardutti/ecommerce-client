import { useState, useEffect, useContext } from "react";
import { userContext } from "../Context/Contexts";
import { CartItem } from "./CartItem";
import { checkStock, newTransaction, updateUserCart } from "../API/API";
import emptyCart from "../assets/empty-cart.svg";

// DISPLAY THE CART PAGE
export const Cart = ({ setIsCartOpen }) => {
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

  // CHECKOUT

  const checkoutButton = async (userId) => {
    setLoading(true);
    const response = await checkStock(userId);
    if (response.status === 200) {
      const { date_created, id, items, init_point } = response.data;
      await newTransaction(user._id, id, "pending", items, date_created);
      window.location.replace(init_point);
      setLoading(false);
    }
    setLoading(false);
  };

  // CLEAR CART
  const clearCart = async () => {
    try {
      const emptyCart = await updateUserCart(user._id, []);
      setUser(emptyCart);
    } catch (err) {
      return err;
    }
  };

  // TOTAL AND CHECKOUT BUTTON DIV

  const DivTotal = () => {
    return (
      <div className="total-container">
        <div className="total">
          <h4>TOTAL</h4>
          <p>${total.toLocaleString()}</p>
        </div>
        {loading ? (
          <div className="spinner-grow"></div>
        ) : (
          <button
            className="btn btn-black"
            onClick={() => checkoutButton(user._id)}
          >
            checkout
          </button>
        )}
      </div>
    );
  };

  // EMPTY CART DISPLAY

  const EmptyCart = () => {
    return (
      <div className="empty-cart">
        <div className="">
          <img src={emptyCart} alt="" />
          <p className="">
            <b>Your cart is empty</b>
          </p>
          <p>Check out all of our products</p>
          <button className="btn btn-black" onClick={closeOverlay}>
            <b>Products</b>
          </button>
        </div>
      </div>
    );
  };

  /* CLOSE OVERLAY */
  const closeOverlay = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="overlay" onClick={closeOverlay}>
      <div
        className="cart-items-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className=" x-btn" onClick={closeOverlay}>
          x
        </button>
        <h3>Shopping cart</h3>
        {user && user.cart.length ? (
          <div>
            <div className="clear-cart" onClick={clearCart}>
              <p>
                <i className="fas fa-trash text-danger"></i> empty cart
              </p>
            </div>
            {cartItems &&
              cartItems.map((product, index) => {
                return (
                  <div key={index}>
                    <CartItem
                      product={product}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                      index={index}
                      id={user._id}
                      setUser={setUser}
                    />
                    <hr />
                  </div>
                );
              })}
            <DivTotal />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};
