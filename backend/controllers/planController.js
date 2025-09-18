import productModel from "../models/productModel.js";
import planModel from '../models/planModel.js'

// Create a new plan for a product--------------------------------------------------------------
const createPlan = async (req, res) => {
    try {
        const { productId, name, description, pricing, currency, features, isPopular, isVisible } = req.body;

        // Validate product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Validate required pricing data
        if (!pricing.monthly?.price || !pricing.yearly?.price) {
            return res.json({ success: false, message: 'Both monthly and yearly pricing are required' });
        }

        // Create plan in database 
        const planData = {
            productId,
            name,
            description,
            pricing: {
                monthly: { price: pricing.monthly.price },
                yearly: { price: pricing.yearly.price, }
            },
            currency,
            features,
            isPopular,
            isVisible
        }

        const newPlan = new planModel(planData);
        await newPlan.save();

        // Update product with plan reference (push to array if multiple plans are allowed)
        await productModel.findByIdAndUpdate(
            productId,
            { $push: { planId: newPlan._id } },
            { new: true }
        );

        res.status(201).json({ success: true, message: 'Plan added to product successfully', });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Get all plans for a specific product--------------------------------------------------------------####
const getPlansByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await productModel.findById(productId).populate('planId').select('planId productName category') // Only select necessary fields.exec();

        if (!product) {
            return res.json({ success: false, message: 'Product not found' });
        }

        if (!product.planId || product.planId.length === 0) {
            return res.json({success: false,message: 'No plans found for this product'});
        }

        // Filter out only active and visible plans
        const activePlans = product.planId.filter(plan =>
            plan.isActive && plan.isVisible
        );

        if (activePlans.length === 0) {
            return res.json({success: false,message: 'No active plans available for this product'});
        }

        // Return the plan details
        return res.json({
            success: true,
            message: 'Plans retrieved successfully',
            data: { productName: product.productName, category: product.category, plans: activePlans }
        });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Specific palan data------------------------------------------------------------------
const getPlanById = async (req, res) => {
    try {
        const plan = await planModel.findById(req.params.id);
        if (!plan) {
            return res.json({ success: false, message: 'Plan not found' });
        }
        res.json({ success: true, data: plan });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Update a plan-----------------------------------------------------------------
const updatePlan = async (req, res) => {
    try {
        const { planId } = req.params;
        const updates = req.body;

        // Find the plan-------------------------------------
        const plan = await planModel.findById(planId);
        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }

        // Check if name is being updated and already exists-----------------------
        if (updates.name && updates.name !== plan.name) {
            // Find the product that contains this plan-----------------------------
            const product = await productModel.findOne({ planId: planId });
            if (product) {
                const existingPlans = await planModel.find({
                    _id: { $in: product.planId, $ne: planId },
                    name: { $regex: new RegExp(`^${updates.name}$`, 'i') }
                });

                if (existingPlans.length > 0) {
                    return res.status(400).json({ success: false, message: 'A plan with this name already exists for this product' });
                }
            }
        }
        // Prepare update data-----------------------------------
        const updateData = {};
        if (updates.name) updateData.name = updates.name.trim();
        if (updates.description) updateData.description = updates.description;
        if (updates.pricing) updateData.pricing = updates.pricing;
        if (updates.currency) updateData.currency = updates.currency.toUpperCase();
        if (updates.features) updateData.features = updates.features;
        if (typeof updates.isActive === 'boolean') updateData.isActive = updates.isActive;
        if (typeof updates.isPopular === 'boolean') updateData.isPopular = updates.isPopular;
        if (typeof updates.isVisible === 'boolean') updateData.isVisible = updates.isVisible;

        // Update the plan-------------------------------------
        const updatedPlan = await planModel.findByIdAndUpdate(
            planId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, message: 'Plan updated successfully', });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Delete a plan ------------------------------------------------------------------------------
const deletePlan = async (req, res) => {
    try {
        await planModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Plan Removed" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Get all plans with product information (admin view) ------------------------------------------------------------------------------
const getAllPlans = async (req, res) => {
    try {
        const { isActive, category } = req.query;

        // Build filter query
        let filter = {};
        if (typeof isActive === 'string') {
            filter.isActive = isActive === 'true';
        }
        if (category) {
            filter.category = { $regex: new RegExp(category, 'i') };
        }

        // Get products with populated plans
        const products = await productModel.find(filter)
            .populate({
                path: 'planId',
                match: { isActive: true }, // Only show active and visible plans
                select: 'name description pricing currency features isPopular isVisible createdAt updatedAt'
            })
            .select('-__v')
            .sort({ createdAt: -1 });

        // Filter out products that have no active plans (if plans were filtered out)
        const productsWithPlans = products.filter(product =>
            product.planId && product.planId.length > 0
        );

        // Add statistics
        const stats = {
            totalProducts: products.length,
            productsWithPlans: productsWithPlans.length,
            totalPlans: productsWithPlans.reduce((sum, product) => sum + product.planId.length, 0)
        };

        res.status(200).json({
            success: true,
            message: 'Products with plans retrieved successfully',
            data: productsWithPlans,
            stats
        });

    } catch (error) {
        console.error('Error fetching plans with product details:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}

// Get all products for dropdown------------------------------------------------------------------------------
const getAllProductsForDropdown = async (req, res) => {
    try {
        const product = await productModel.find({}, 'productName _id')
        res.json({ success: true, product })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { createPlan, getPlansByProduct, updatePlan, deletePlan, getAllPlans, getAllProductsForDropdown, getPlanById };