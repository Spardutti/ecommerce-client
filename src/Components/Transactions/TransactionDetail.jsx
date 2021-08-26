import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import { purchaseDetail, getTransaction } from "../../API/API";
import { userContext } from "../../Context/Contexts";
import { GoBackArrow } from "../Styled/GoBackArrow";

// GET THE SPECIFIED TRANSACTION DETAILS
export const TransactionDetail = () => {
  const { user } = useContext(userContext);
  const [detail, setDetail] = useState();
  const [total, setTotal] = useState("");

  const getDetail = async () => {
    let url = window.location.href;
    let id = url.split("?")[1];
    const transaction = await getTransaction(id);
    if (transaction) {
      setDetail(transaction);
    }
  };

  useEffect(() => {
    getDetail();
  }, [user]);

  useEffect(() => {
    let totalPrice = 0;
    detail &&
      detail.product.forEach((elem) => {
        totalPrice += elem.quantity * elem.unit_price;
      });
    setTotal(totalPrice);
  }, [detail]);

  return !user ? null : detail ? (
    <div className="container">
      <h3>Transaction ID: {detail.transaction_id}</h3>
      <p>Date of transaction: {new Date(detail.date).toLocaleDateString()} </p>
      <p>Status: {detail.status}</p>
      <h5 className="text-center">Items purchased</h5>
      <table className="table text-center">
        <thead>
          <tr>
            <th>Item</th>
            <th>Unit price</th>
            <th>quantity</th>
          </tr>
        </thead>
        {detail.product.map((elem, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{elem.title}</td>
                <td>{elem.unit_price.toLocaleString()}</td>
                <td>{elem.quantity}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <h5 className="text-center">Total: {total.toLocaleString()}</h5>
      <GoBackArrow route={"/transactions"} />
    </div>
  ) : (
    <div className="mt-5 text-center">
      <p className="spinner-grow">hola</p>
    </div>
  );
};
