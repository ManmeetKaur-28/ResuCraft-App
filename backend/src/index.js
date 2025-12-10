import "dotenv/config";

import app from "./app.js";

import connectDB from "./db/dbConnection.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log("server is successfully listening on port");
        });
    })
    .catch(() => {
        console.log("mongoDb connection failed in index file");
    });
