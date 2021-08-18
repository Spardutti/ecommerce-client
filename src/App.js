import Home from "./Components/Home";
import { NavBar } from "./Components/Navbar";
import { useState, useEffect } from "react";
import { userContext } from "./Context/Contexts";
import { userData, checkForToken } from "./API/API";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Token } from "./Components/Token";
import { Compras } from "./Components/Compras";
import { LoginScreen } from "./Components/LoginScreen";
import { NewAccount } from "./Components/NewAccount";
import { AdminHome } from "./Components/Admin/AdminHome";
import { ProductDetail } from "./Components/ProductDetail";
import { AdminCategory } from "./Components/Admin/AdminCategory";
import { Cart } from "./Components/Cart";
import { PurchaseSuccess } from "./Components/Transactions/PurchaseSuccess";
import { TransactionList } from "./Components/Transactions/TransactionList";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const token = checkForToken();
      if (token) setUser(await userData());
      else setUser(null);
    })();
  }, []);

  return (
    <HashRouter>
      <userContext.Provider value={{ user, setUser }}>
        <NavBar />
        <Switch>
          <Route path="/logged" component={Token} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/newaccount" component={NewAccount} />
          <Route path="/admin-productos" component={AdminHome} />
          <Route path="/admin-categorias" component={AdminCategory} />
          <Route path="/cart" component={Cart} />
          <Route path="/purchasesuccess" component={PurchaseSuccess} />
          <Route path="/transactions" component={TransactionList} />
          {user && (
            <Route
              path="/product"
              render={(props) => <ProductDetail id={user._id} {...props} />}
            />
          )}
          <Route path="/" component={Home} />
        </Switch>
      </userContext.Provider>
    </HashRouter>
  );
}

export default App;
