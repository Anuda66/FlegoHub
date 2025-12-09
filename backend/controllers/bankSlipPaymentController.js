import bankSlipPaymentModel from "../models/bankSlipPaymentModel.js";
import { v2 as cloudinary } from 'cloudinary'

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

// Approve or reject subscription (Admin endpoint)-------------------------------------------------------------------
const approvePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status, notes } = req.body;

    if (!paymentId) {
      return res.json({ success: false, message: 'Payment ID is required' });
    }

    await bankSlipPaymentModel.findByIdAndUpdate(paymentId, { status, notes, approvedAt: Date.now() })

    res.json({ success: true, message: `Change successfully` });

  }
  catch (error) {
    console.error('Approve Payment Error:', error);
    return res.json({ success: false, message: error.message });
  }
};

export { createSubscription, getPendingSubscriptions, approvePayment }