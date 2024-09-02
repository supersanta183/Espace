'use client'
import React from "react";
import { useState } from "react";

const PostInput = () => {
    const [post, setPost] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === "Enter" && e.shiftKey) {
            return;
        }
        if(e.key === "Enter") {
            e.preventDefault();
            // TODO open modal to confirm posting
            return;
        }
    }
  return (
    <div className="flex flex-col">
      <textarea
        placeholder="What's on your mind?"
        className="textarea textarea-bordered textarea-lg w-full"
        onKeyDown={handleKeyDown}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>
    </div>
  );
};

export default PostInput;
