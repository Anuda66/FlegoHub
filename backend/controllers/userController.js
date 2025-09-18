import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// API fro add User from admin------------------------
const addUser = async (req, res) => {
    try {
        const { NIC, name, email, password, phone } = req.body

        if (!NIC || !name || !email || !password || !phone) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email------------------------------
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Place Enter Validate Email" })
        }

        // Validating strong password---------------------
        if (password.length < 8) {
            return res.json({ success: false, message: "Place Enter Strong Password" })
        }

        //hashing password-------------------------------
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            NIC,
            name,
            email,
            password: hashedPassword,
            phone
        }

        const newUser = new userModel(userData)
        await newUser.save()

        res.json({ success: true, message: "User Added" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
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

//API for list user----------------------------------
const userList = async (req, res) => {
    try {
        const userList = await userModel.find({}).select('-password')
        if (userList.length === 0) {
            return res.json({ success: false, message: "No users found" })
        }
        const stats = {
            totalUsers: userList.length
        }
        res.json({ success: true, stats, userList });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API fro delete users-----------------------------
const removeUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "User eccount removed" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { registerUser, loginUser, getProfile, updateProfile, userList, removeUser, addUser } 