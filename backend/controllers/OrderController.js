import orderModel from "../models/order.js";
import userModel from "../models/user.js";
import itemModel from "../models/items.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, itemId, startDate, returnDate, totalAmount, paymentMethod, deliveryInfo } = req.body;

    // Validate the user ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate the item ID
    const item = await itemModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Validate dates
    if (!startDate || !returnDate) {
      return res.status(400).json({ error: "Start date and return date are required" });
    }

    const start = new Date(startDate);
    const end = new Date(returnDate);
    if (end <= start) {
      return res.status(400).json({ error: "Return date must be after the start date" });
    }

    // Validate totalAmount
    const calculatedAmount = Math.ceil((end - start) / (1000 * 60 * 60 * 24) + 1) * item.pricePerDay;
    if (calculatedAmount !== totalAmount) {
      return res.status(400).json({ error: "Total amount calculation mismatch" });
    }

    // Create the order
    const newOrder = new orderModel({
      userId,
      itemId,
      startDate,
      returnDate,
      totalAmount,
      paymentMethod,
      deliveryInfo,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "An error occurred while placing the order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate the user ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the user's orders and populate related item data
    const orders = await orderModel
      .find({ userId })
      .populate("itemId", "title pricePerDay image")
      .populate("userId", "name email");

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "An error occurred while fetching user orders" });
  }
};
