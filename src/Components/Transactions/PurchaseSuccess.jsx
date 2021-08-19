import { useState, useEffect, useContext } from "react";
import { updateSuccessPurchase } from "../../API/API";
import { userContext } from "../../Context/Contexts";
import { Redirect } from "react-router";

export const PurchaseSuccess = () => {
  const { user, setUser } = useContext(userContext);
  const [success, setSuccess] = useState(false);
  const [index, setIndex] = useState("");

  // COMPARES THE COLLECTIONID PARAM TO THE LAST ITEM ADD TO THE CART.
  // IF THEY MATCH. UPDATE THE STATUS TO APPROVED.
  const compareCollectionsId = async () => {
    let purchases = user.purchases;
    let url = window.location.href;
    setIndex(purchases.length - 1);
    if (url.split("?")[1]) {
      const params = url.split("?")[1].split("&");
      const preferenceId = params[7].split("=")[1];
      if (!purchases) return;
      if (purchases[purchases.length - 1].id === preferenceId) {
        setUser(await updateSuccessPurchase(user._id, purchases.length - 1));
        window.history.replaceState(null, null, url.split("?")[0]);
        setSuccess(true);
        // REDIRECT TO LAST ITEM PURCHASES
      }
    }
  };

  useEffect(() => {
    user && compareCollectionsId();
  }, [user]);

  return success ? <Redirect to={"/transactiondetail?" + index} /> : null;
};
