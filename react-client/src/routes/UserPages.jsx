import { Routes, Route } from "react-router-dom";
import Todos from "../components/Todos";
import Posts from "../components/Posts";
import Albums from "../components/Albums";
import Header from "../components/Header";
import Info from "../components/Info";
import HomePage from "../components/HomePage";

function UserPages() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/info" element={<Info />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:postId" element={<Posts />} />
      <Route path="/posts/:postId/comment" element={<Posts />} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/album/:albumId" element={<Albums />} />
      <Route path="/album/:albumId/photos" element={<Albums />} />
    </Routes>
  );
}

export default UserPages;