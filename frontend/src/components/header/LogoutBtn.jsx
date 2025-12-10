import React from "react";
import { Button } from "../index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice.js";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-fit">
      <Button onClick={logoutUser} children="Logout" />
    </div>
  );
}

export default LogoutBtn;
