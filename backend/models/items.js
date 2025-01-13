import mongoose from "mongoose";


const itemSchema = new mongoose.Schema({
  title: {type: String,required: true,},
  description: {type: String,required: true,},
  category: {type: String,required: true,},
  owner: { 
    type: mongoose.Schema.Types.Mixed,
    default: "admin"
  },
  pricePerDay: {type: Number,required: true,},
  location:{type: String,required: true,},
  contact:{type:Number,required:true},
  image:{type:Array,required:true},
  date: { type: Number, default: Date.now }
});

const itemModel = mongoose.models.item || mongoose.model('item', itemSchema);

export default itemModel;