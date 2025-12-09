import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    planId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'plan' }],
    images: { type: Array, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true}, 
    website: { type: String }, 
    features: { type: Array, required: true }, 
    isActive: { type: Boolean, default: true }, 

}, { timestamps: true })

const productModel = mongoose.model.product || mongoose.model('product', productSchema);

export default productModel; 
