import Message from "../models/message.js";

// Add a new message
export const addMessage = async (req, res) => {
  try {
    const { userId, name, email, subject, message, messageType } = req.body;

    if (!name || !email || !subject || !message || !messageType) {
      return res.status(400).json({ message: "All fields except userId are required." });
    }

    const newMessage = new Message({
      userId,
      name,
      email,
      subject,
      message,
      messageType,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all messages (for admin)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ sendDate: -1 }); // Get all messages sorted by date
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Retrieve messages sent by a specific user (if userId is provided)
export const getUserMessages = async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId from request body
    
    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch messages that have the specified userId
    const userMessages = await Message.find({ userId }).sort({ sendDate: -1 });

    if (userMessages.length === 0) {
      return res.status(404).json({ message: "No messages found for this user." });
    }

    // Respond with the user's messages
    res.json(userMessages);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.body; // Extract messageId from request body

    if (!messageId) {
      return res.status(400).json({ message: "Message ID is required" });
    }

    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Change message status (sent → seen → replied)
export const changeMessageStatus = async (req, res) => {
  try {
    const { messageId, status } = req.body;
    const validStatuses = ["sent", "seen", "replied"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    message.status = status;
    await message.save();
    res.json({ message: "Message status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin reply to a message
export const replyToMessage = async (req, res) => {
  try {
    const { messageId, adminReply } = req.body;

    if (!adminReply) return res.status(400).json({ message: "Reply cannot be empty" });

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    message.adminReply = adminReply;
    message.status = "replied";
    message.repliedAt = new Date();

    await message.save();
    res.json({ message: "Reply sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
