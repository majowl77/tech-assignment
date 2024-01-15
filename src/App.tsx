import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import PostDetails from "./components/postDetails/PostDetails";
import PageNotFound from "./pages/PageNotFound";
import Posts from "./pages/Posts";
import UserPosts from "./pages/UserPosts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/user-posts/:userId" element={<UserPosts />} />
        <Route
          path="/posts/user-posts/single-post/:Id"
          element={<PostDetails />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
