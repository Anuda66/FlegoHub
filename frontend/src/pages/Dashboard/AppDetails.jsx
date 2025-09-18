import React, { useContext, useEffect, useState } from 'react'
import { useSidebar } from '../../context/SidebarContext';
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/appContext';
import { TiTick } from 'react-icons/ti'


function AppDetails() {

  const [isAnnual, setIsAnnual] = useState(false);
  const { isOpen } = useSidebar();
  const { productId } = useParams()

  const { productAndPalan } = useContext(AppContext)
  const [productPlanData, setProductPlanData] = useState(false)

  const fetchProductPalan = async () => {
    productAndPalan.map((item) => {
      if (item._id === productId) {
        setProductPlanData(item)
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductPalan()
  }, [productId, productAndPalan])


  return productPlanData ? (
    <div className='bg-slate-100 min-h-screen'>
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
        <div className='flex justify-between items-center pb-4'>
          <h1 className="text-2xl font-bold ">Product Overview</h1>
          <button onClick={() => window.history.back()} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer">
            ← Back
          </button>
        </div>

        <div >
          <div className='bg-white rounded-lg shadow-md overflow-hidden px-10'>
            <div className="p-6 border-b">
              <div className='flex items-center mb-5'>

                <p className='text-primary font-bold text-2xl'>{productPlanData.productName}</p>
              </div>
              <p className='text-xl mb-3'>Description</p>
              <hr className='border-gray-400 mb-3' />
              <p className='text-md text-gray-600 mb-3'>{productPlanData.description}</p>
            </div>
            {/* Pricing Plans--------------------------------------------------- */}
            <div className="p-6 ">
              <div>
                <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Pricing Plans
                      </h2>
                      <p className="mt-4 text-lg text-gray-600">
                        Choose the perfect plan for your needs.
                      </p>

                      {/* Toggle switch */}
                      <div className="mt-6 flex justify-center items-center">
                        <span className={`mr-3 text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                          Monthly
                        </span>
                        <button
                          onClick={() => setIsAnnual(!isAnnual)}
                          className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          <div className="w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 transition duration-200 ease-in-out">
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

                    <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                      {productPlanData.planId.map((plan) => (
                        <div
                          key={plan._id}
                          className={`relative p-8 bg-white rounded-2xl shadow-sm border border-gray-200 ${plan.isPopular ? 'ring-2 ring-blue-800' : ''} transition-all duration-300 hover:shadow-md`}
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
                              className={`mt-8 w-full py-3 px-6 rounded-md text-base font-semibold ${plan.isPopular ? 'bg-blue-800 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer`}
                            >
                              Get Started
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>


                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default AppDetails
