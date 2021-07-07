import Home from "./Components/Home";
import { Navigation } from "./Components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState("");
  // CHECK FOR TOKEN
  useEffect(() => {
    console.log(localStorage);
  }, []);
  return (
    <div>
      <Navigation />
      <Home />
    </div>
  );
}

export default App;
