import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Register.module.css";

function Register() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const passwordVerifyRef = useRef("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const passwordVerify = passwordVerifyRef.current.value;

    if (password !== passwordVerify) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const userExists = users.some((user) => user.username === username);
      if (userExists) {
        setError("Username already exists");
      } else {
        // Navigate to user details form page
        navigate("/register/details", {
          state: { username: username, password: password },
        });
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleRegister} className={classes.form}>
        <div className={classes.formGroup}>
          <label>Username:</label>
          <input type="text" ref={usernameRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>Password:</label>
          <input type="password" ref={passwordVerifyRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>Verify Password:</label>
          <input type="password" ref={passwordRef} required />
        </div>
        <button type="submit" className={classes.submitButton}>
          Register
        </button>
        {error && <p className={classes.errorMessage}>{error}</p>}
        <div className={classes.loginLink}>
          <span>Already have an account?</span>
          <br />
          <Link to="/login" className={classes.loginButton}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
