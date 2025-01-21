import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit process if the connection fails
  }
};
