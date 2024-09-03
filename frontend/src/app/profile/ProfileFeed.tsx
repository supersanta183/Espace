"use client";
import { IPost } from "@/interfaces/IPost";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import OwnPost from "./OwnPost";

const ProfileFeed = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get("http://localhost:5064/my_posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
