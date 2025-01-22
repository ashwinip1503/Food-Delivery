import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/CartRoute.js";

// Load environment variables from .env file
dotenv.config();

// App configuration
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter); // Corrected this line
app.use("/api/cart", cartRouter); 

// Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
