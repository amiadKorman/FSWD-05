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
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser ? currentUser.id : null;

  function handleLogin(user) {
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    navigate(`/user/${user.id}/home`);
    console.log(`User ${user.name} logged in successfully`);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to={`/user/${currentUserId}/home`} /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register/*" element={<RegistrationPage onRegister={handleLogin} />} />
      <Route path="/user/:userId/home" element={isAuthenticated ? <Header onLogout={handleLogout}><HomePage /></Header> : <Navigate to="/login" />} />
      <Route path="/user/:userId/todos" element={isAuthenticated ? <Header onLogout={handleLogout}><Todos /></Header> : <Navigate to="/login" />} />
      <Route path="/user/:userId/info" element={isAuthenticated ? <Header onLogout={handleLogout}><Info /></Header> : <Navigate to="/login" />} />
      <Route path="/user/:userId/posts" element={isAuthenticated ? <Header onLogout={handleLogout}><Posts /></Header> : <Navigate to="/login" />} />
      <Route path="/user/:userId/posts/:postId" element={isAuthenticated ? <Header onLogout={handleLogout}><Posts /></Header> : <Navigate to="/login" />} />
      <Route path="/user/:userId/posts/:postId/comment" element={isAuthenticated ? <Header onLogout={handleLogout}><Posts /></Header> : <Navigate to="/login" />} />
      <Route path="/user/:userId/albums" element={isAuthenticated ? <Header onLogout={handleLogout}><Albums /></Header> : <Navigate to="/login" />} />
      <Route path="/user/:userId/album/:albumId" element={isAuthenticated ? <Header onLogout={handleLogout}><Albums /></Header> : <Navigate to="/login" />} />
      <Route path="/user/:userId/album/:albumId/photos" element={isAuthenticated ? <Header onLogout={handleLogout}><Albums /></Header> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
