import { Resume } from "../models/resume.model.js";
import { ApiError } from "../utility/apiError.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { analyseResume } from "../services/analyseResume.js";
import { PDFParse } from "pdf-parse";

import { uploadBufferOnCloudinary } from "../utility/uploadCloudinary.js";
import { htmlToPdf } from "../services/htmlToPdf.js";
import mongoose from "mongoose";

const getResumeInfo = asyncHandler(async (req, res, next) => {
    //name , file , preview , analytics ->give back them
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(
            401,
            "unauthorized request to access resume information"
        );
    }
    const { id } = req.params;
    if (!id) {
        throw new ApiError(
            400,
            "resume id is required for accessing its information"
        );
    }

    const resume = await Resume.findById(id);
    if (!resume) {
        throw new ApiError(404, "no resume with the given resume id exists");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                resume,
                "all the information of the resume fetched successfully"
            )
        );
});

const addAnalysisInfo = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "unauthorized request to analyse a resume");
    }
    const { id } = req.params;
    if (!id) {
        throw new ApiError(
            400,
            "resume id is required to perform its analysis"
        );
    }

    const resume = await Resume.findById(id);
    if (!resume) {
        throw new ApiError(
            404,
            "no resume with the given id found , to perform analysis"
        );
    }

    const userIdObject = new mongoose.Types.ObjectId(userId);

    if (!resume.owner.equals(userIdObject)) {
        throw new ApiError(
            401,
            "unauthorized request :: only owner of resume can perform analysis on it"
        );
    }

    const { role, jobDesc } = req.body;
    if (!role || role.trim() === "" || !jobDesc || jobDesc.trim() === "") {
        throw new ApiError(
            400,
            "job role and description are required to optimize your resume according to it"
        );
    }

    const resumefile = resume.file;

    const parser = new PDFParse({ url: resumefile });
    console.log("Parser: ", parser); // parser console.log ================

    const result = await parser.getText();
    console.log("result : ", result); //result console log ======================

    const resumeText = result.text;
    console.log("resumetext :", resumeText); // resume text console.log ========

    await parser.destroy();

    const analysis = await analyseResume(role, jobDesc, resumeText);
    if (!analysis.resume_skills) {
        throw new ApiError(
            400,
            "an error occured while analysing the resume :: API error"
        );
    }

    const {
        matched_skills,
        missing_skills,
        ats_score,
        suggestions,
        updated_resume,
    } = analysis;

    const pdfBuffer = await htmlToPdf(updated_resume);

    const updatedResumeUrl = await uploadBufferOnCloudinary(pdfBuffer);

    const newAnalysis = {
        role,
        jobDesc,
        ATS: ats_score,
        matchKeywords: matched_skills,
        missingKeywords: missing_skills,
        suggestions,
        updatedResume: updatedResumeUrl,
    };
    const newResumeWithAnalysis = await Resume.findByIdAndUpdate(
        id,
        {
            $push: {
                analytics: newAnalysis,
            },
        },
        {
            new: true,
        }
    );

    if (!newResumeWithAnalysis) {
        throw new ApiError(
            400,
            "error occurred while adding the new analysis to the database"
        );
    }

    const addedAnalysis =
        newResumeWithAnalysis.analytics[
            newResumeWithAnalysis.analytics.length - 1
        ];
    const addedAnalysisId = addedAnalysis._id;
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    resumeInfo: newResumeWithAnalysis,
                    newAnalysisId: addedAnalysisId,
                },
                "new analysis of user's resume done successfully"
            )
        );
});

export { getResumeInfo, addAnalysisInfo };
