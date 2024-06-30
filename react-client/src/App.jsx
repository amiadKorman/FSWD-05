import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Todos from "./components/Todos";
import Posts from "./components/Posts";
import Albums from "./components/Albums";
import Header from "./components/Header";
import Info from "./components/Info";
import NotFound from "./components/NotFound";
import RegistrationPage from "./routes/RegisterationPage";
import HomePage from "./routes/HomePage";

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
      <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register/*" element={<RegistrationPage onRegister={handleLogin} />} />
      <Route path="/home" element={isAuthenticated ? <Header onLogout={handleLogout}><HomePage /></Header> : <Navigate to="/login" />} />
      <Route path="/todos" element={isAuthenticated ? <Header onLogout={handleLogout}><Todos /></Header> : <Navigate to="/login" />} />
      <Route path="/info" element={isAuthenticated ? <Header onLogout={handleLogout}><Info /></Header> : <Navigate to="/login" />} />
      <Route path="/posts" element={isAuthenticated ? <Header onLogout={handleLogout}><Posts /></Header> : <Navigate to="/login" />} />
      <Route path="/albums" element={isAuthenticated ? <Header onLogout={handleLogout}><Albums /></Header> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
