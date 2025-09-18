
import express from 'express';
<<<<<<< HEAD
import { registerUser, loginUser, getProfile, updateProfile, userList, removeUser, addUser } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import authAdmin from '../middleware/authAdmin.js';
=======
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
import uploade from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
<<<<<<< HEAD
userRouter.post('/login', loginUser); 
userRouter.get('/profile', authUser, getProfile); // loade profile details
userRouter.post('/update', uploade.single('image'), authUser, updateProfile); // update user profile
userRouter.get('/userList', userList); // get user details on admin dashboard
userRouter.post('/removeUser',authAdmin, removeUser); // remove user (admin)
userRouter.post('/addUser', uploade.none() ,authAdmin, addUser); // add users (admin)


=======
userRouter.post('/login', loginUser);
userRouter.get('/profile', authUser, getProfile);
userRouter.post('/update', uploade.single('image'), authUser, updateProfile);
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7


export default userRouter;

