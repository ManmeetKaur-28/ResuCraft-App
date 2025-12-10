import React, { useState } from "react";
import { Button, Input } from "../index";

function Upload({ uploadResume }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("My Resume");
  const [buttonName, setButtonName] = useState("Upload");

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      setFile(null);
      alert("Please upload a valid PDF file");
    }
  };

  const callUploadResume = async () => {
    setButtonName("Uploading");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("resumeFile", file);
      await uploadResume(formData);
      setName("My Resume");
      setFile(null);
    } catch (error) {
      console.log(error);
    }
    setButtonName("Upload");
  };

  return (
    <div className="bg-linear-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 my-6 shadow-lg hover:border-blue-500 transition duration-200">
      {/* Heading */}
      <h3 className="font-['Unna'] text-2xl font-bold text-blue-900 mb-6 text-center tracking-tight">
        Upload your resume
      </h3>

      <form onSubmit={callUploadResume} className="space-y-5">
        {/* File Input */}
        <Input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          textColor="text-blue-700"
          className="w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Selected File */}
        {file && (
          <div className="space-y-4">
            <p className="text-base text-blue-800 font-sans font-medium text-center">
              Selected: <span className="font-semibold">{file.name}</span>
            </p>

            <div className="flex flex-col items-start">
              <label
                htmlFor="resume-upload"
                className="text-blue-900 font-sans font-medium mb-1 text-base"
              >
                Resume Title:
              </label>
              <input
                className="w-full text-base px-3 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                type="text"
                id="resume-upload"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Upload Button */}
        {file && (
          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              disabled={buttonName !== "Upload"}
              cursorStyle={
                buttonName === "Upload"
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }
              className={`w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-sans font-semibold py-2 rounded-lg transition duration-300 shadow-md ${
                buttonName !== "Upload" ? "opacity-70" : ""
              }`}
            >
              {buttonName}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Upload;
