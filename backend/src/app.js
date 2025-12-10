import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes handling

//import statements
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";

//assigning routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/resume", resumeRouter);

export default app;
