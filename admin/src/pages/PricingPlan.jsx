import React, { useEffect, useState } from 'react'
import { useSidebar } from '../context/SidebarContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { IoDocumentsSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import AddPricingPlan from '../components/Forms/AddPricingPlan';
import UpdatePricing from '../components/Forms/UpdatePricing';

function PricingPlan({ aToken }) {

    const { isOpen } = useSidebar();
    const [open, setOpen] = useState(false);
    const [openDelet, setOpenDelet] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [productAndPlan, setProductAndPlan] = useState([])
    const [state, setState] = useState([])
    const [selectedPlanId, setSelectedPlanId] = useState(null)
    const [selectPlan, setSelectPlan] = useState(null)


    const fetchProductAndPlan = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/plan/planList')

            if (response.data.success) {
                setProductAndPlan(response.data.data)
                setState(response.data.stats)
                //console.log(response.data.data);

            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // get plan Id when click icon and pass plan Id to popup model
    const handelPlanClick = (planId) => {
        setOpenUpdate(true);
        setSelectPlan(planId);
        //console.log(planId);
    }

    const removePlan = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/plan/delete', { id: selectedPlanId }, { headers: { aToken } })
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchProductAndPlan()
                setOpenDelet(false)
                setSelectedPlanId(null)
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const handleDeleteClick = (planId) => {
        setSelectedPlanId(planId);
        setOpenDelet(true);
    }
    const handleCancelDelete = () => {
        setOpenDelet(false);
        setSelectedUserId(null);
    }

    useEffect(() => {
        fetchProductAndPlan()
    }, [])

    return (
        <div className='bg-slate-50 min-h-screen'>
            <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
                <h1 className="text-2xl font-bold mb-6">Pricing Plan Management</h1>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">All Pricing Plan</h2>
                        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
                            <IoDocumentsSharp />Add Pricing Plan
                        </button>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {/* Stats Cards----------------------------------------------------------------------- */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
                                <p className="text-2xl font-semibold mt-2">{state.totalProducts}</p>
                                <p className="text-green-500 text-xs mt-2">+12% from last month</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-gray-500 text-sm font-medium">Products With Plans</h3>
                                <p className="text-2xl font-semibold mt-2">{state.productsWithPlans}</p>
                                <p className="text-green-500 text-xs mt-2">+12% from last month</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-gray-500 text-sm font-medium">Total Plans</h3>
                                <p className="text-2xl font-semibold mt-2">{state.totalPlans}</p>
                                <p className="text-green-500 text-xs mt-2">+12% from last month</p>
                            </div>
                        </div>
                    </div>

                    <div className='my-8'>
                        <input className='border border-gray-400 py-1 px-2 w-full rounded-md' type="text" placeholder='Search' />
                    </div>

                    {/* Add plan form popup modal---------------------------------------------- */}
                    {open && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 ">
                                <div className=" ">
                                    <div className="ml-4">
                                        <div className='flex justify-between items-center'>
                                            <h3 className="text-lg font-medium text-gray-900">Add new price plan</h3>
                                            <button className='cursor-pointer hover:text-red-700' onClick={() => setOpen(false)}><ImCross /></button>
                                        </div>
                                        <div >
                                            <AddPricingPlan aToken={aToken} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }

                    {/*  update paln form popup modal---------------------------------------------- */}
                    {openUpdate && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 ">
                                <div className=" ">
                                    <div className="ml-4">
                                        <div className='flex justify-between items-center'>
                                            <h3 className="text-lg font-medium text-gray-900">Update price plan</h3>
                                            <button onClick={() => setOpenUpdate(false)} className='cursor-pointer hover:text-red-700' ><ImCross /></button>
                                        </div>
                                        <div >
                                            <UpdatePricing selectPlan={selectPlan} aToken={aToken} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }

                    {/* Delete user popup modal - moved outside of table loop----------------------------------------- */}
                    {openDelet && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                                <div className="flex items-start">
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Delete plan</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Are you sure you want to delete price plan?
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end space-x-2">
                                    <button onClick={removePlan} className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer">
                                        Delete Plan
                                    </button>
                                    <button onClick={handleCancelDelete} className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-100 cursor-pointer">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">productName</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">monthly price </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">yearly price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">currency</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Popular</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Visible</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {productAndPlan.map(product =>
                                    product.planId.map(plan => (
                                        <tr key={plan._id}>
                                            <td className="md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.productName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.pricing?.monthly?.price ?? 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.pricing?.yearly?.price ?? 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.currency}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500  ">{plan.isPopular ? <TiTick className='text-green-500' /> : <RxCross2 className='text-red-600' />}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">{plan.isVisible ? <TiTick className='text-green-500' /> : <RxCross2 className='text-red-600' />}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-4 justify-center">
                                                <button onClick={() => handelPlanClick(plan._id)}><FaEdit className='text-blue-600 cursor-pointer' /></button>
                                                <button onClick={() => handleDeleteClick(plan._id)}> <ImBin2 className='text-red-600 cursor-pointer' /></button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingPlan
