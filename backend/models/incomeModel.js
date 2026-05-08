import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({

    // Period tracking
    year: { type: Number, required: true },
    month: { type: Number, required: true, min: 1, max: 12 }, // 1-12

    // Product-wise breakdown
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },

    // Plan-wise breakdown inside each product
    planBreakdown: [
        {
            planId: { type: mongoose.Schema.Types.ObjectId, ref: 'plan' },
            planName: { type: String },
            billingCycle: { type: String, enum: ['monthly', 'annual'] },
            totalAmount: { type: Number, default: 0 },
            paymentCount: { type: Number, default: 0 },
        }
    ],

    // Product monthly totals
    totalAmount: { type: Number, default: 0 },       // total income for this product this month
    paymentCount: { type: Number, default: 0 },       // number of approved payments
    currency: { type: String, default: 'LKR' },

}, { timestamps: true });

// Unique per product per month per year
incomeSchema.index({ year: 1, month: 1, productId: 1 }, { unique: true });

const incomeModel = mongoose.models.income || mongoose.model('income', incomeSchema);
export default incomeModel;