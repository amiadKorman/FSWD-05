import React, { useState, useRef } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import classes from "./UserDetailsForm.module.css";

function UserDetailsForm({ onRegister }) {
  //id
  const nameRef = useRef("");
  //username
  const emailRef = useRef("");
  //address:
  const streetRef = useRef("");
  const suiteRef = useRef("");
  const cityRef = useRef("");
  const zipcodeRef = useRef("");
  // address/geo
  const latRef = useRef("");
  const lngRef = useRef("");
  const phoneRef = useRef("");
  //website==password
  //company:
  const compNameRef = useRef("");
  const catchPhraseRef = useRef("");
  const bsRef = useRef("");
  const [error, setError] = useState("");
  const location = useLocation();
  const { username, password } = location.state;

  const handleUserDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        setError(
          `An HTTP ${response.status} error occurred. Please try again.`
        );
      }
      const users = await response.json();
      const largestUserId = users.reduce((acc, user) => {
        return parseInt(user.id) > acc ? parseInt(user.id) : acc;
      }, 0);

      const newUser = {
        id: String(largestUserId + 1),
        name: nameRef.current.value,
        username: username,
        email: emailRef.current.value,
        address: {
          street: streetRef.current.value,
          suite: suiteRef.current.value,
          city: cityRef.current.value,
          zipcode: zipcodeRef.current.value,
          geo: {
            lat: latRef.current.value,
            lng: lngRef.current.value,
          },
        },
        phone: phoneRef.current.value,
        website: password,
        company: {
          name: compNameRef.current.value,
          catchPhrase: catchPhraseRef.current.value,
          bs: bsRef.current.value,
        },
      };
      // Save the new user to the server (this is a simulation)
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      onRegister(newUser);
    } catch (error) {
      console.error("Error saving user details", error.message);
    }
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleUserDetails} className={classes.form}>
        <div className={classes.formGroup}>
          <label>Name:</label>
          <input type="text" ref={nameRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>Email:</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>Street:</label>
          <input type="text" ref={streetRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>Suite:</label>
          <input type="text" ref={suiteRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>City:</label>
          <input type="text" ref={cityRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>Zipcode:</label>
          <input type="text" ref={zipcodeRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>Latitude:</label>
          <input type="text" ref={latRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>Longitude:</label>
          <input type="text" ref={lngRef} required />
        </div>
        <div className={`${classes.formGroup} ${classes.fullWidth}`}>
          <label>Phone:</label>
          <input type="text" ref={phoneRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>Company Name:</label>
          <input type="text" ref={compNameRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>Catch Phrase:</label>
          <input type="text" ref={catchPhraseRef} required />
        </div>
        <div className={classes.formGroup}>
          <label>BS:</label>
          <input type="text" ref={bsRef} required />
        </div>
        <button type="submit" className={classes.submitButton}>
          Submit
        </button>
        {error && <p className={classes.errorMessage}>{error}</p>}
        <div className={classes.loginLink}>
          <span>Return to </span>
          <Link to="/login" className={classes.loginButton}>
            Login
          </Link>
          <br />
          <span>or </span>
          <Link to="/register" className={classes.registerButton}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserDetailsForm;
