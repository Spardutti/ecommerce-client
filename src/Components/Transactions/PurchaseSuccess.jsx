import { useState, useEffect } from "react";
import { updateTransactionStatus } from "../../API/API";
import { Redirect } from "react-router";

export const PurchaseSuccess = () => {
  const [success, setSuccess] = useState(false);
  const [preferenceId, setPreferenceId] = useState("");

  // UPDATE THE TRANSACTION TO APPROVED STATUS
  const compareCollectionsId = async () => {
    const url = window.location.href;
    if (url.split("?")[1]) {
      const params = url.split("?")[1].split("&");
      const id = params[7].split("=")[1];
      setPreferenceId(id);
      await updateTransactionStatus(id, "approved");
      window.history.replaceState(null, null, url.split("?")[0]);
      setSuccess(true);
    }
  };

  useEffect(() => {
    compareCollectionsId();
  }, []);

  return success ? (
    <Redirect to={"/transactiondetail?" + preferenceId} />
  ) : null;
};
