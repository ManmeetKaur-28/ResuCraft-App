import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "resumes",
            format: "pdf",
        });

        const publicId = result.public_id;

        const fileUrl = result.secure_url;

        const preview = cloudinary.url(publicId, {
            resource_type: "image",
            page: 1,
            format: "png",
        });

        fs.unlinkSync(localFilePath);

        return { file: fileUrl, preview };
    } catch (error) {
        console.log(
            "error occurred while uploading file on cloudinary :: ",
            error.message
        );
        fs.unlinkSync(localFilePath);
        return null;
    }
};

const uploadBufferOnCloudinary = async (buffer) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "raw",
                    folder: "updatedResumes",
                    format: "pdf",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            stream.end(buffer);
        });

        return result.secure_url;
    } catch (error) {
        console.log(
            "error occurrd while uploading PDF buffer on cloudinary :: ",
            error.message
        );
    }

    return null;
};

export { uploadOnCloudinary, uploadBufferOnCloudinary };
