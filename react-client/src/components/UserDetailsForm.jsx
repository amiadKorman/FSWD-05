import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './UserDetailsForm.module.css';

function UserDetailsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { username, password } = location.state;

  const handleUserDetails = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        id: Date.now(),
        name,
        username,
        email,
        website: password
      };
      // Save the new user to the server (this is a simulation)
      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/home');
    } catch (error) {
      console.error('Error saving user details', error);
    }
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleUserDetails} className={classes.form}>
        <div className={classes.formGroup}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className={classes.formGroup}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className={classes.submitButton}>Save</button>
      </form>
    </div>
  ); 
};

export default UserDetailsForm;
