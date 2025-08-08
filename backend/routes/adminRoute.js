import express from 'express'
import { registerAdmin, loginAdmin, getAdminProfile } from '../controllers/adminController.js'
import authAdmin from '../middleware/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/register', registerAdmin)
adminRouter.post('/login', loginAdmin)
adminRouter.get('/profile', authAdmin, getAdminProfile)

export default adminRouter