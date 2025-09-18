import express from 'express';
import { createPlan, getPlansByProduct, updatePlan, deletePlan, getAllPlans, getAllProductsForDropdown, getPlanById } from '../controllers/planController.js';
import authAdmin from '../middleware/authAdmin.js';

const planRouter = express.Router();

planRouter.get('/product/:productId', getPlansByProduct);// Get plans for a specific product
planRouter.get('/products', getAllProductsForDropdown); // Get all products for dropdown

planRouter.post('/create', authAdmin, createPlan); // Create new plan
planRouter.post('/update/:planId',authAdmin, updatePlan); // Update plan
planRouter.post('/delete', authAdmin, deletePlan); // Delete plan
planRouter.get('/planList', getAllPlans); // Get all plans (admin view)
planRouter.get('/singlePlan/:id', getPlanById); // Get specific plan by ID


export default planRouter;


