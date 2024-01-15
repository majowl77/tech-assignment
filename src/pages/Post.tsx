import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PostsTable from "../components/postsTable/PostsTable";

import SortingComponent from "../components/sortingPost/Sorting";
import { getPostsThunk } from "../redux/slices/postsSlice";
import { AppDispatch } from "../redux/store";

export default function Post() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleGetProducts = async () => {
      dispatch(getPostsThunk());
    };
    handleGetProducts();
  }, []);

  return (
    <div className="container max-w-6xl px-4 mx-auto sm:px-8">
      <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
        <h2 className="text-2xl leading-tight">Posts</h2>
        {/* <div className="text-end">
          <SortingComponent />
        </div> */}
      </div>

      <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <PostsTable />
          <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
            <div className="flex items-center">
              <button
                type="button"
                className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                <svg
                  width="9"
                  fill="currentColor"
                  height="8"
                  className=""
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                </svg>
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 ">
                1
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                2
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100">
                3
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                4
              </button>
              <button
                type="button"
                className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                <svg
                  width="9"
                  fill="currentColor"
                  height="8"
                  className=""
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
