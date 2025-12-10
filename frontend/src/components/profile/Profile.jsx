import React, { useEffect, useState } from "react";
import { ResumePreview, Upload } from "../index";
import axios from "axios";

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getInitialUserInfo = async () => {
      try {
        const fetchedUserInfo = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`,
          {
            withCredentials: true,
          }
        );
        const fetchedResumes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/resumes`,
          {
            withCredentials: true,
          }
        );

        setUserInfo(fetchedUserInfo.data.data);
        setResumes(fetchedResumes.data.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    getInitialUserInfo();
  }, []);

  const uploadResume = async (formdata) => {
    setError("");
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/resumes`,
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fetchedResumes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/resumes`,
        {
          withCredentials: true,
        }
      );
      setResumes(fetchedResumes.data.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/user/delete-resume/${resumeId}`,
        {},
        { withCredentials: true }
      );
      const fetchedResumes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/resumes`,
        {
          withCredentials: true,
        }
      );
      setResumes(fetchedResumes.data.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-900/50 rounded-xl py-6 px-6 w-2/3 sm:w-3/4 md:w-6xl my-10 mx-auto">
      {/* Header + Upload */}
      <div className="max-w-6xl mx-auto bg-blue-50 rounded-xl p-6 flex flex-col lg:flex-row md:justify-between md:items-center gap-6 shadow-md">
        <div className="flex flex-col justify-center">
          <p className="font-['Unna'] text-4xl md:text-5xl text-[#00072d] font-bold">
            Hey {userInfo.fullname}!
          </p>
          <span className="text-blue-950 mt-2 text-base md:text-lg font-sans">
            Ready to beat the ATS and shine with a resume that works for you
          </span>
        </div>
        <div className="w-full md:w-2/3 lg:w-2/3 xl:w-1/3">
          <Upload uploadResume={uploadResume} />
        </div>
      </div>

      {/* Resume Library */}
      <div className="max-w-6xl mx-auto mt-8 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-md">
        <div className="bg-[#050722] text-white rounded-xl p-4">
          <h1 className="font-['Unna'] text-2xl font-semibold">
            Resume Library
          </h1>
          <p className="text-base mt-1 font-sans">
            A quick view of everything you’ve crafted and saved with ResuCraft
          </p>
        </div>

        <div className="bg-blue-300/70 mt-4 rounded-xl min-h-60 p-5">
          {error && (
            <p className="text-red-600 rounded-lg bg-white/80 p-2 w-1/2 mx-auto mb-4 text-center font-sans text-base">
              {error}
            </p>
          )}
          {resumes.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((item) => (
                <li key={item.id}>
                  <ResumePreview {...item} deleteResume={deleteResume} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center pt-8 text-[#050722] text-lg font-sans font-medium">
              Begin your journey! <br /> Upload your first resume and craft it
              into something recruiters can’t ignore.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
