
import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, userList, removeUser, addUser, getUserPaymentHistory, getUserPaymentHistoryAdmin } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import authAdmin from '../middleware/authAdmin.js';
import uploade from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser); 
userRouter.get('/profile', authUser, getProfile); // loade profile details
userRouter.post('/update', uploade.single('image'), authUser, updateProfile); // update user profile
userRouter.get('/userList', userList); // get user details on admin dashboard
userRouter.post('/removeUser',authAdmin, removeUser); // remove user (admin) 
userRouter.post('/addUser', uploade.none() ,authAdmin, addUser); // add users (admin)
userRouter.get('/paymentHistory', authUser, getUserPaymentHistory); // get user payment history
userRouter.get('/paymentHistory/:userId', getUserPaymentHistoryAdmin); // get user payment history (admin)
 
export default userRouter;

