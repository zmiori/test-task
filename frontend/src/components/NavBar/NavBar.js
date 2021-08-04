import React from "react";
import { NavLink } from "react-router-dom";
import Container from "../Container";

import s from "./NavBar.module.css";

function NavBar({ isLoggedIn }) {
  return (
    <div className={s.outline}>
      <Container>
        <header className={s.header}>
          <NavLink className={s.navlink} exact to="/">
            <h1 className={s.title}>Test Task</h1>
          </NavLink>

          {isLoggedIn ? "Logged in" : "Not logged in"}
        </header>
      </Container>
    </div>
  );
}

export default NavBar;
