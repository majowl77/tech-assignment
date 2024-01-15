import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import Post from "./pages/Post";
import UserPosts from "./pages/UserPosts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/posts/user-posts/:userId" element={<UserPosts />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
