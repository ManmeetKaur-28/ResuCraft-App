import multer from "multer";
import path from "path";
// const uploadPath = path.join(process.cwd(), "public", "temp");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        return cb(null, `${req.user?._id}_${file.originalname}`);
    },
});

export const upload = multer({ storage: storage });
