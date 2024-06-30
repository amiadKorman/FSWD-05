import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDetailsForm from "./components/UserDetailsForm";
import Todos from "./components/Todos"; // Import the Todos component
import Posts from "./components/Posts"; // Import the Posts component
import Albums from "./components/Albums"; // Import the Albums component
import Header from "./components/Header"; // Import the Header component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") ? true : false;
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
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/details" element={<UserDetailsForm onRegister={handleLogin} />} />
      <Route path="/home" element={isAuthenticated ? <Header onLogout={handleLogout}><div>Home Page</div></Header> : <Navigate to="/login" />} />
      <Route path="/todos" element={isAuthenticated ? <Header onLogout={handleLogout}><Todos /></Header> : <Navigate to="/login" />} />
      <Route path="/posts" element={isAuthenticated ? <Header onLogout={handleLogout}><Posts /></Header> : <Navigate to="/login" />} />
      <Route path="/albums" element={isAuthenticated ? <Header onLogout={handleLogout}><Albums /></Header> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
