import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDetailsForm from "./components/UserDetailsForm";
import HomePage from "./routes/HomePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    localStorage.getItem("user") ? true : false;
  });
  const navigate = useNavigate();

  function handleLogin(user) {
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/home");
    console.log(`User ${user.name} logged in successfully`);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login onLogin={handleLogin}/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/details" element={<UserDetailsForm onRegister={handleLogin} />} />
      <Route path="/home" element={isAuthenticated ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
