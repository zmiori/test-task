import { useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";

import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/">
          <HomeView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
