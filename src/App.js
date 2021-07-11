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
import { AdminProductos } from "./Components/Admin/AdminProductos";

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
          <Route path="/compras" component={Compras} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/newaccount" component={NewAccount} />
          <Route path="/admin-productos" component={AdminProductos} />
          <Route path="/" component={Home} />
        </Switch>
      </userContext.Provider>
    </HashRouter>
  );
}

export default App;
