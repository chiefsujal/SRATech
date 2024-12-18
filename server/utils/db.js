const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!URI) {
    console.error("MONGODB_URI is not defined in environment variables.");
    process.exit(1); // Exit with failure
  }

  try {
    await mongoose.connect(URI); // No need for deprecated options
    console.log("Connection successful to the database");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
