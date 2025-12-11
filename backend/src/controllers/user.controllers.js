import { ApiError } from "../utility/apiError.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { User } from "../models/user.model.js";
import { Resume } from "../models/resume.model.js";
import { uploadOnCloudinary } from "../utility/uploadCloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
    if (!userId) {
        throw new ApiError(
            400,
            "user id is required for generating access and refresh tokens"
        );
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(
            404,
            "no user with the given user id exists to generate it access and refresh token"
        );
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    if (!accessToken || !refreshToken) {
        throw new ApiError(
            400,
            "an error occured while generating access and refresh tokent for the user"
        );
    }

    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res, next) => {
    const { fullname, email, password } = req.body;
    if ([fullname, email, password].some((item) => item?.trim === "")) {
        throw new ApiError(
            400,
            "all the fields are required for registering the user"
        );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "user with the given email id already exists");
    }

    const newUser = await User.create({
        fullname,
        email,
        password,
    });

    if (!newUser) {
        throw new ApiError(
            400,
            "an error occurred while registering user in the database"
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, newUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (email?.trim() === "" || password?.trim() === "") {
        throw new ApiError(
            400,
            "email and password fields are required for logging in to your account"
        );
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "no user with the given email id exists");
    }

    const passwordCorrect = await user.isPasswordCorrect(password);
    if (!passwordCorrect) {
        throw new ApiError(
            400,
            "invalid password entered while logging in to your account"
        );
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                loggedInUser,
                "user successfully logged in to account"
            )
        );
});

const logoutUser = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(
            401,
            "unauthorized request to logout a user :: user already logged out"
        );
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );
    const options = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged out successfully"));
});

const getUserInfo = asyncHandler(async (req, res, next) => {
    const fullname = req.user?.fullname;
    if (!fullname) {
        throw new ApiError(
            401,
            "unauthorized request for getting user info :: user must be logged in to get info"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { fullname }, "user info fetched successfully")
        );
});

const getResumes = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(
            401,
            "unauthorized request made to access the resumes"
        );
    }

    const resumes = await Resume.find({ owner: userId }).select("name preview");
    if (!resumes || resumes.length == 0) {
        return res
            .status(200)
            .json(
                new ApiResponse(200, [], "user has not uploaded any resume yet")
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                resumes,
                "all the resumes of the user fetched successfully"
            )
        );
});

const uploadResume = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "unauthorized access to upload resume");
    }

    const { name = "Resume" } = req.body;

    console.log("REQ FILE:", req.file);
    console.log("BUFFER SIZE:", req.file?.buffer?.length);

    const buffer = req.file?.buffer;
    if (!buffer) {
        throw new ApiError(
            400,
            "error occurred while uplaoding file using multer to storage"
        );
    }

    const cloudResponse = await uploadOnCloudinary(buffer);

    if (!cloudResponse) {
        throw new ApiError(
            400,
            "error occurred while uploading file on cloudinary"
        );
    }

    const addedResume = await Resume.create({
        owner: userId,
        file: cloudResponse.file,
        name,
        preview: cloudResponse.preview,
    });

    if (!addedResume) {
        throw new ApiError(
            400,
            "an error occurred while adding the resume to the database"
        );
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                addedResume,
                "resume successfully added to the database"
            )
        );
});

const checkAuth = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "user not logged in :: unauthorized request");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "user authorization successfull"));
});

const deleteResume = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(
            401,
            "unauthorized request :: user must loggin to delete a resume"
        );
    }

    const { id } = req.params;
    if (!id) {
        throw new ApiError(
            400,
            "resume id  must be provided to delete a resume"
        );
    }

    const resume = await Resume.findById(id);
    if (!resume) {
        throw new ApiError(
            404,
            "no resume with the given id found to delete it"
        );
    }

    await Resume.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, "", "resume deleted successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getResumes,
    getUserInfo,
    uploadResume,
    checkAuth,
    deleteResume,
};
