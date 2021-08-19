import { useState, useEffect, useContext } from "react";
import { userContext } from "../../Context/Contexts";
import { Table } from "reactstrap";
import { Redirect } from "react-router";

export const TransactionList = () => {
  const { user, setUser } = useContext(userContext);
  const [purchases, setPurchases] = useState([]);
  const [purchaseDetail, setPurchaseDetail] = useState("");

  useEffect(() => {
    //TODO REVERSE
    user && setPurchases(user.purchases);
  }, [user]);

  return purchases ? (
    <div>
      <h3 className="text-center mt-3"> Transaction List</h3>
      <Table className="w-75 mx-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Product</th>
            <th>Status</th>
          </tr>
        </thead>
        {purchases.map((elem, index) => {
          const { date, items, status } = elem;
          return (
            <tbody key={index}>
              <tr>
                <th
                  scope="row"
                  width="25%"
                  id={index}
                  className="cursorPointer"
                  onClick={(e) => setPurchaseDetail(e.target.id)}
                >
                  Id: {elem.id.split("-")[1]}
                </th>
                <td width="25%">{date.split("T")[0]}</td>
                <td width="25%">{items[0].title}</td>
                <td width="25%">Status: {status}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      {purchaseDetail ? (
        <Redirect to={"/transactiondetail?" + purchaseDetail} />
      ) : null}
    </div>
  ) : null;
};
