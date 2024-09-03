import React from "react";

import { IPost } from "@/interfaces/IPost";

interface Props {
  post: IPost;
}

const DeletePost: React.FC<Props> = ({ post }) => {
  return (
    <button className="btn btn-ghost hover:text-red-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default DeletePost;
