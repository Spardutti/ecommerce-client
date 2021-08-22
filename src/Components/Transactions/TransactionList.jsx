import { useState, useEffect, useContext } from "react";
import { userContext } from "../../Context/Contexts";
import { Table } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { GoBackArrow } from "../Styled/GoBackArrow";

// DISPLAY THE LIST OF ALL TRANSACTIONS

export const TransactionList = () => {
  const { user } = useContext(userContext);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (user) {
      let sorted = user.purchases.sort((a, b) =>
        a.date > b.date ? -1 : b.date > a.date ? 1 : 0
      );
      setPurchases(sorted);
    }
  }, [user, purchases]);

  return !user ? (
    <Redirect to="/" />
  ) : purchases ? (
    <div className="container">
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
          const { date, items, status } = elem;
          return (
            <tbody key={index}>
              <tr>
                <th
                  scope="row"
                  width="25%"
                  id={index}
                  className="cursorPointer"
                >
                  <Link to={"/transactiondetail/?" + index}>
                    Id: {elem.id.split("-")[1]}
                  </Link>
                </th>
                <td width="25%">{date}</td>
                {items.length > 1 ? (
                  <td width="25%" className="multiple-items">
                    {items.map((elem) => {
                      return elem.title + " ";
                    })}
                  </td>
                ) : (
                  <td width="25%">{items[0].title}</td>
                )}
                <td width="25%">Status: {status}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>

      <GoBackArrow route={"/"} />
    </div>
  ) : null;
};
