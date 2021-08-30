import { useState, useEffect } from "react";
import { allTransactions } from "../../API/API";
import { Table } from "reactstrap";

//TODO ADD TRANSACTION DETAIL

export const AdminTransactions = (props) => {
  const [transactions, setTransactions] = useState([]);

  const getAllTransactions = async () => {
    const data = await allTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    getAllTransactions();
    return () => setTransactions([]);
  }, []);

  return (
    <div className="container text-center">
      <h3 className="text-center my-5">Transaction List</h3>
      <Table responsive size="sm" bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        {transactions.length &&
          transactions.map((elem, index) => {
            const { transaction_id, user, date, product, status } = elem;
            return (
              <tbody key={index} id={transaction_id}>
                <tr>
                  <td>{transaction_id}</td>
                  <td>{user.username}</td>
                  <td>{new Date(date).toLocaleDateString()}</td>
                  {product.length > 1 ? (
                    <td className="multiple-items">
                      {product.map((elem) => {
                        return elem.title + " ";
                      })}
                    </td>
                  ) : (
                    <td width="25%">{product[0].title}</td>
                  )}
                  <td>{status}</td>
                </tr>
              </tbody>
            );
          })}
      </Table>
    </div>
  );
};
