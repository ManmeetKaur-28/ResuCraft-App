import React, { useState } from "react";
import { Button, Input } from "../index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice.js";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const loginUser = async (data, e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        data,
        {
          withCredentials: true,
        }
      );
      dispatch(login());
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#111e38] m-15 py-10 px-8 md:w-1/2 w-2/3 mx-auto rounded-xl shadow-lg">
      <div className="text-center text-white">
        <p className="font-sans text-lg">LOGO</p>
        <h1 className="font-['Unna'] text-4xl pt-4 pb-2 text-blue-100 text-center">
          Welcome Back !
        </h1>
        <p className="text-white font-sans text-lg text-center">
          Let’s optimize your resume for the perfect job match.
        </p>

        {error && (
          <p className="mt-1 text-red-500 text-center font-sans text-base">
            {error}
          </p>
        )}
      </div>

      <div className="mt-10">
        <form onSubmit={handleSubmit(loginUser)}>
          <div>
            <Input
              label="Email :"
              labelColor="text-blue-300"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            <Input
              label="Password :"
              type="password"
              labelColor="text-blue-300"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>
          <div className="flex justify-center mt-6 text-lg">
            <Button children="Login" type="submit" />
          </div>
        </form>
      </div>

      <div>
        <p className="text-center text-white mt-6 font-sans text-base">
          New to{" "}
          <span className="font-['Unna'] text-xl text-blue-100">ResuCraft</span>
          ?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="cursor-pointer text-[#a6e1fa] font-sans hover:underline text-base"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
