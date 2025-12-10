import { Router } from "express";
import {
    getResumes,
    getUserInfo,
    loginUser,
    logoutUser,
    registerUser,
    uploadResume,
    checkAuth,
    deleteResume,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/").get(verifyJWT, getUserInfo);
router.route("/register").post(registerUser);
router.route("/login").patch(loginUser);
router.route("/logout").patch(verifyJWT, logoutUser);
router
    .route("/resumes")
    .get(verifyJWT, getResumes)
    .post(verifyJWT, upload.single("resumeFile"), uploadResume);
router.route("/verify").get(verifyJWT, checkAuth);

router.route("/delete-resume/:id").patch(verifyJWT, deleteResume);
export default router;
