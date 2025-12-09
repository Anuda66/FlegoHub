import mongoose from "mongoose";

const bankSlipPaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'plan', required: true },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], required: true },
    currency: { type: String, default: 'LKR', uppercase: true },
    image: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    paymentAmount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    approvedAt: { type: Date },
    notes: { type: String }, // Fixed: removed extra colon
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } // Added: track admin
}, { timestamps: true });

const bankSlipPaymentModel = mongoose.models.bankSlipPayment || mongoose.model('bankSlipPayment', bankSlipPaymentSchema);

export default bankSlipPaymentModel;