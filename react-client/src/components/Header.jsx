import React from "react";
import { Link, Outlet } from "react-router-dom";
import classes from "../css/Header.module.css";

function Header({ onLogout, children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : "";

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
  };

  return (
    <>
      <div>
        <header className={classes.header}>
          <h1>Welcome, {user?.name}</h1>
          <nav className={classes.nav}>
            <Link to={`/user/${userId}/home`}>Home</Link>
            <Link to={`/user/${userId}/info`}>Info</Link>
            <Link to={`/user/${userId}/todos`}>Todos</Link>
            <Link to={`/user/${userId}/posts`}>Posts</Link>
            <Link to={`/user/${userId}/albums`}>Albums</Link>
            <button onClick={handleLogout} className={classes.logoutButton}>
              Logout
            </button>
          </nav>
        </header>
        <div>{children}</div>
      </div>
      <Outlet />
    </>
  );
}

export default Header;
