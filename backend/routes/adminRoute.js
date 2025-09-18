import express from 'express'
import { registerAdmin, loginAdmin, getAdminProfile } from '../controllers/adminController.js'
import authAdmin from '../middleware/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/register', registerAdmin)
adminRouter.post('/login', loginAdmin)
<<<<<<< HEAD
adminRouter.get('/profile', authAdmin, getAdminProfile) // load admin prodile details
=======
adminRouter.get('/profile', authAdmin, getAdminProfile)
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7

export default adminRouter