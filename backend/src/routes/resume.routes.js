import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import {
    addAnalysisInfo,
    getResumeInfo,
} from "../controllers/resume.controllers.js";

const router = Router();

router
    .route("/:id")
    .get(verifyJWT, getResumeInfo)
    .patch(verifyJWT, addAnalysisInfo);

export default router;
