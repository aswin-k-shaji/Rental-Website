import express from "express";
import { 
  addMessage, 
  getAllMessages, 
  getUserMessages, 
  deleteMessage, 
  changeMessageStatus, 
  replyToMessage 
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post("/send", addMessage); // User sends a message
messageRouter.get("/all", getAllMessages); // Admin fetches all messages
messageRouter.post("/user",getUserMessages); // Fetch messages sent by a specific user
messageRouter.delete("/delete", deleteMessage); // Delete a message
messageRouter.patch("/status", changeMessageStatus); // Update message status (sent, seen, replied)
messageRouter.post("/reply", replyToMessage); // Admin replies to a message

export default messageRouter;
