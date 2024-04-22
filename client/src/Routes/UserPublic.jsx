import React from "react";
import { Navigate } from "react-router-dom";

function UserPublic(props) {
  // Check if the user is authenticated (token exists in localStorage)
  if (localStorage.getItem("token")) {
    // If authenticated, redirect to the home page
    return <Navigate to={"/"} />;
  } else {
    // If not authenticated, render the children components (allow access to the protected routes)
    return props.children;
  }
}

export default UserPublic;
