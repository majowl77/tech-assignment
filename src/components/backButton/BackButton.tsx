import React from "react";

export default function BackButton() {
  return (
    <button>
      <div className="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-2 text-white-600 transition-colors hover:bg-black   ">
        <span className=" text-xs transition-colors group-hover:text-white">
          Back to Previous page
        </span>

        <span className="shrink-0 rounded-full border border-white  p-2 group-active:border-indigo-500">
          <svg
            className="h-5 w-5 transform rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </div>
    </button>
  );
}
