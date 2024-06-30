import React from "react";
import classes from "./Info.module.css";

function Info() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className={classes.container}>
      <h2>User Information</h2>
      <div className={classes.block}>
        <h3>Personal Details</h3>
        <p><strong>Full Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
      </div>
      <div className={classes.block}>
        <h3>Address</h3>
        <p><strong>Street:</strong> {user.address.street}</p>
        <p><strong>Suite:</strong> {user.address.suite}</p>
        <p><strong>City:</strong> {user.address.city}</p>
        <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
        <p><strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</p>
      </div>
      <div className={classes.block}>
        <h3>Company</h3>
        <p><strong>Name:</strong> {user.company.name}</p>
        <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
        <p><strong>BS:</strong> {user.company.bs}</p>
      </div>
    </div>
  );
};

export default Info;
