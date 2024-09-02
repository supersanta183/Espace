"use client";
import Link from "next/link";
import React from "react";

import { useLoggedInContext } from "@/Contexts/LoggedInProvider";
import Logout from "./Logout";

const Navbar = () => {
  const { loggedIn, setLoggedIn } = useLoggedInContext();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Espace
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/register" className="btn btn-ghost">
              Register
            </Link>
          </li>
          <li>
            <Link href="/profile" className="btn btn-ghost">
              Profile
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
          { !loggedIn &&
            <Link href="/login" className="btn btn-ghost">
              Login
            </Link>
          }
          { loggedIn &&
            <Logout />
          }
      </div>
    </div>
  );
};

export default Navbar;
