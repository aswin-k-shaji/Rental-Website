import express from "express";
import { placeOrder, getUserOrders } from "../controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.get("/user/:userId", getUserOrders);

export default orderRouter;
