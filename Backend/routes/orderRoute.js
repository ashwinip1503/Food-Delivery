import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeorder, verifyOrder } from "../controllers/OrderController.js";

const orderRouter = express.Router();
orderRouter.post("/place", authMiddleware, placeorder);
orderRouter.post("/verify", verifyOrder);

export default orderRouter;
