import React, { JSX } from "react";
import { Route } from "react-router-dom";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Layout from "./Components/Layout";
import SignUp from "Pages/SignUp";
import Login from "Pages/Login";
import Logout from "Pages/Logout"; // Import Logout page

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = localStorage.getItem("loggedin") === "true";
  return isLoggedIn ? children : <Navigate to="/signup" replace />;
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} /> {/* Logout Route */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
