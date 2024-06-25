import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className={classes.header}>
      <h1>Welcome, {user?.name}</h1>
      <nav className={classes.nav}>
        <Link to="/home">Home</Link>
        <Link to="/info">Info</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/albums">Albums</Link>
        <button onClick={handleLogout} className={classes.logoutButton}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
