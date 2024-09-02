"use client";
import React from "react";
import { useState, useEffect } from "react";

import IStandardUser from "@/interfaces/IStandardUser";

interface ICredentials {
  UserName: string,
  Email: string,
  Password: string
}

const page = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const submitUser = async () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      alert("Please fill out all fields");
      return;
    }
    const user: IStandardUser = {
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };


    const credentials: ICredentials = {
      UserName: username,
      Email: email,
      Password: password
    }

    try {
      const response = await fetch("http://localhost:5064/add_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      console.log("user added successfully", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body items-center">
          <h2 className="card-title text-center">Register</h2>

          <div className="join join-vertical">
          <label className="input input-bordered flex items-center gap-2 join-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Firstname" onChange={(e) => setFirstName(e.target.value)}/>
            </label>

            <label className="input input-bordered flex items-center gap-2 join-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Lastname" onChange={(e) => setLastName(e.target.value)}/>
            </label>

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
              <input type="text" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            </label>

            <label className="input input-bordered flex items-center gap-2 join-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
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
              <input type="password" className="grow" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            </label>
          </div>

          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => submitUser()}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
