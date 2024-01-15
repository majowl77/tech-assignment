import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../redux/store";
import { Post, TableHeaders } from "../../types/posts";
import Spinner from "../spinner/Spinner";

export const tableHeaders = [
  { id: 1, key: "userId", lable: "User Id" },
  { id: 2, key: "title", lable: "Title" },
  { id: 3, key: "body", lable: "Body" },
];

export default function PostsTable() {
  const posts = useSelector((state: RootState) => state.postsReducer);

  // sorting logic
  const [sort, setSort] = useState({
    headerToSort: "userId",
    direction: "asc",
  });
  function handleTableHeaderClick(header: TableHeaders) {
    setSort({
      headerToSort: header.key,
      direction:
        header.key === sort.headerToSort
          ? sort.direction === "asc"
            ? "desc"
            : "asc"
          : "desc",
    });
  }
  function getSortedTable(arrayToSort: Post[]) {
    const newArray = [...arrayToSort];

    if (sort.direction === "asc") {
      return newArray.sort((a, b) =>
        (a[sort.headerToSort as keyof Post] as string) >
        (b[sort.headerToSort as keyof Post] as string)
          ? 1
          : -1
      );
    }
    return newArray.sort((a, b) =>
      (a[sort.headerToSort as keyof Post] as string) >
      (b[sort.headerToSort as keyof Post] as string)
        ? -1
        : 1
    );
  }
  const sortedArray = useMemo(
    () => getSortedTable(posts.postsList),
    [posts.postsList, sort]
  );

  // pagination Logic
  const perPageNumber = useSelector(
    (state: RootState) => state.postsReducer.perPage
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalNumberOfPages = Math.ceil(sortedArray.length / perPageNumber);
  function handlePreviosePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }
  function handlePageChange(page: number) {
    setCurrentPage(page);
  }
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * perPageNumber;
    const indexOfFirstItem = indexOfLastItem - perPageNumber;
    return sortedArray.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, perPageNumber, sortedArray]);

  // Calculateing the range of pages to display
  const pageRange = () => {
    const totalButtons = 4;
    const halfTotalButtons = Math.floor(totalButtons / 2);

    if (totalNumberOfPages <= totalButtons) {
      return Array.from(
        { length: totalNumberOfPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= halfTotalButtons) {
      return Array.from({ length: totalButtons }, (_, index) => index + 1);
    }

    if (currentPage + halfTotalButtons > totalNumberOfPages) {
      return Array.from(
        { length: totalButtons },
        (_, index) => totalNumberOfPages - totalButtons + index + 1
      );
    }

    return Array.from(
      { length: totalButtons },
      (_, index) => currentPage - halfTotalButtons + index
    );
  };
  const renderPageButtons = () => {
    return pageRange().map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        type="button"
        className={`w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100 ${
          pageNumber === currentPage ? " bg-indigo-100 " : ""
        }`}>
        {pageNumber}
      </button>
    ));
  };

  return (
    <div>
      <table className="min-w-full leading-normal bg-white  ">
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
                    onClick={() => handleTableHeaderClick(header)}
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                    {header.lable}

                    {sort.headerToSort === header.key && (
                      <span className="px-4">
                        <FontAwesomeIcon icon={faSort} />
                      </span>
                    )}
                  </th>
                ))}
                <th
                  scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"></th>
              </tr>
            </thead>

            <tbody className="max-h-48 overflow-auto">
              {posts.postsList.length > 0 &&
                currentItems.map((post) => (
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
          </div>
        )}
      </table>
      <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handlePreviosePage}
            disabled={currentPage === 1}
            className={
              "w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100" +
              (currentPage === 1
                ? " cursor-not-allowed bg-gray-200 hover:bg-gray-200 text-gray-300"
                : "")
            }>
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
          {totalNumberOfPages > 0 && renderPageButtons()}
          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === totalNumberOfPages}
            className={
              "w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100" +
              (currentPage === totalNumberOfPages
                ? "cursor-not-allowed bg-gray-200 hover:bg-gray-200 text-gray-300"
                : "")
            }>
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
  );
}
