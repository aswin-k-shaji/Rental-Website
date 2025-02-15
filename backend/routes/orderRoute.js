import express from "express";
import { placeOrder, getUserOrders, getOwnerOrders, getAllOrders } from "../controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.post("/orders", getUserOrders);
orderRouter.get("/owner-orders", getOwnerOrders);
orderRouter.get("/all-orders", getAllOrders);




export default orderRouter;
