import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import RegistrationPage from "./routes/RegisterationPage";
import UserPages from "./routes/UserPages";
import Header from "./components/Header";

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
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={`/user/${currentUserId}/home`} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/register/*"
        element={<RegistrationPage onRegister={handleLogin} />}
      />
      <Route
        path="/user/:userId/*"
        element={
          isAuthenticated ? (
            <Header onLogout={handleLogout}>
              <UserPages
                onLogout={handleLogout}
                isAuthenticated={isAuthenticated}
              />
            </Header>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
