import React, { useState } from "react";

export default function SortingComponent() {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const handleSorting = (sortValue: string) => {
    setOpenDropdown(false);
  };
  return (
    <div className="relative">
      <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
        <p className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          Sort
        </p>

        <button
          className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          onClick={() => setOpenDropdown(openDropdown ? false : true)}>
          <span className="sr-only">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={
          "absolute start-0 z-10 mt-2 w-36 px-2 py-2 rounded-md border border-gray-100 bg-white shadow-lg" +
          (openDropdown ? "" : " hidden")
        }
        role="menu">
        <button
          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-500 hover:text-white"
          role="menuItem"
          onClick={() => handleSorting("asc")}>
          from A to Z
        </button>

        <button
          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-500 hover:text-white"
          role="menuItem"
          onClick={() => handleSorting("desc")}>
          from Z to A
        </button>
      </div>
    </div>
  );
}
