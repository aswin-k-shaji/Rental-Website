import userModel from '../models/user.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
            const token = createToken(user._id);
            res.json({ success: true, token, message: "Login successful" });
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
        const { name, email, password, userType, phoneNumber, address } = req.body;
        
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
            userType,
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


export { loginUser, registerUser, adminLogin, getAllUsers, removeUser };
