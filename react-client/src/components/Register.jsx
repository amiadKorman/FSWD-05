import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Register.module.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
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
        console.log(`User ${username} registered successfully`);
        navigate("/user-details", { state: { username, password } });
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
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label>Verify Password:</label>
          <input
            type="password"
            value={passwordVerify}
            onChange={(e) => setPasswordVerify(e.target.value)}
            required
          />
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
