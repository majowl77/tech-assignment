import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../redux/store";
import { Post, TableHeaders } from "../../types/posts";

export const tableHeaders = [
  { id: 1, key: "USERID", lable: "User Id" },
  { id: 2, key: "TITLE", lable: "Title" },
  { id: 3, key: "BODY", lable: "Body" },
  { id: 4, key: " ", lable: "" },
];

export default function PostsTable() {
  const posts = useSelector((state: RootState) => state.postsReducer);
  const [sort, setSort] = useState({
    headerToSort: "USERID",
    direction: "asc",
  });

  function handleTableHeaderClick(header: TableHeaders) {
    console.log("🚀 ~ handleTableHeaderClick ~ header:", header);
    setSort({
      headerToSort: header.key,
      direction:
        header.key === sort.headerToSort
          ? sort.direction === "asc"
            ? "desc"
            : "asc"
          : "desc",
    });

    function getSortedTable(arrayToSort ){
      if( sort.direction === 'asc'){
        return arrayToSort
      }

    }
  }
  return (
    <div>
      <table className="min-w-full leading-normal bg-white ">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                onClick={() => handleTableHeaderClick(header)}
                scope="col"
                className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                {header.lable}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.postsList.length > 0 &&
            posts.postsList.slice(0, 5).map((post) => (
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
                  <Link to={`/posts/user-posts/${post.userId}`}>
                    <button className="text-indigo-600 hover:text-indigo-900">
                      All user's posts
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
