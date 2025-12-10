import React from "react";

function AnalysisCard({ analytics, currState }) {
  const temp = analytics.filter((item) => item._id == currState);
  const matchedAnalysis = temp[0];

  return (
    <div className="border border-blue-300 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-blue-200 pb-3">
        <h3 className="font-['Unna'] text-3xl font-semibold text-blue-900">
          Role: {matchedAnalysis.role}
        </h3>
        <span className="text-base text-gray-600 font-sans">
          On: {new Date(matchedAnalysis.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Job Description */}
      <div>
        <h4 className="font-['Unna'] text-xl font-medium text-blue-800 mb-2">
          Job Description
        </h4>
        <p className="text-gray-700 bg-white rounded-lg p-3 shadow-sm text-base font-sans">
          {matchedAnalysis.jobDesc}
        </p>
      </div>

      {/* ATS Score */}
      <div className="flex items-center gap-2">
        <span className="font-['Unna']  text-blue-800 text-xl font-medium">
          ATS Score :
        </span>
        <span className="text-blue-700 font-bold text-lg font-sans">
          {matchedAnalysis.ATS} / 100
        </span>
      </div>

      {/* Matched Keywords */}
      <div>
        <h4 className="font-['Unna'] text-xl font-medium text-blue-800 mb-2">
          Matched Keywords
        </h4>
        <div className="flex flex-wrap gap-2">
          {matchedAnalysis.matchKeywords.length > 0 &&
            matchedAnalysis.matchKeywords.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-base shadow-sm font-sans"
              >
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* Missing Keywords */}
      <div>
        <h4 className="font-['Unna'] text-xl font-medium text-blue-800 mb-2">
          Missing Keywords
        </h4>
        <div className="flex flex-wrap gap-2">
          {matchedAnalysis.missingKeywords.length > 0 &&
            matchedAnalysis.missingKeywords.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-base shadow-sm font-sans"
              >
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <h4 className="font-['Unna'] text-xl font-medium text-blue-800 mb-2">
          Suggestions
        </h4>
        <ul className="list-disc list-inside space-y-1 text-gray-700 text-base font-sans">
          {matchedAnalysis.suggestions.length > 0 &&
            matchedAnalysis.suggestions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
        </ul>
      </div>

      {/* Download Button */}
      <div className="pt-4">
        <a
          href={matchedAnalysis.updatedResume}
          download={`${matchedAnalysis.role}_updated_resume.pdf`}
        >
          <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-sans font-semibold py-2 rounded-lg transition duration-200 shadow-md text-base">
            View Updated Resume 🔍
          </button>
        </a>
      </div>
    </div>
  );
}

export default AnalysisCard;
