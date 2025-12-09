import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import { AppContext } from '../../context/appContext';
import { TiTick } from 'react-icons/ti'


function Payment() {

  const { isOpen, setIsOpen } = useSidebar();

  const { planId } = useParams();
  const { state } = useLocation();
  const { productAndPalan } = useContext(AppContext);
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to find plan by ID from context (fallback)
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
    setLoading(false);
  }, [planId, state, productAndPalan, navigate]);

  if (loading) {
    return <div>Loading payment details...</div>;
  }

  if (!selectedPlan) {
    return <div>Plan not found. Please select a plan.</div>;
  }

  // Compute selected price----------------------------------------------
  const pricing = selectedPlan.pricing || {};
  const selectedPrice = isAnnualBilling ? pricing.yearly?.price || 'N/A' : pricing.monthly?.price || 'N/A';
  const billingCycle = isAnnualBilling ? '/annually' : '/month';


  return (
    <div className='bg-slate-100 min-h-screen'>
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="">
            <h1 className="text-3xl font-bold mb-6">Payment for {selectedPlan.name}</h1>
            <div className="p-6 ">
              <p className="text-xl mb-4">Description: {selectedPlan.description}</p>
              <p className="text-2xl font-bold mb-4">
                Price: {selectedPlan.currency} {selectedPrice} {billingCycle}
              </p>
              {isAnnualBilling && <p className="text-green-500 mb-4">You're saving 20% with annual billing!</p>}

              <ul className="mb-6">
                {selectedPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <TiTick className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Add your payment form here (e.g., Stripe integration, form fields for card, etc.) */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Enter Payment Details</h2>
                {/* Placeholder for payment form */}
                <form>
                  <input type="text" placeholder="Card Number" className="block w-full mb-4 p-2 border" />
                  <input type="text" placeholder="Expiration Date" className="block w-full mb-4 p-2 border" />
                  <input type="text" placeholder="CVV" className="block w-full mb-4 p-2 border" />
                  <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Pay Now</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
