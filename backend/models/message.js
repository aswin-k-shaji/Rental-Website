import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: false },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  messageType: { 
    type: String, 
    enum: ["general", "complaint", "inquiry", "feedback"], 
    default: "general",
    required: true 
  },
  sendDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["sent", "seen", "replied"], default: "sent" },
  adminReply: { type: String, default: "" },
  repliedAt: { type: Date },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
