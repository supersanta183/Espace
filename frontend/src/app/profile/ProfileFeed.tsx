"use client";
import { IPost } from "@/interfaces/IPost";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import OwnPost from "./OwnPost";

interface Props {
  fetchPosts: () => void;
  posts: IPost[];
}

const ProfileFeed: React.FC<Props> = ({fetchPosts, posts}) => {
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.length > 0 ? (
        <div className="flex flex-col items-end justify-center gap-5">
          {posts.map((post) => (
            <OwnPost key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default ProfileFeed;
