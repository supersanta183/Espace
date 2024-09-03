import { IPost } from "@/interfaces/IPost";
import React from "react";

import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

interface PostProps {
  post: IPost;
}

const OwnPost: React.FC<PostProps> = ({ post }) => {
  const getDate = () => {
    const times = new Date(post.postTime);
    return times.toDateString();
  };

  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <div className="card-body">
        <div className="flex w-full">
          <div className="avatar placeholder p-2">
            <div className="bg-neutral text-neutral-content w-12 rounded-full">
              <span className="text-3xl">{post.poster[0]}</span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <h2 className="card-title">{post.poster}</h2>
            <time>{getDate()}</time>
          </div>

          <div className="flex w-full items-start justify-end gap-2">
            <EditPost post={post} />
            <DeletePost post={post} />
          </div>
        </div>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default OwnPost;
