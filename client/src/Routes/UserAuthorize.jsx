import React from "react";
import { Navigate } from "react-router-dom";

function UserAuthorize(props) {
  // Check if the user is authenticated (token exists in localStorage)
  if (localStorage.getItem("token")) {
    // If authenticated, render the children components (allow access to the protected routes)
    return props.children;
  } else {
    // If not authenticated, redirect the user to the login page
    return <Navigate to={"/login"} />;
  }
}

export default UserAuthorize;
