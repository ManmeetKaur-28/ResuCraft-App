import React, { useState } from "react";
import { Button, Input } from "../index";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";

function DescForm({ addToAnalytics, changeState }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { id } = useParams();
  const [buttonName, setButtonName] = useState("Analyse");

  const addAnalysis = async (data, e) => {
    e.preventDefault();
    setError("");
    setButtonName("Analysing");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/resume/${id}`,
        data,
        {
          withCredentials: true,
        }
      );

      addToAnalytics(response.data.data.resumeInfo);
      changeState(response.data.data.newAnalysisId);
    } catch (error) {
      setError(error.response.data.message);
    }
    setButtonName("Analyse");
  };

  return (
    <div className="bg-linear-to-br border border-blue-300 from-blue-50 to-blue-100 rounded-xl  shadow-md p-6">
      {/* Heading */}
      <div className="mb-3 text-center">
        <h3 className="font-['Unna'] text-2xl font-semibold text-blue-900">
          Enter Job Details
        </h3>
      </div>

      {/* Error */}
      {error && (
        <p className="my-2 text-red-600 text-center font-sans text-base font-medium">
          {error}
        </p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit(addAnalysis)}
        className="space-y-5 font-sans"
      >
        <div>
          <label
            htmlFor="role"
            className=" font-medium text-blue-900 text-base"
          >
            Role :
          </label>
          <Input
            placeholder="e.g. Software Engineer"
            id="role"
            textColor="text-black/80"
            {...register("role", { required: true })}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="jobDesc"
            className="mb-3 font-medium text-blue-900 text-base"
          >
            Job Description :
          </label>
          <textarea
            id="jobDesc"
            {...register("jobDesc", { required: true })}
            rows={10}
            placeholder="Paste or type the job description here ....."
            className="text-black/80 text-sm rounded-lg border p-3 focus:outline-none focus:ring-blue-500 border-blue-500/60 focus:border-blue-500 focus:ring-1 resize-none shadow-sm"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center">
          {buttonName === "Analyse" ? (
            <Button
              children={buttonName}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans font-semibold py-2 rounded-lg transition duration-200 shadow-md text-base"
            />
          ) : (
            <Button
              children={buttonName}
              disabled={true}
              cursorStyle="cursor-not-allowed"
              className="w-full bg-blue-600 text-white font-sans font-semibold py-2 rounded-lg transition duration-200 shadow-md opacity-70 text-base"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default DescForm;
