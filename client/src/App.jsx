import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import './App.css';

import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

export default function App() {
  return (
    <div>
      {/* Use BrowserRouter as Router to enable routing */}
      <Router>
        <Routes>
          {/* Define routes for different paths */}
          <Route path="/" element={<UserRoutes />} />
          {/* You can define additional routes here */}
        </Routes>
      </Router>
    </div>
  );
}
