import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    planId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'plan' }],
    images: { type: Array, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true}, // Added category
    website: { type: String }, // Optional website URL
    features: { type: Array, required: true }, // Array of key features
    isActive: { type: Boolean, default: true }, // Product status

}, { timestamps: true })

const productModel = mongoose.model.product || mongoose.model('product', productSchema);

export default productModel; 
