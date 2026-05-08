import express from 'express';
import { getTotalIncome, getMonthlyIncome, getPreviousMonthIncome, getCurrentMonthIncome } from '../controllers/incomeController.js';
import authAdmin from '../middleware/authAdmin.js';

const incomeRouter = express.Router();

incomeRouter.get('/total', getTotalIncome); // Get total income summary (all time, by product) 
incomeRouter.get('/currentMonth', getCurrentMonthIncome); // Get current month income (all products)
incomeRouter.get('/previousMonth', getPreviousMonthIncome); // Get previous month income
incomeRouter.get('/monthlyIncome', getMonthlyIncome); // Get monthly income (all products combined, per month)

export default incomeRouter;