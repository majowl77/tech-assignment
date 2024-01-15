import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSingleUserPostsThunk } from "../redux/slices/postsSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Post } from "../types/posts";

export default function UserPosts() {
  const { userId } = useParams();
  const posts = useSelector((state: RootState) => state.postsReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleGetProducts = async () => {
      dispatch(getSingleUserPostsThunk(Number(userId)));
    };
    handleGetProducts();
  }, []);

  return (
    <div>
      here's the user Id{userId}
      <div> just to check</div>
    </div>
  );
}
