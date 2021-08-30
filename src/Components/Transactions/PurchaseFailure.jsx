// TODO DO FAILURE PAGE
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../Context/Contexts";
import { updateTransactionStatus } from "../../API/API";
import { Redirect } from "react-router";

export const PurchaseFailure = (props) => {
  const [success, setSuccess] = useState(false);
  const [preferenceId, setPreferenceId] = useState("");
  const { user } = useContext(userContext);

  // UPDATE THE TRANSACTION TO APPROVED STATUS
  const compareCollectionsId = async () => {
    const url = window.location.href;
    if (url.split("?")[1]) {
      const params = url.split("?")[1].split("&");
      const id = params[7].split("=")[1];
      setPreferenceId(id);
      await updateTransactionStatus(id, "canceled");
      window.history.replaceState(null, null, url.split("?")[0]);
      setSuccess(true);
    }
  };

  useEffect(() => {
    console.log("here");
    user && compareCollectionsId();
  }, [user]);

  return success ? (
    <Redirect to={"/transactiondetail?" + preferenceId} />
  ) : null;
};
