import React from "react";

function ResumeCard({ name, file, preview }) {
  return (
    <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-4 hover:shadow-lg transition duration-200">
      {/* Header with name and action buttons */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-['Unna'] text-xl font-semibold text-blue-900 truncate">
          {name}
        </span>
        <div className="flex space-x-2 cursor-pointer">
          <a href={file} className="inline-block ">
            <button
              className="p-2 rounded-md bg-blue-200 cursor-pointer text-white hover:bg-blue-300 transition duration-200 font-sans"
              title="View"
            >
              🔍
            </button>
          </a>
        </div>
      </div>

      {/* Resume preview */}
      <a href={file} title="View Resume">
        <div className="w-full h-44 cursor-pointer overflow-hidden rounded-lg border border-blue-300 bg-white hover:scale-[1.02] transition-transform duration-200">
          <img
            className="w-full object-cover"
            src={preview}
            alt={`${name} : Preview Image`}
          />
        </div>
      </a>
    </div>
  );
}

export default ResumeCard;
