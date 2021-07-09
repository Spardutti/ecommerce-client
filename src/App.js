import Home from "./Components/Home";
import { Navigation } from "./Components/Navbar";
import { useState, useEffect } from "react";
import { tokenContext, userContext } from "./Context/Contexts";
import { checkForToken, userData } from "./API/API";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Token } from "./Components/Token";
import { Compras } from "./Components/Compras";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    setToken(checkForToken());
  }, []);

  return (
    <HashRouter>
      <tokenContext.Provider value={token}>
        <userContext.Provider value={user}>
          <Navigation />
          <Switch>
            <Route path="/logged" component={Token} />
            <Route path="/compras" component={Compras} />
            <Route path="/" component={Home} />
          </Switch>
        </userContext.Provider>
      </tokenContext.Provider>
    </HashRouter>
  );
}

export default App;
