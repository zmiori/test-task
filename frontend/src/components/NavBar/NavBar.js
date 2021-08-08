import React from "react";
import { NavLink } from "react-router-dom";
import Container from "../Container";

import s from "./NavBar.module.css";

function NavBar({ isLoggedIn, onLogout, user }) {
  return (
    <div className={s.outline}>
      <Container>
        <header className={s.header}>
          <NavLink className={s.navlink} exact to="/">
            <h1 className={s.title}>Test Task</h1>
          </NavLink>

          {isLoggedIn ? (
            <div className={s.container}>
              <span className={s.item}>{user.name}</span>
              <img
                src={user.avatarURL}
                alt="user avatar"
                className={`${s.avatar} ${s.item}`}
              ></img>
              <button onClick={() => onLogout()} className={s.item}>
                Logout
              </button>
            </div>
          ) : (
            <a href="http://localhost:3000/auth/google"> Sign in with Google</a>
          )}
        </header>
      </Container>
    </div>
  );
}

export default NavBar;
