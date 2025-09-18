import React, { useEffect, useState } from 'react';
import { useSidebar } from '../context/SidebarContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';
import { TiTick } from 'react-icons/ti';

function SingleProduct() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [productData, setProductData] = useState(null);
  const [planData, setPlanData] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [plansLoading, setPlansLoading] = useState(true); // New loading state for plans

  const { isOpen } = useSidebar();
  const { productId } = useParams();

  const getSingleProduct = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/product/single', { productId });
      if (response.data.success) {
        setProductData(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getPlansByProduct = async () => {
    try {
      setPlansLoading(true);
      const response = await axios.get(backendUrl + `/api/plan/product/${productId}`);
      if (response.data.success) {
        setPlanData(response.data.data.plans || []); // Set to plans array, fallback to empty array
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setPlanData([]); // Fallback to empty array on error
    } finally {
      setPlansLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
    getPlansByProduct();
  }, [productId]);

  // Optional: Log planData when it changes
  useEffect(() => {
    console.log('Updated planData:', planData);
  }, [planData]);

  // Loading state for both product and plans
  if (loading || plansLoading) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-bold">Product Overview</h1>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden px-10">
          {/* Product Header */}
          <div className="p-6 border-b">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="text-3xl font-bold text-primary">
                    {productData?.productName || 'N/A'}
                  </h2>
                  <p className="text-gray-600 mt-1">Product ID: {productData?._id || 'N/A'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-semibold">
                  {productData?.date ? formatDate(productData.date) : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{productData?.description || 'No description available'}</p>
          </div>

          {/* Pricing Plans */}
          <div className="p-6">
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pricing Plans</h2>
                  <p className="mt-4 text-lg text-gray-600">Choose the perfect plan for your needs.</p>

                  {/* Toggle switch */}
                  <div className="mt-6 flex justify-center items-center">
                    <span className={`mr-3 text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                      Monthly
                    </span>
                    <button
                      onClick={() => setIsAnnual(!isAnnual)}
                      className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
                    >
                      <div className="w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 transition duration-200 ease-in-out cursor-pointer">
                        <div
                          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${isAnnual ? 'translate-x-8' : 'translate-x-0'
                            }`}
                        ></div>
                      </div>
                    </button>
                    <span className={`ml-3 text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                      Annual <span className="text-green-500">(Save 20%)</span>
                    </span>
                  </div>
                </div>

                <div className="mt-16">
                  {planData.length > 0 ? (
                    <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                      {planData.map((plan) => (
                        <div
                          key={plan._id}
                          className={`relative p-8 bg-white rounded-2xl shadow-sm border border-gray-200 ${plan.isPopular ? 'ring-2 ring-blue-800' : ''
                            } transition-all duration-300 hover:shadow-md`}
                        >
                          {plan.isPopular && (
                            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                              <span className="bg-blue-800 text-white px-4 py-1 text-sm font-semibold rounded-full">
                                Most Popular
                              </span>
                            </div>
                          )}

                          <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                            <p className="mt-4 text-gray-600">{plan.description}</p>

                            <div className="mt-6 flex items-baseline justify-center">
                              <span className="text-3xl font-bold text-gray-900">
                                {plan.currency} {isAnnual ? plan.pricing?.yearly?.price || 'N/A' : plan.pricing?.monthly?.price || 'N/A'}
                              </span>
                              <span className="ml-1 text-xl font-medium text-gray-500">{isAnnual ? "/annually" : "/month"}</span>
                            </div>
                            

                            <ul className="mt-8 space-y-4">
                              {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center">
                                  <TiTick className="h-5 w-5 text-green-500" />
                                  <span className="ml-3 text-gray-600">{feature}</span>
                                </li>
                              ))}
                            </ul>

                            <button
                              className={`mt-8 w-full py-3 px-6 rounded-md text-base font-semibold ${plan.isPopular
                                  ? 'bg-blue-800 text-white hover:bg-blue-700'
                                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer`}
                            >
                              {plan.cta || 'Get Started'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center bg-red-100 border border-red-300 py-3 rounded-md shadow-xl">
                      <p className=" text-md font-medium text-red-400">No plans available for this product.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;