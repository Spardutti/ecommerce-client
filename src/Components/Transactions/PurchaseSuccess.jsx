import { useState, useEffect, useContext } from "react";
import { updateTransactionStatus, updateUserCart } from "../../API/API";
import { Redirect } from "react-router";
import { userContext } from "../../Context/Contexts";

export const PurchaseSuccess = () => {
  const [success, setSuccess] = useState(false);
  const [preferenceId, setPreferenceId] = useState("");
  const { user, setUser } = useContext(userContext);

  // UPDATE THE TRANSACTION TO APPROVED STATUS
  const compareCollectionsId = async () => {
    const url = window.location.href;
    if (url.split("?")[1]) {
      const params = url.split("?")[1].split("&");
      const id = params[7].split("=")[1];
      setPreferenceId(id);
      await updateTransactionStatus(id, "approved");
      const cart = [];
      const newCart = await updateUserCart(user._id, cart);
      setUser(newCart);
      window.history.replaceState(null, null, url.split("?")[0]);
      setSuccess(true);
    }
  };

  useEffect(() => {
    user && compareCollectionsId();
  }, [user]);

  return success ? (
    <Redirect to={"/ecommerce-client/transactiondetail?" + preferenceId} />
  ) : null;
};
