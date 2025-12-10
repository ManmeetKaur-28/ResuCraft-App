import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
        },
        jobDesc: {
            type: String,
            required: true,
        },
        ATS: {
            type: Number,
            required: true,
        },
        matchKeywords: [
            {
                type: String,
            },
        ],
        missingKeywords: [
            {
                type: String,
            },
        ],
        suggestions: [
            {
                type: String,
            },
        ],
        updatedResume: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const resumeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: "Resume",
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        file: {
            type: String,
            required: true,
        },
        preview: {
            type: String,
        },
        analytics: [analysisSchema],
    },
    { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);
