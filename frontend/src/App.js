import { useState, useEffect } from "react";
import { Switch, Route, useLocation, useParams } from "react-router-dom";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";

import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";
import { getCurrentUserData, logout } from "./services/users-service";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("accessToken");
    token && localStorage.setItem("accessToken", token);
    const savedToken = localStorage.getItem("accessToken");

    if (savedToken) {
      getCurrentUserData(savedToken)
        .then(({ data }) => setUser(data))
        .then(() => setIsLoggedIn(true));
    }
  }, [location.search]);

  async function handleLogout() {
    await logout(user);
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
