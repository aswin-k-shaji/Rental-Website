import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import reviewRouter from "./routes/reviewRoutes.js";
import messageRouter from "./routes/messageRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB & Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/message', messageRouter);
app.use('/api/category', categoryRouter)

// Test API Route
app.get('/', (req, res) => {
  res.send("API Working");
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port:", port);
});
