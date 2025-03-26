import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true } ,
  category: { type: String, required: true },
  NumberOfItems:{type:Number},
  Available:{type:Number},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  pricePerDay: { type: Number, required: true },
  location: { type: String, required: true },
  contact: { type: String,required: true},
  status: { type: String, enum: ['available', 'rented'], default: 'available' },
  image: { type: Array, required: true },
  date: { type: Date, default: Date.now },
});

const itemModel = mongoose.models.item || mongoose.model('item', itemSchema);

export default itemModel;