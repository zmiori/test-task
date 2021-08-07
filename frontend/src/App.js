import { useState, useEffect } from "react";
import { Switch, Route, useLocation, useParams } from "react-router-dom";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";

import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken && !isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      const token = new URLSearchParams(location.search).get("accessToken");
      if (token && !isLoggedIn) {
        localStorage.setItem("accessToken", token);
        setIsLoggedIn(true);
      }
    }
  }, [location.search]);

  function handleLogout() {
    localStorage.setItem("accessToken", "");
    setIsLoggedIn(false);
  }

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={() => handleLogout()} />
      <Switch>
        <Route path="/">
          <HomeView />
        </Route>
      </Switch>
    </>
  );
}

export default App;
