import { useState, useEffect, useContext } from "react";
import { userContext } from "../../Context/Contexts";
import { Table } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { GoBackArrow } from "../Styled/GoBackArrow";
import { userTransactions } from "../../API/API";

// DISPLAY THE CURRENT USER TRANSACTIONS

export const TransactionList = () => {
  const { user } = useContext(userContext);
  const [purchases, setPurchases] = useState([]);

  const getUserTransactions = async () => {
    const transactions = await userTransactions(user._id);
    setPurchases(transactions);
  };

  useEffect(() => {
    if (user) {
      getUserTransactions();
    }
  }, [user]);

  return !user ? null : purchases ? (
    <div className="container text-center">
      <h3 className="text-center mt-3"> Transaction List</h3>
      <Table className=" mx-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Product</th>
            <th>Status</th>
          </tr>
        </thead>
        {purchases.map((elem, index) => {
          const { date, product, status, transaction_id } = elem;
          return (
            <tbody key={index}>
              <tr>
                <th
                  scope="row"
                  width="25%"
                  id={index}
                  className="cursorPointer"
                >
                  <Link
                    to={
                      "/ecommerce-client/transactiondetail/?" + transaction_id
                    }
                  >
                    Id: {transaction_id}
                  </Link>
                </th>
                <td width="25%">{new Date(date).toLocaleDateString()}</td>
                {product.length > 1 ? (
                  <td width="25%" className="multiple-items">
                    {product.map((elem) => {
                      return elem.title + " ";
                    })}
                  </td>
                ) : (
                  <td width="25%">{product[0].title}</td>
                )}
                <td width="25%">Status: {status}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      <GoBackArrow route={"/ecommerce-client/"} />
    </div>
  ) : (
    <div className="mt-5 text-center">
      <p className="spinner-grow">hola</p>
    </div>
  );
};
