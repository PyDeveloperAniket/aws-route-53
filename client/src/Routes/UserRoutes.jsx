import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import UserAuthorize from "./UserAuthorize";
import UserPublic from "./UserPublic";
import Dashboard from "../Components/Dashboard";

export default function UserRoutes() {
  return (
    <div>
      {/* Define routes using the Routes component from react-router-dom */}
      <Routes>
        {/* Define a route for the home page */}
        <Route
          path="/"
          // Render the Home component when the path matches
          element={<Home />}
        />
        {/* Define a route for the signup page */}
        <Route
          path="/signup"
          // Render the SignUp component when the path matches
          element={<SignUp />}
        />
        {/* Define a route for the dashboard page */}
        <Route
          path="/records"
          // Render the Dashboard component when the path matches
          element={<Dashboard />}
        />
      </Routes>
    </div>
  );
}
