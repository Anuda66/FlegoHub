import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    pricing: {
        monthly: {price: { type: Number, required: true, min: 0 },},
        yearly: {price: { type: Number, required: true, min: 0 },}
    },
    currency: { type: String, required: true, default: 'LKR', uppercase: true },
    features: { type: Array, required: true },
    isActive: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true, },
}, { timestamps: true })

const planModel = mongoose.model.plan || mongoose.model('plan', planSchema);

export default planModel;