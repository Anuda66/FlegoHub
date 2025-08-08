import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// API for user register------------------------------
const registerUser = async (req, res) => {
    try {
        const { NIC, name, email, password, phone } = req.body;

        // check user existing or not -----------------------------
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User alredy existes" })
        }

        // check user existing or not -----------------------------
        const existNIC = await userModel.findOne({ NIC });
        if (existNIC) {
            return res.json({ success: false, message: "NIC alredy existes" })
        }

        // Validation email format-----------------------------
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Place enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Place enter strong password" })
        }

        // Hashing user password--------------------------------------
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            NIC,
            name,
            email,
            password: hashedPassword,
            phone
        });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token });

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API for user login ----------------------------------
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid credential' })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Get user profile data------------------------------
const getProfile = async (req, res) => {
    try {
        const { userId } = req;
        const userData = await userModel.findById(userId).select('-password');
        res.json({ success: true, userData });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API for user profile update-------------------------
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?.id || req.userId;
        const { NIC, name, email, phone } = req.body
        const imageFile = req.file

        if (!userId) {
            return res.json({ success: false, message: 'User ID missing' });
        }

        if (!NIC || !name || !email || !phone) {
            return res.json({ success: false, message: 'Data Missing?' })
        }
        
        await userModel.findByIdAndUpdate(userId, { NIC, name, email, phone })

        if (imageFile) {
            
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }
        res.json({ success: true, message: 'Profile Updated' })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile } 