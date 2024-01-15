import { useEffect } from "react";
import { useDispatch } from "react-redux";

import PostsTable from "../components/postsTable/PostsTable";
import { getPostsThunk } from "../redux/slices/postsSlice";
import { AppDispatch } from "../redux/store";
import PerPageMenu from "../components/perPageMenu/PerPageMenu";

export default function Post() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleGetProducts = async () => {
      dispatch(getPostsThunk());
    };
    handleGetProducts();
  }, []);

  return (
    <div className="container max-w-6xl px-4 mx-auto my-12 sm:px-8">
      <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
        <h2 className="text-2xl leading-tight">Posts</h2>
        <div className="text-end">
          <PerPageMenu />
        </div>
      </div>

      <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <PostsTable />
        </div>
      </div>
    </div>
  );
}
