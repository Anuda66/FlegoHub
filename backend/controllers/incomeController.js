import bankSlipPaymentModel from "../models/bankSlipPaymentModel.js";
import incomeModel from "../models/incomeModel.js";

// Update income snapshot when a payment is approved-------------------------------------------
const updateIncomeSnapshot = async (payment) => {
    try {
        const approvedAt = payment.approvedAt || new Date();
        const year = approvedAt.getFullYear();
        const month = approvedAt.getMonth() + 1; // 1-12

        // Check if plan breakdown entry already exists
        const existing = await incomeModel.findOne({
            year,
            month,
            productId: payment.productId
        });

        if (existing) {
            // Find if this plan+billingCycle combo already exists in breakdown
            const planIndex = existing.planBreakdown.findIndex(
                p => p.planId.toString() === payment.planId.toString() &&
                    p.billingCycle === payment.billingCycle
            );

            if (planIndex > -1) {
                // Update existing plan breakdown entry
                existing.planBreakdown[planIndex].totalAmount += payment.paymentAmount;
                existing.planBreakdown[planIndex].paymentCount += 1;
            } else {
                // Add new plan breakdown entry
                existing.planBreakdown.push({
                    planId: payment.planId,
                    billingCycle: payment.billingCycle,
                    totalAmount: payment.paymentAmount,
                    paymentCount: 1
                });
            }

            // Update product monthly totals
            existing.totalAmount += payment.paymentAmount;
            existing.paymentCount += 1;

            await existing.save();

        } else {
            // Create new income record for this product+month
            await incomeModel.create({
                year,
                month,
                productId: payment.productId,
                planBreakdown: [{
                    planId: payment.planId,
                    billingCycle: payment.billingCycle,
                    totalAmount: payment.paymentAmount,
                    paymentCount: 1
                }],
                totalAmount: payment.paymentAmount,
                paymentCount: 1,
                currency: payment.currency || 'LKR'
            });
        }

        console.log(`✅ Income updated for productId: ${payment.productId} | ${year}-${month}`);

    } catch (error) {
        console.error('❌ Income update failed:', error.message);
    }
};

// Decrease income when approved payment is reversed (reject or pending)-----------------------------------------
const reverseIncomeSnapshot = async (payment) => {
    try {
        const approvedAt = payment.approvedAt || new Date();
        const year = approvedAt.getFullYear();
        const month = approvedAt.getMonth() + 1;

        const existing = await incomeModel.findOne({
            year,
            month,
            productId: payment.productId
        });

        if (!existing) {
            console.warn(`No income record found to reverse for productId: ${payment.productId} | ${year}-${month}`);
            return;
        }

        // Find the plan breakdown entry
        const planIndex = existing.planBreakdown.findIndex(
            p => p.planId.toString() === payment.planId.toString() &&
                p.billingCycle === payment.billingCycle
        );

        if (planIndex > -1) {
            // Decrease plan breakdown
            existing.planBreakdown[planIndex].totalAmount -= payment.paymentAmount;
            existing.planBreakdown[planIndex].paymentCount -= 1;

            // Remove plan entry if it hits zero
            if (existing.planBreakdown[planIndex].paymentCount <= 0) {
                existing.planBreakdown.splice(planIndex, 1);
            }
        }

        // Decrease product monthly totals
        existing.totalAmount -= payment.paymentAmount;
        existing.paymentCount -= 1;

        // Remove entire income record if nothing left
        if (existing.paymentCount <= 0) {
            await incomeModel.findByIdAndDelete(existing._id);
            //console.log(`🗑️ Income record deleted (zero payments) for productId: ${payment.productId} | ${year}-${month}`);
        } else {
            await existing.save();
            //console.log(`↩️ Income reversed for productId: ${payment.productId} | ${year}-${month}`);
        }

    } catch (error) {
        console.error('❌ Income reverse failed:', error.message);
    }
};

// Get current month income (all products) - for dashboard display------------------------------------------
const getCurrentMonthIncome = async (req, res) => {
    try {
        const now   = new Date();
        const year  = now.getFullYear();
        const month = now.getMonth() + 1; // 1-12

        const summary = await incomeModel.aggregate([
            {
                // Filter current month only
                $match: { year, month }
            },
            {
                $group: {
                    _id: '$productId',
                    totalAmount:  { $sum: '$totalAmount' },
                    paymentCount: { $sum: '$paymentCount' }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } }
        ]);

        const grandTotal    = summary.reduce((sum, item) => sum + item.totalAmount, 0);
        const totalPayments = summary.reduce((sum, item) => sum + item.paymentCount, 0);

        res.json({
            success: true,
            period: { year, month },
            grandTotal,
            totalPayments,
            productWise: summary
        });

    } catch (error) {
        console.error('Get Current Month Income Error:', error);
        res.json({ success: false, message: error.message });
    }
};

// Get total income summary (all time, by product)
const getTotalIncome = async (req, res) => {
    try {
        const summary = await incomeModel.aggregate([
            {
                $group: {
                    _id: '$productId',
                    totalAmount: { $sum: '$totalAmount' },
                    paymentCount: { $sum: '$paymentCount' }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } }
        ]);

        const grandTotal = summary.reduce((sum, item) => sum + item.totalAmount, 0);

        res.json({ success: true, grandTotal, productWise: summary });

    } catch (error) {
        console.error('Get Total Income Error:', error);
        res.json({ success: false, message: error.message });
    }
};

//  Get monthly income (all products combined, per month)
const getMonthlyIncome = async (req, res) => {
    try {
        const monthly = await incomeModel.aggregate([
            {
                $group: {
                    _id: { year: '$year', month: '$month' },
                    totalAmount: { $sum: '$totalAmount' },
                    paymentCount: { $sum: '$paymentCount' }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        res.json({ success: true, data: monthly });

    } catch (error) {
        console.error('Get Monthly Income Error:', error);
        res.json({ success: false, message: error.message });
    }
};

// Get previous month income
const getPreviousMonthIncome = async (req, res) => {
    try {
        const now   = new Date();
        let year    = now.getFullYear();
        let month   = now.getMonth(); // current month - 1 (0-indexed gives previous month)

        // Handle January edge case (go back to December of previous year)
        if (month === 0) {
            month = 12;
            year  = year - 1;
        }

        const data = await incomeModel.find({ year, month })
            .populate('productId', 'productName')
            .populate('planBreakdown.planId', 'name');

        const totalIncome   = data.reduce((sum, item) => sum + item.totalAmount, 0);
        const totalPayments = data.reduce((sum, item) => sum + item.paymentCount, 0);

        res.json({
            success: true,
            period: { year, month },
            totalIncome,
            totalPayments,
            productWise: data
        });

    } catch (error) {
        console.error('Get Previous Month Income Error:', error);
        res.json({ success: false, message: error.message });
    }
};

export { updateIncomeSnapshot, reverseIncomeSnapshot, getTotalIncome, getMonthlyIncome, getPreviousMonthIncome, getCurrentMonthIncome };