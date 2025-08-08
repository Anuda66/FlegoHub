import adminModel from "../models/adminModdel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createAtoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// API for admin register------------------------------
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check user existing or not -----------------------------
        const exist = await adminModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, message: "User alredy existes" })
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

        const newAdmin = new adminModel({
            name,
            email,
            password: hashedPassword
        })

        const admin = await newAdmin.save()

        const aToken = createAtoken(admin._id)
        res.json({ success: true, aToken })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API for admin login ----------------------------------
const loginAdmin = async (req, res) => {

    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email })

        if (!admin) {
            return res.json({ success: false, message: "Admin doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (isMatch) {
            const aToken = createAtoken(admin._id)
            res.json({ success: true, aToken })
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

// get admin profile --------------------------------------
const getAdminProfile = async (req, res) => {
    try {
        const {adminId} = req
        const adminData = await adminModel.findById(adminId).select('-password')
        res.json({success:true, adminData})
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { registerAdmin, loginAdmin, getAdminProfile } 