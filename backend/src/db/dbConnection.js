import mongoose from "mongoose";

const connectDB = async function () {
    try {
        const connection = await mongoose.connect(
            `${process.env.MONGO_DB_URI}/${process.env.DB_NAMAE}`
        );
        console.log("database connected successfully");
    } catch (error) {
        console.log("Error occured while connecting to database :: ", error);
        process.exit(1);
    }
};

export default connectDB;
