"use client";
import React from "react";
import { useState, useEffect } from "react";

import IStandardUser from "@/interfaces/IStandardUser";
import { useLoggedInContext } from "@/Contexts/LoggedInProvider";
import { check_expired_access_token } from "@/helperFunctions/helpers";

const page = () => {
  const [user, setUser] = useState<IStandardUser | null>(null);
  const { loggedIn, setLoggedIn } = useLoggedInContext();

  useEffect(() => {
    console.log(loggedIn);
    check_expired_access_token(setLoggedIn);
    getUser();
  }, []);

  const getUser = async () => {
    try {
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      const response = await fetch("http://localhost:5064/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      const result = await response.json();
      setUser(result);
    } catch (error) {
      console.error("Error:", error);
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
    <div className="flex flex-col">
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
            <button className="btn btn-ghost bg-primary text-primary-content">Edit profile</button>
          </div>
      </div>
      <div className=""> hej</div>
    </div>
  );
};

export default page;
