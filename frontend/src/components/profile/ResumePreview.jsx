import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ResumePreview({ name, preview, _id, deleteResume }) {
  const navigate = useNavigate();

  return (
    <div className="text-blue-900 shadow-md  hover:shadow-lg bg-white rounded-xl transition hover:bg-gray-400/70  duration-300 p-4  text-center w-full">
      {/* Resume Preview Image */}
      <button
        title="View and Analyse"
        onClick={() => navigate(`/resume/${_id}`)}
        className="rounded-xl cursor-pointer"
      >
        <div className="max-w-60 md:min-w-40 md:h-40 lg:max-w-43 xl:min-w-45 2xl:min-w-65 h-45 overflow-hidden rounded-md border border-blue-300 mx-auto ">
          <img
            className="w-full object-cover"
            src={preview}
            alt={`${name} : Preview Image`}
          />
        </div>
      </button>

      {/* Resume Title + Delete */}
      <div className="flex justify-between items-center mt-3">
        <h3 className="font-['Unna'] pl-3  text-xl font-semibold tracking-tight text-blue-900">
          {name}
        </h3>
        <div title="Delete">
          <button
            onClick={() => deleteResume(_id)}
            className="cursor-pointer text-lg hover:text-red-600 transition"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
