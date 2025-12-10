import { useState, useEffect } from "react";
import "./App.css";

import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice.js";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/verify`,
          {
            withCredentials: true,
          }
        );
        dispatch(login());
      } catch (error) {
        console.log(error);
        dispatch(logout());
      }
    };

    checkAuth();
  }, []);
  return (
    <div className=" bg-[#a6e1fa] ">
      <Header />
      <main className=" min-h-svh">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
