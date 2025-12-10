import React, { useState } from "react";
import { Button, Input } from "../index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const signupUser = async (data, e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`,
        data,
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#111e38] m-15 py-10 px-8 md:w-1/2 w-2/3 mx-auto rounded-xl shadow-lg">
      <div className="text-center text-white">
        <p className="font-sans text-lg">LOGO</p>
        <h1 className="font-['Unna'] text-4xl pt-4 pb-2 inline-block text-center text-blue-100">
          Welcome to ResuCraft !
        </h1>
        <p className="text-white font-sans text-lg text-center">
          Ready to craft your resume?
        </p>

        {error && (
          <p className="mt-3 text-red-500 text-center font-sans text-base">
            {error}
          </p>
        )}
      </div>

      <div className="mt-10">
        <form onSubmit={handleSubmit(signupUser)}>
          <div>
            <Input
              label="Name :"
              labelColor="text-blue-300"
              placeholder="Enter your name"
              {...register("fullname", { required: true })}
            />
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
            <Button children="Signup" type="submit" />
          </div>
        </form>
      </div>

      <div>
        <p className="text-center text-white mt-6 font-sans text-base">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer text-[#a6e1fa] font-sans hover:underline text-base"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
