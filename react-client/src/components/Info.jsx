import React from "react";
import classes from "./Info.module.css";

const Info = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className={classes.container}>
      <h2>User Information</h2>
      <div className={classes.info}>
        <p>
          <strong>Full Name:</strong> {user.name}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {user.address.street}, {user.address.suite},{" "}
          {user.address.city}, {user.address.zipcode}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
        <p>
          <strong>Catch Phrase:</strong> {user.company.catchPhrase}
        </p>
        <p>
          <strong>BS:</strong> {user.company.bs}
        </p>
      </div>
    </div>
  );
};

export default Info;
