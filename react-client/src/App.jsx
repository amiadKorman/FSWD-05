import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDetailsForm from "./components/UserDetailsForm";
import HomePage from "./routes/HomePage";

function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem("user");
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user-details" element={<UserDetailsForm />} />
      <Route
        path="/home"
        element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
