import userModel from '../models/user.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import itemModel from '../models/items.js';



const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({ success: true, userId: user._id.toString(), message: "Login successful" });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.json({ success: false, message: "Error: " + error.message });
    }
};


// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;
        
        // Checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        
        // Validating email & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }
        
        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            address
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error: " + error.message });
    }
};

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Route to fetch user details
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("name email userType phoneNumber address");
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({success: false, message: error.message });

    }
};


const getUserById = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const user = await userModel.findById(id).select("name email");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Route to delete user
const removeUser = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User removed successfully' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: 'Invalid User ID' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};





// const getCartData = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         if (!userId) {
//             return res.status(400).json({ success: false, message: "User ID is required" });
//         }
//         const user = await userModel.findById(userId).populate("cartData");
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//         const productIds = user.cartData.map(product => product._id);
//         console.log("Cart Product IDs:", productIds);
//         return res.json({ success: true, productIds });
//     } catch (error) {
//         console.error("Error fetching cart data:", error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };





const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("🔍 Received userId:", userId);

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("❌ Invalid user ID format");
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Find the user by ID and retrieve cartData (product IDs)
    const user = await userModel.findById(userId);
    
    console.log("🛒 Retrieved User:", user);

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Extract cartData (array of product ObjectIds)
    const cartProductIds = user.cartData;

    if (!cartProductIds || cartProductIds.length === 0) {
      console.log("⚠️ Cart is empty");
      return res.status(200).json({ message: "Cart is empty", cartItems: [] });
    }

    console.log("🛍️ Product IDs in Cart:", cartProductIds);

    // Fetch product details using the IDs in cartData
    const cartItems = await itemModel.find({ _id: { $in: cartProductIds } });

    console.log("✅ Fetched Cart Items:", cartItems);

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("❌ Error fetching cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





const addToCart = async (req, res) => {
    const { userId, productId } = req.body;
    console.log(req.body);
    console.log(`User ID: ${userId}, Product ID: ${productId}`);
    
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        user.cartData.push(productId);
        await user.save();

        console.log('Product added to cart successfully');
        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.log('Error adding product to cart:', error);
        res.status(500).json({ message: 'Error adding product to cart', error });
    }
};




const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    console.log("🔍 Received userId:", userId);
    console.log("🔍 Received productId:", productId);

    // Validate userId and productId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      console.log("❌ Invalid user ID or product ID format");
      return res.status(400).json({ message: "Invalid user ID or product ID format" });
    }

    // Find the user
    const user = await userModel.findById(userId);
    
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("🛒 Current Cart Items:", user.cartData);

    // Check if the product exists in the cart
    if (!user.cartData.includes(productId)) {
      console.log("⚠️ Product not found in cart");
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the product from cartData
    user.cartData = user.cartData.filter(id => id.toString() !== productId);
    await user.save();

    console.log("✅ Updated Cart Items:", user.cartData);

    res.status(200).json({ message: "Product removed from cart", updatedCart: user.cartData });
  } catch (error) {
    console.error("❌ Error removing product from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export { loginUser, registerUser, adminLogin, getAllUsers, removeUser, userModel, getUserById, addToCart,getCartItems,removeFromCart};
