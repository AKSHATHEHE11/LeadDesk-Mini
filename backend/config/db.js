const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri =
            process.env.NODE_ENV === "test"
                ? process.env.TEST_MONGO_URI
                : process.env.MONGO_URI;

        await mongoose.connect(uri);

        console.log(`MongoDB connected (${process.env.NODE_ENV || "development"})`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;