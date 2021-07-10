import Home from "./Components/Home";
import { Navigation } from "./Components/Navbar";
import { useState, useEffect } from "react";
import { userContext } from "./Context/Contexts";
import { userData, checkForToken } from "./API/API";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Token } from "./Components/Token";
import { Compras } from "./Components/Compras";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      checkForToken();
      setUser(await userData());
    })();
  }, []);

  return (
    <HashRouter>
      <userContext.Provider value={user}>
        <Navigation />
        <Switch>
          <Route path="/logged" component={Token} />
          <Route path="/compras" component={Compras} />
          <Route path="/" component={Home} />
        </Switch>
      </userContext.Provider>
    </HashRouter>
  );
}

export default App;
