import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Track users who liked
  dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Track users who disliked
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
