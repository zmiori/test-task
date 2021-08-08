import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";

import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";
import {
  getCurrentUserData,
  logout,
  getUsers,
  updateUserFeed,
} from "./services/users-service";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const location = useLocation();
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    getUsers()
      .then((data) => setUserCards(data))
      .catch((e) => console.log(e));
  }, []);

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

  async function handleDrag(result) {
    const { destination, source, draggableId } = result;
    if (!isLoggedIn) {
      return;
    }
    if (!destination) {
      return;
    }

    const draggedItem = userCards.find((user) => user.username === draggableId);
    const updatedFeed = [...user.feed];
    updatedFeed.splice(destination.index, 0, draggedItem);
    await updateUserFeed(user._id, updatedFeed);
    const { data } = await getCurrentUserData(user.accessToken);
    setUser(data);
  }

  return (
    <>
      <NavBar
        isLoggedIn={isLoggedIn}
        onLogout={() => handleLogout()}
        user={user}
      />
      <Switch>
        <Route path="/">
          <HomeView
            isLoggedIn={isLoggedIn}
            user={user}
            userCards={userCards}
            onDrag={(result) => handleDrag(result)}
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;
