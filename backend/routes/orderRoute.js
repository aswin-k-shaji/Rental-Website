import express from "express";
import { placeOrder, getUserOrders, getOwnerOrders } from "../controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.post("/orders", getUserOrders);
orderRouter.get("/owner-orders", getOwnerOrders);


export default orderRouter;
