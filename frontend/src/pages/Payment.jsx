import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa6";
import { toast } from 'react-toastify';
import axios from 'axios';

function Payment() {
  const { planId } = useParams();
  const { state } = useLocation();
  const { productAndPalan } = useContext(AppContext);
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(AppContext);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);
  const [selectProduct, setSelectProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState(null);
  const [productId, setProductId] = useState('');
  const [planid, setPlanid] = useState('');
  const [billingcycle, setBillingCycle] = useState('');
  const [currency, setCurrency] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  const uploadBankSlip = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productId', productId);
      formData.append('planId', planid);
      formData.append('billingCycle', billingcycle);
      formData.append('currency', currency);
      formData.append('paymentAmount', paymentAmount);
      if (image) {
        formData.append('image', image);
      }

      // Backend integration: Replace '/api/create-subscription' with the actual endpoint path.
      // Assuming authentication is handled via token in headers if needed (e.g., add 'Authorization': `Bearer ${token}` from context).
      const response = await axios.post(`${backendUrl}/api/bankSlipPayment/createSubscription`, formData, {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        toast.success('Subscription created successfully');
        navigate('/'); // Redirect to desired page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const [activeTab, setActiveTab] = useState("tab1");
  const tabs = [
    { id: "tab1", label: "Card Payment" },
    { id: "tab2", label: "Payment Slip" },
  ];

  // Function to find plan by ID from context
  const findPlanById = (id) => {
    for (let product of productAndPalan) {
      for (let plan of product.planId) {
        if (plan._id === id) {
          return plan;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    let planFromState = state?.plan;
    let isAnnualFromState = state?.isAnnual ?? false;
    let productID = state?.productid;

    if (!planFromState) {
      // Fallback: Fetch from context
      planFromState = findPlanById(planId);
      if (!planFromState) {
        console.error('Plan not found');
        navigate('/'); // Redirect to home or error page
        return;
      }
    }
    setSelectedPlan(planFromState);
    setIsAnnualBilling(isAnnualFromState);
    setSelectProduct(productID);
    setProductId(productID);
    setPlanid(planFromState._id);
    setBillingCycle(isAnnualFromState ? 'annual' : 'monthly');
    setCurrency(planFromState.currency);
    const pricing = planFromState.pricing || {};
    const selectedPrice = isAnnualFromState ? pricing.yearly?.price || 'N/A' : pricing.monthly?.price || 'N/A';
    setPaymentAmount(selectedPrice);
    setLoading(false);
    //console.log(productID);
  }, [planId, state, productAndPalan, navigate]);

  if (loading) {
    return <div>Loading payment details...</div>;
  }

  if (!selectedPlan) {
    return <div>Plan not found. Please select a plan.</div>;
  }

  // Compute selected price
  const pricing = selectedPlan.pricing || {};
  const selectedPrice = isAnnualBilling ? pricing.yearly?.price || 'N/A' : pricing.monthly?.price || 'N/A';
  const billingCycleDisplay = isAnnualBilling ? '/annually' : '/month';

  const tabContent = {
    tab1: (
      <div className="">
        <h1 className="text-2xl font-bold ">Payment for {selectedPlan.name} plan</h1>
        <div className="p-6 ">
          <p className="text-md mb-4">Plan Name: {selectedPlan.description}</p>
          <p className="text-md font-bold mb-4">
            Price: {selectedPlan.currency} {selectedPrice} {billingCycleDisplay}
          </p>
          {isAnnualBilling && <p className="text-green-500 mb-4">You're saving 20% with annual billing!</p>}

          {/* Add your payment form here (e.g., Stripe integration, form fields for card, etc.) */}
          <div className="mt-6">
            <h2 className="text-md font-semibold mb-4">Enter Payment Details</h2>
            {/* Placeholder for payment form */}
            <form>
              <input type="text" placeholder="Card Number" className="block w-1/2 mb-4 p-2 border" />
              <input type="text" placeholder="Expiration Date" className="block w-1/2 mb-4 p-2 border" />
              <input type="text" placeholder="CVV" className="block w-1/2 mb-4 p-2 border" />
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Pay Now</button>
            </form>
          </div>
        </div>
      </div>
    ),
    tab2: (
      <div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Upload Payment Slip for {selectedPlan.name} plan</h1>
          <p className="text-md mb-4">Plan Description: {selectedPlan.description}</p>
          <p className="text-md font-bold mb-4">
            Price: {selectedPlan.currency} {selectedPrice} {billingCycleDisplay}
          </p>
          {isAnnualBilling && <p className="text-green-500 mb-4">You're saving 20% with annual billing!</p>}
          <form onSubmit={uploadBankSlip}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Upload Bank Slip</label>
              <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])} 
                className="block w-1/2 p-2 border" 
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Submit Slip</button>
          </form>
        </div>
      </div>
    ),
  };

  return (
    <div className='my-26 mx-16'>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="container mx-auto -pt-4">
          <div className="flex justify-center mb-4 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 mx-3 cursor-pointer ${activeTab === tab.id
                    ? "border text-blue-700 text-sm font-semibold    "
                    : "text-gray-500"
                  }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {
                  tab.id === "tab1" ? <FaCcVisa className="inline-block mr-2 text-blue-700 not-only-of-type:" />
                  : <FaMoneyBillAlt  className="inline-block mr-2 text-blue-700 " />
                }{tab.label}
              </button>
            ))}
          </div>
          <div className="mt-4">{tabContent[activeTab]}</div>
        </div>
      </div>
    </div>
  );
}

export default Payment;