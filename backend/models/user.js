import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, default: "user" },
  cartData: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  phoneNumber: { type: String },
  address: { type: String },
  orderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  createdProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }]
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
