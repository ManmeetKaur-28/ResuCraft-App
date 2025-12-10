import React, { useEffect, useState } from "react";
import { AnalysisCard, AnalysisList, DescForm, ResumeCard } from "../index";
import axios from "axios";
import { useParams } from "react-router-dom";

function Resume() {
  const { id } = useParams();

  const [analysisState, setAnalysisState] = useState("");
  const [resumeInfo, setResumeInfo] = useState({});
  const changeState = (state) => {
    setAnalysisState(state);
  };

  useEffect(() => {
    const getResumeInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/resume/${id}`,
          {
            withCredentials: true,
          }
        );
        setResumeInfo(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getResumeInfo();
  }, []);

  const addToAnalytics = (newAnalysis) => {
    setResumeInfo(newAnalysis);
  };

  return (
    <div className="w-11/12 max-w-7xl bg-blue-900/50  min-h-svh mx-auto my-10 px-8 py-8 rounded-2xl shadow-xl text-white">
      {/* Header */}
      <div className="bg-[#050722] rounded-xl p-6 text-center mb-10 shadow-md">
        <h1 className="font-['Unna'] text-5xl font-bold tracking-tight text-white">
          Resume Analysis
        </h1>
        <p className="text-lg mt-2 text-blue-200 font-sans">
          Comprehensive breakdown of your resume content.
        </p>
        <button
          onClick={() => setAnalysisState("")}
          className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer transition duration-200 text-base font-sans font-medium"
        >
          New Analysis ➕
        </button>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-1/3 space-y-6">
          <ResumeCard
            name={resumeInfo.name}
            file={resumeInfo.file}
            preview={resumeInfo.preview}
          />
          <AnalysisList
            changeState={changeState}
            _id={resumeInfo._id}
            analytics={resumeInfo.analytics}
          />
        </div>

        {/* Analysis Panel */}
        <div className="w-2/3 bg-white/90 rounded-xl p-6  shadow-md overflow-y-auto max-h-[90vh] font-sans text-base text-blue-900">
          {analysisState ? (
            <AnalysisCard
              analytics={resumeInfo.analytics}
              currState={analysisState}
            />
          ) : (
            <DescForm
              addToAnalytics={addToAnalytics}
              changeState={changeState}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Resume;
