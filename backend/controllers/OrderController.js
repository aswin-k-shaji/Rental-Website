import orderModel from "../models/order.js";
import userModel from "../models/user.js";
import itemModel from "../models/items.js";
import mongoose from "mongoose";


export const placeOrder = async (req, res) => {
  try {
    const { userId, itemId, startDate, returnDate, totalAmount, paymentMethod, deliveryInfo } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const item = await itemModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const ownerId = item.owner; 
    if (!ownerId) {
      return res.status(404).json({ error: "Owner not found for this item" });
    }

    if (!startDate || !returnDate) {
      return res.status(400).json({ error: "Start date and return date are required" });
    }

    const start = new Date(startDate);
    const end = new Date(returnDate);
    if (end <= start) {
      return res.status(400).json({ error: "Return date must be after the start date" });
    }
    const calculatedAmount = Math.ceil((end - start) / (1000 * 60 * 60 * 24) + 1) * item.pricePerDay;
    if (calculatedAmount !== totalAmount) {
      return res.status(400).json({ error: "Total amount calculation mismatch" });
    }

    const newOrder = new orderModel({
      userId,
      itemId,
      ownerId,
      startDate,
      returnDate,
      totalAmount,
      paymentMethod,
      deliveryInfo,
    });

    await newOrder.save();

    user.orderIds.push(newOrder._id);
    await user.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "An error occurred while placing the order" });
  }
};




export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    console.log("🔍 Received userId:", userId);

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Find the user by ID and populate order details
    const user = await userModel.findById(userId).populate("orderIds");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract order details
    const userOrders = user.orderIds;

    if (!userOrders || userOrders.length === 0) {
      return res.status(200).json({ message: "No orders found", orders: [] });
    }

    console.log("📦 Retrieved Orders:", userOrders);

    res.status(200).json({ orders: userOrders });
  } catch (error) {
    console.error("❌ Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const getOwnerOrders = async (req, res) => {
  try {
    const { ownerId } = req.query; // Get ownerId from query params

    if (!ownerId) {
      return res.status(400).json({ message: "Owner ID is required." });
    }

    const orders = await orderModel.find({ ownerId }).populate("userId itemId");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching owner orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};



export const getAllOrders = async (req, res) => {
  try {

    console.log("inside");
    
    const orders = await orderModel.find({})
      .populate('userId', 'name email') // Populate user details
      .populate('itemId', 'title pricePerDay image') // Populate item details
      .populate('ownerId', 'name email'); // Populate owner details if needed

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders. Please try again later.",
    });
  }
};


