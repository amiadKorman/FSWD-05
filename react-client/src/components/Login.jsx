import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";

function Login({ onLogin }) {
  const [error, setError] = useState("");
  const username = useRef("");
  const password = useRef("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error(`An HTTP ${response.status} error occurred. Please try again.`);
      }
      const users = await response.json();
      const user = users.find(
        (user) =>
          user.username === username.current.value &&
          user.website === password.current.value
      );
      if (user) {
        onLogin(user);
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred in fetching users." + err.message);
    }
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleLogin} className={classes.form}>
        <div className={classes.formGroup}>
          <label>Username:</label>
          <input type="text" ref={username} required />
        </div>
        <div className={classes.formGroup}>
          <label>Password:</label>
          <input type="password" ref={password} required />
        </div>
        <button type="submit" className={classes.submitButton}>
          Login
        </button>
        {error && <p className={classes.errorMessage}>{error}</p>}
        <div className={classes.registerLink}>
          <span>Don't have an account?</span>
          <br />
          <Link to="/register" className={classes.registerButton}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
