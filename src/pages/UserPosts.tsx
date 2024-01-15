import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import BackButton from "../components/backButton/BackButton";
import { tableHeaders } from "../components/postsTable/PostsTable";
import Spinner from "../components/spinner/Spinner";
import { getPostsThunk } from "../redux/slices/postsSlice";
import { AppDispatch, RootState } from "../redux/store";

export default function UserPosts() {
  const { userId } = useParams();
  const posts = useSelector((state: RootState) => state.postsReducer);
  const dispatch = useDispatch<AppDispatch>();
  const postList = posts.postsList.filter(
    (post) => post.userId === Number(userId)
  );
  const userExists = posts.postsList.some(
    (user) => user.userId === Number(userId)
  );

  useEffect(() => {
    const handleGetPosts = async () => {
      dispatch(getPostsThunk());
    };
    handleGetPosts();
  }, []);

  return (
    <div className="container max-w-6xl mx-auto my-20 px-4 sm:px-8 overflow-x-auto rounded-lg shadow">
      {userExists ? (
        <div className="inline-block w-full overflow-hidden rounded-lg shadow">
          <div className=" px-2 py-3 text-2xl leading-tight text-left ">
            <Link to="/">
              <BackButton />
            </Link>
          </div>

          <table className="min-w-full leading-normal bg-white rounded-lg shadow ">
            {posts.isLoading ? (
              <div className=" h-80  bg-white flex items-center justify-center overflow-auto">
                <div>
                  <Spinner />
                </div>
              </div>
            ) : (
              <div>
                <thead>
                  <tr>
                    {tableHeaders.map((header, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                        {header.label}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"></th>
                  </tr>
                </thead>
                <tbody className="max-h-48 overflow-auto">
                  {posts.postsList.length > 0 &&
                    postList.map((post) => (
                      <tr key={post.id}>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <div className="flex items-center ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {post.userId}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap text-left ">
                            {post.title}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm  border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap text-left">
                            {post.body}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <Link to={`/posts/user-posts/single-post/${post.id}`}>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Post Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </div>
            )}
          </table>
        </div>
      ) : (
        <div className=" text-4xl ">
          <h1 className="uppercase tracking-widest text-gray-400">
            404 | User Id Not Found
          </h1>
        </div>
      )}
    </div>
  );
}
