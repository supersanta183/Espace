"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ILoginCredentials from "@/interfaces/ILoginCredentials";
import { useLoggedInContext } from "@/Contexts/LoggedInProvider";
import Logout from "@/components/Logout";
import { refresh_localstorage } from "@/helperFunctions/helpers";

const page = () => {
  const Router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loggedIn, setLoggedIn } = useLoggedInContext();

  const submitLogin = async () => {
    if (email === "" || password === "") {
      alert("Please fill out all fields");
      return;
    }

    const credentials: ILoginCredentials = {
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch("http://localhost:5064/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if(response.ok){
        const result = await response.json();
        refresh_localstorage(result);
  
        setLoggedIn(true);
  
        Router.push("/profile");
        console.log("user logged in successfully", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loggedIn) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body items-center">
            <h2 className="card-title text-center">You are already logged in</h2>
            <Logout />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body items-center">
          <h2 className="card-title text-center">Login</h2>

          <div className="join join-vertical">
            <label className="input input-bordered flex items-center gap-2 join-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 join-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => submitLogin()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
