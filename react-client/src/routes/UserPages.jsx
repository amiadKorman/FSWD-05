import { Routes, Route } from "react-router-dom";
import Todos from "../components/Todos";
import Posts from "../components/Posts";
import Albums from "../components/Albums";
import Header from "../components/Header";
import Info from "../components/Info";
import HomePage from "../components/HomePage";

function UserPages({ onLogout, isAuthenticated }) {
  return (
    <Routes>
      <Route path="/home" element={isAuthenticated ? <Header onLogout={onLogout}><HomePage /></Header> : <Navigate to="/login" />} />
      <Route path="/todos" element={isAuthenticated ? <Header onLogout={onLogout}><Todos /></Header> : <Navigate to="/login" />} />
      <Route path="/info" element={isAuthenticated ? <Header onLogout={onLogout}><Info /></Header> : <Navigate to="/login" />} />
      <Route path="/posts" element={isAuthenticated ? <Header onLogout={onLogout}><Posts /></Header> : <Navigate to="/login" />} />
      <Route path="/posts/:postId" element={isAuthenticated ? <Header onLogout={onLogout}><Posts /></Header> : <Navigate to="/login" />} />
      <Route path="/posts/:postId/comment" element={isAuthenticated ? <Header onLogout={onLogout}><Posts /></Header> : <Navigate to="/login" />} />
      <Route path="/albums" element={isAuthenticated ? <Header onLogout={onLogout}><Albums /></Header> : <Navigate to="/login" />} />
      <Route path="/album/:albumId" element={isAuthenticated ? <Header onLogout={onLogout}><Albums /></Header> : <Navigate to="/login" />} />
      <Route path="/album/:albumId/photos" element={isAuthenticated ? <Header onLogout={onLogout}><Albums /></Header> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default UserPages;