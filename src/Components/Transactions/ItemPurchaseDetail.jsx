import { useState, useEffect, useContext } from "react";
import { success } from "../../API/API";
import { userContext } from "../../Context/Contexts";

export const ItemPurchasedDetail = () => {
  const { user, setUser } = useContext(userContext);

  const compareCollectionsId = () => {
    let purchases = user.purchases;
    const url = window.location.href;
    const params = url.split("?")[1].split("&");
    const preferenceId = params[7].split("=")[1];
    if (!purchases) return;
    if (purchases[purchases.length - 1].id === preferenceId) {
      console.log("ok");
      purchases.status = "approved";
    } else console.log("nogotcha");
  };

  useEffect(() => {
    user && compareCollectionsId();
  }, [user]);
  return (
    <div>
      <p>item</p>
    </div>
  );
};
