import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classes from './Login.module.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      const user = users.find(user => user.username === username && user.website === password);
      console.log(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log(`User ${user.name} logged in successfully`);
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleLogin} className={classes.form}>
        <div className={classes.formGroup}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className={classes.formGroup}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className={classes.submitButton}>Login</button>
        {error && <p className={classes.errorMessage}>{error}</p>}
        <div className={classes.registerLink}>
          <span>Don't have an account?</span>
          <br />
          <Link to="/register" className={classes.registerButton}>Register</Link>
        </div>
      </form>
    </div>
  );  
};

export default Login;
