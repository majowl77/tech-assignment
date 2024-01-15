import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getSingleUserPostsThunk } from "../../redux/slices/postsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import BackButton from "../backButton/BackButton";
import Spinner from "../spinner/Spinner";

export default function PostDetails() {
  const { Id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.postsReducer);
  const postDetails = useSelector(
    (state: RootState) => state.postsReducer.singlePost
  );
  useEffect(() => {
    const handleGetPosts = async () => {
      dispatch(getSingleUserPostsThunk(Number(Id)));
    };
    handleGetPosts();
  }, []);

  return (
    <div>
      <div className="absolute top-16 left-60 px-2 py-3 text-2xl leading-tight text-left ">
        <Link to={`/posts/user-posts/${postDetails?.userId}`}>
          <BackButton />
        </Link>
      </div>
      <div className=" mx-64 ">
        <h2 className=" px-2 py-3 text-2xl leading-tight text-left">
          Post Details
        </h2>
        <div className="rounded-xl border-2 border-gray-100 bg-white text-start">
          {posts.isLoading ? (
            <div className=" h-80 w-96 bg-white flex items-center justify-center overflow-auto">
              <div>
                <Spinner />
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8 w-180">
              <div>
                <h1 className="font-medium sm:text-lg  text-indigo-400">
                  {postDetails?.title}
                </h1>

                <p className="line-clamp-2 text-m text-gray-700 ">
                  {postDetails?.body}
                </p>

                <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                  <div className="flex items-center gap-1 text-gray-500">
                    <p className="text-s"> User Id {postDetails?.userId}</p>
                  </div>

                  <span className="hidden sm:block" aria-hidden="true">
                    &middot;
                  </span>

                  <p className="hidden sm:block sm:text-s sm:text-gray-500">
                    Post Id {postDetails?.id}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
