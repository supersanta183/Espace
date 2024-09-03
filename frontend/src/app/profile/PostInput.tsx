"use client";
import IPostDto, { IPost } from "@/interfaces/IPost";
import React from "react";
import { useState, useEffect } from "react";

interface Props {
  fetchPosts: () => void;
}

const PostInput: React.FC<Props> = ({fetchPosts}) => {
  const [post, setPost] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      // TODO open modal to confirm posting
      submitPost();
      return;
    }
  };

  const submitPost = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if(!accessToken){
        console.log("invalid access token");
        return;
      }

      let newPost : IPostDto = {
        Content: post,
      } 

      const response = await fetch("http://localhost:5064/new_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newPost),
      });

      const result: IPost = await response.json();
      console.log("post added successfully", result);
      fetchPosts();
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
