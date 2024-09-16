"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import IStandardUser from "@/interfaces/IStandardUser";
import { useLoggedInContext } from "@/Contexts/LoggedInProvider";
import { check_expired_access_token, update_access_token } from "@/helperFunctions/helpers";
import PostInput from "./PostInput";
import ProfileFeed from "./ProfileFeed";
import { IPost } from "@/interfaces/IPost";

const page = () => {
  const [user, setUser] = useState<IStandardUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([])
  const { loggedIn, setLoggedIn } = useLoggedInContext();

  useEffect(() => {
    check_expired_access_token(setLoggedIn);
    getUser();
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log("user change ", user);
  }, [user]);

  const getUser = async () => {
    try {
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      const response = await axios.get("http://localhost:5064/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("response ", response.status)
      const result = response.data;
      console.log(result);
      setUser(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get("http://localhost:5064/my_posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const myPosts: IPost[] = res.data;
      setPosts(myPosts.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  if (!loggedIn || !user) {
    return (
      <div className=" flex items-center justify-center h-full w-full">
        You must be logged in to view this page
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-24 rounded-full">
            <span className="text-3xl">{user?.firstName[0]}</span>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center ml-5 w-full">
          <div className="text-3xl">{user.firstName + " " + user.lastName}</div>
          <div className="">0 friends</div>
        </div>
        <div className="flex items-center justify-end w-full">
          <button className="btn btn-ghost bg-primary text-primary-content">
            Edit profile
          </button>
        </div>
      </div>
      <div className="">
        <PostInput fetchPosts={fetchPosts} />
      </div>
      <div className="flex">
        <div className="w-1/4"></div>
        <div className="w-full">
          <ProfileFeed posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default page;
