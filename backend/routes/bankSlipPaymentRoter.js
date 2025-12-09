import express from 'express';
import { createSubscription, getPendingSubscriptions, approvePayment } from '../controllers/bankSlipPaymentController.js';
import authUser from '../middleware/authUser.js';
import authAdmin from '../middleware/authAdmin.js';
import uploade from '../middleware/multer.js';

const bankSlipPaymentRouter = express.Router();

bankSlipPaymentRouter.post('/createSubscription', uploade.single('image'), authUser, createSubscription); 
bankSlipPaymentRouter.get('/pendings', authAdmin, getPendingSubscriptions); 
bankSlipPaymentRouter.post('/spayments/:paymentId', authAdmin, approvePayment); 

export default bankSlipPaymentRouter;