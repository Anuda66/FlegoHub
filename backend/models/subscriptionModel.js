import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'plan', required: true },
    status: { type: String, enum: ['active', 'expired', 'cancelled', 'pending', 'suspended'], default: 'pending' },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], required: true },
    // Current billing period
    currentPeriodStart: { type: Date, required: true },
    currentPeriodEnd: { type: Date, required: true },
    // Payment information
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'LKR' },
     // Payment history reference
    lastPaymentDate: Date,
    nextPaymentDate: Date,
    // Cancellation details
    cancelledAt: Date,
    cancelAtPeriodEnd: { type: Boolean, default: false },
    // Auto-renewal
    autoRenew: { type: Boolean, default: true }
}, { timestamps: true })

// Indexes for better performance
subscriptionSchema.index({ userId: 1, productId: 1 });
subscriptionSchema.index({ userId: 1, status: 1 });
subscriptionSchema.index({ currentPeriodEnd: 1, status: 1 });
subscriptionSchema.index({ stripeSubscriptionId: 1 });

// Instance method to check if subscription is active and not expired
subscriptionSchema.methods.isActiveAndValid = function () {
    return this.status === 'active' &&
        this.currentPeriodEnd > new Date() &&
        !this.cancelledAt;
};

// Instance method to check if subscription needs renewal
subscriptionSchema.methods.needsRenewal = function () {
    const now = new Date();
    const gracePeriod = 24 * 60 * 60 * 1000; // 24 hours grace period
    return this.currentPeriodEnd.getTime() - now.getTime() < gracePeriod;
};

// Static method to find active subscriptions for a user and product
subscriptionSchema.statics.findActiveSubscription = function (userId, productId) {
    return this.findOne({
        userId: userId,
        productId: productId,
        status: 'active',
        currentPeriodEnd: { $gt: new Date() }
    }).populate('planId productId');
};

const subscriptionModel = mongoose.model.subscription || mongoose.model('subscription', subscriptionSchema);

export default subscriptionModel;
