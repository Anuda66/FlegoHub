import bankSlipPaymentModel from "../models/bankSlipPaymentModel.js";
import { v2 as cloudinary } from 'cloudinary'
import { updateIncomeSnapshot, reverseIncomeSnapshot } from "./incomeController.js";

// Create subscription with upload (User endpoint)-------------------------------------------------------------------
const createSubscription = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id || req.userId;
    const { productId, planId, billingCycle, currency, paymentAmount } = req.body
    const imageFile = req.file

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
    const imageURL = imageUpload.secure_url

    const subscriptionData = {
      userId,
      productId,
      planId,
      billingCycle,
      currency,
      paymentAmount,
      image: imageURL,
      paymentDate: Date.now(),
    }

    const Subscription = new bankSlipPaymentModel(subscriptionData)
    await Subscription.save()
    res.json({ success: true, message: 'Subscription created successfully' })
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// Get all pending subscriptions (Admin endpoint)-------------------------------------------------------------------
const getPendingSubscriptions = async (req, res) => {
  try {
    const pendings = await bankSlipPaymentModel.find({ status: 'pending' }).populate('userId', 'name email').populate('planId', 'name price').populate('productId', 'productName');
    res.json(pendings);
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
};

// Get all approved subscriptions (Admin endpoint)-------------------------------------------------------------------
const getApprovedSubscriptions = async (req, res) => {
  try {
    const approveds = await bankSlipPaymentModel.find({ status: 'approved' }).populate('userId', 'name email').populate('planId', 'name price').populate('productId', 'productName');
    res.json(approveds);
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
};

// Get all rejected subscriptions (Admin endpoint)-------------------------------------------------------------------
const getRejectedSubscriptions = async (req, res) => {
  try {
    const rejected = await bankSlipPaymentModel.find({ status: 'rejected' }).populate('userId', 'name email').populate('planId', 'name price').populate('productId', 'productName');
    res.json(rejected);
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
};

// Approve or reject subscription (Admin endpoint)-------------------------------------------------------------------
// const approvePayment = async (req, res) => {
//   try {
//     const { paymentId } = req.params;
//     const { status, notes } = req.body;

//     if (!paymentId) {
//       return res.json({ success: false, message: 'Payment ID is required' });
//     }

//     await bankSlipPaymentModel.findByIdAndUpdate(paymentId, { status, notes, approvedAt: Date.now() })

//     res.json({ success: true, message: `Change successfully` });

//   }
//   catch (error) {
//     console.error('Approve Payment Error:', error);
//     return res.json({ success: false, message: error.message });
//   }
// };

// Get payment status counts (Admin endpoint)-------------------------------------------------------------------
const getPaymentStatusCounts = async (req, res) => {
  try {
    const counts = await bankSlipPaymentModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert array to object with defaults
    const result = { pending: 0, approved: 0, rejected: 0 };
    counts.forEach(item => {
      result[item._id] = item.count;
    });

    res.json({ success: true, data: result });

  } catch (error) {
    console.error('Get Payment Counts Error:', error);
    res.json({ success: false, message: error.message });
  }
};

// Update approvePayment controller to auto update income snapshot when approved-------------------------------------------------------------------
const approvePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status, notes } = req.body || {};

    // ✅ Get BEFORE update to check previous status
    const existingPayment = await bankSlipPaymentModel.findById(paymentId);
    if (!existingPayment) {
      return res.json({ success: false, message: 'Payment not found' });
    }

    const previousStatus = existingPayment.status;

    // Build update data
    const updateData = {};
    if (status) updateData.status = status;
    if (notes) updateData.notes = notes;
    if (status === 'approved') updateData.approvedAt = new Date();

    const updatedPayment = await bankSlipPaymentModel.findByIdAndUpdate(
      paymentId,
      updateData,
      { new: true }
    );

    // ✅ Case 1: approved → pending or rejected (DECREASE income)
    if (previousStatus === 'approved' && (status === 'pending' || status === 'rejected')) {
      await reverseIncomeSnapshot(existingPayment); // use OLD data before update
    }

    // ✅ Case 2: pending/rejected → approved (INCREASE income)
    if (previousStatus !== 'approved' && status === 'approved') {
      await updateIncomeSnapshot(updatedPayment);
    }

    // ✅ Case 3: approved → approved (no change needed)
    // ✅ Case 4: pending → rejected or rejected → pending (no income impact)

    res.json({ success: true, message: `Payment ${status} successfully` });

  } catch (error) {
    console.error('Approve Payment Error:', error);
    res.json({ success: false, message: error.message });
  }
};

export { createSubscription, getPendingSubscriptions, approvePayment, getPaymentStatusCounts, getApprovedSubscriptions, getRejectedSubscriptions };