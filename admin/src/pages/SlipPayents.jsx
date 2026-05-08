import React, { useEffect, useState } from 'react'
import { useSidebar } from '../context/SidebarContext';
import { MdBookmarkAdd } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';
import { ImCross } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import AprovePayments from '../components/Forms/AprovePayments';
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa6";

function SlipPayents({ aToken }) {

    const { isOpen } = useSidebar();
    const [pendingPayments, setPendingPayments] = useState([]);
    const [approvedPayments, setApprovedPayments] = useState([]);
    const [rejectedPayments, setRejectedPayments] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectPaymentID, setSelectPaymentID] = useState(null);
    const [statusCounts, setStatusCounts] = useState([])

    const [activeTab, setActiveTab] = useState("tab1");
    const tabs = [
        { id: "tab1", label: "Pending " },
        { id: "tab2", label: "Approved " },
        { id: "tab3", label: "Rejected " }
    ];

    // get payment status counts for stats cards-------------------------------------------------------------------
    const fetcPaymentStatusCounts = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/bankSlipPayment/status-counts', { headers: { aToken } })
            setStatusCounts(data.data);
            //console.log(data);
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        fetcPaymentStatusCounts();
    }, [])

    // get all pending payments for admin view-------------------------------------------------------------------
    const fetcPendingPayments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/bankSlipPayment/pendings', { headers: { aToken } })
            setPendingPayments(data);
            //console.log(length.data);
            //console.log(data);
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        fetcPendingPayments();
    }, [])

    // get all approved payments for admin view-------------------------------------------------------------------
    const fetcApprovedPayments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/bankSlipPayment/approved', { headers: { aToken } })
            // console.log(data);
            setApprovedPayments(data);
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        fetcApprovedPayments();
    }, []);

    // get all approved payments for admin view-------------------------------------------------------------------
    const fetcRejectedPayments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/bankSlipPayment/rejected', { headers: { aToken } })
            setRejectedPayments(data);
            // console.log(data);
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        fetcRejectedPayments();
    }, []);


    const handelPaymentClick = (paymentID) => {
        //console.log(paymentID);
        setOpenUpdate(true);
        setSelectPaymentID(paymentID)
    }

    const tabContent = {
        tab1: (
            <div className=''>
                {/*  update paln form popup modal (approve or reject ) ---------------------------------------------- */}
                {openUpdate && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 ">
                            <div className=" ">
                                <div className="ml-4">
                                    <div className='flex justify-between items-center'>
                                        <h3 className="text-lg font-medium text-gray-900">Update Status</h3>
                                        <button onClick={() => setOpenUpdate(false)} className='cursor-pointer hover:text-red-700' ><ImCross /></button>
                                    </div>
                                    <div >
                                        <AprovePayments selectPaymentID={selectPaymentID} aToken={aToken} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }

                {/* data mapping on table------------------------------------------------------------------------------ */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Cycle</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slip</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {pendingPayments.map((item) => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{item.userId.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.userId.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">{item.productId.productName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.planId.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.billingCycle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm "><samp className='bg-orange-100 text-orange-500 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full'>{item.status}</samp></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {item.paymentAmount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.paymentDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={item.image} alt="Subscription Image" className="h-10 w-10 object-cover rounded cursor-pointer" onClick={() => setSelectedImage(item.image)} />
                                    </td>
                                    <td className='px-10 py-4 whitespace-nowrap text-sm'>
                                        <button onClick={() => handelPaymentClick(item._id)} ><FaEdit className='text-blue-600 cursor-pointer' /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedImage && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75" onClick={() => setSelectedImage(null)}>
                            <div className="bg-white p-4 rounded-lg relative max-w-3xl max-h-[80vh] overflow-auto">
                                <div className='flex justify-between items-center'>
                                    <h3 className="text-lg font-medium text-gray-900">Bank Slip</h3>
                                    <button className="cursor-pointer hover:text-red-700" onClick={() => setSelectedImage(null)}>
                                        <ImCross />
                                    </button>
                                </div>
                                <img src={selectedImage} alt="Enlarged Subscription Image" className="max-w-full max-h-[70vh] object-contain" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        ),
        tab2: (
            <div>
                <div className="">
                    {/*  update paln form popup modal (approve or reject ) ---------------------------------------------- */}
                    {openUpdate && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 ">
                                <div className=" ">
                                    <div className="ml-4">
                                        <div className='flex justify-between items-center'>
                                            <h3 className="text-lg font-medium text-gray-900">Update Status</h3>
                                            <button onClick={() => setOpenUpdate(false)} className='cursor-pointer hover:text-red-700' ><ImCross /></button>
                                        </div>
                                        <div >
                                            <AprovePayments selectPaymentID={selectPaymentID} aToken={aToken} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                    {/* data mapping on table------------------------------------------------------------------------------ */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Cycle</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slip</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {approvedPayments.map((item) => (
                                    <tr key={item._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{item.userId.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.userId.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold ">{item.productId.productName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.planId.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.billingCycle}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm "><samp className='bg-green-200 text-green-700 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full'>{item.status}</samp></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {item.paymentAmount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.paymentDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={item.image} alt="Subscription Image" className="h-10 w-10 object-cover rounded cursor-pointer" onClick={() => setSelectedImage(item.image)} />
                                        </td>
                                        <td className='px-10 py-4 whitespace-nowrap text-sm'>
                                            <button onClick={() => handelPaymentClick(item._id)} ><FaEdit className='text-blue-600 cursor-pointer' /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {selectedImage && (
                            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75" onClick={() => setSelectedImage(null)}>
                                <div className="bg-white p-4 rounded-lg relative max-w-3xl max-h-[80vh] overflow-auto">
                                    <div className='flex justify-between items-center'>
                                        <h3 className="text-lg font-medium text-gray-900">Bank Slip</h3>
                                        <button className="cursor-pointer hover:text-red-700" onClick={() => setSelectedImage(null)}>
                                            <ImCross />
                                        </button>
                                    </div>
                                    <img src={selectedImage} alt="Enlarged Subscription Image" className="max-w-full max-h-[70vh] object-contain" />
                                </div>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        ),
        tab3: (
            <div>
                <div className="">
                    {/*  update paln form popup modal (approve or reject ) ---------------------------------------------- */}
                    {openUpdate && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 ">
                                <div className=" ">
                                    <div className="ml-4">
                                        <div className='flex justify-between items-center'>
                                            <h3 className="text-lg font-medium text-gray-900">Update Status</h3>
                                            <button onClick={() => setOpenUpdate(false)} className='cursor-pointer hover:text-red-700' ><ImCross /></button>
                                        </div>
                                        <div >
                                            <AprovePayments selectPaymentID={selectPaymentID} aToken={aToken} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                    {/* data mapping on table------------------------------------------------------------------------------ */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Cycle</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slip</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {rejectedPayments.map((item) => (
                                    <tr key={item._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{item.userId.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.userId.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold ">{item.productId.productName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.planId.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.billingCycle}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm "><samp className='bg-red-200 text-red-700 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full'>{item.status}</samp><br></br><span className='text-xs'>{item.notes}</span> </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {item.paymentAmount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.paymentDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={item.image} alt="Subscription Image" className="h-10 w-10 object-cover rounded cursor-pointer" onClick={() => setSelectedImage(item.image)} />
                                        </td>
                                        <td className='px-10 py-4 whitespace-nowrap text-sm'>
                                            <button onClick={() => handelPaymentClick(item._id)} ><FaEdit className='text-blue-600 cursor-pointer' /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {selectedImage && (
                            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75" onClick={() => setSelectedImage(null)}>
                                <div className="bg-white p-4 rounded-lg relative max-w-3xl max-h-[80vh] overflow-auto">
                                    <div className='flex justify-between items-center'>
                                        <h3 className="text-lg font-medium text-gray-900">Bank Slip</h3>
                                        <button className="cursor-pointer hover:text-red-700" onClick={() => setSelectedImage(null)}>
                                            <ImCross />
                                        </button>
                                    </div>
                                    <img src={selectedImage} alt="Enlarged Subscription Image" className="max-w-full max-h-[70vh] object-contain" />
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        ),
    };

    return (
        <div className='bg-slate-50 min-h-screen'>
            <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
                <h1 className="text-2xl font-bold mb-6">Slip Payment Management</h1>
                <div className="bg-white p-6 rounded-lg shadow-sm">

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Payment Status </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {/* Stats Cards----------------------------------------------------------------------- */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-gray-500 text-sm font-medium">Pending Payment</h3>
                                <p className="text-2xl font-semibold mt-2">{statusCounts.pending}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-gray-500 text-sm font-medium">Approved Payment</h3>
                                <p className="text-2xl font-semibold mt-2">{statusCounts.approved}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-gray-500 text-sm font-medium">Rejected Payment</h3>
                                <p className="text-2xl font-semibold mt-2">{statusCounts.rejected}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">All Payment Datils </h2>
                    </div>

                    <div className='my-8'>
                        <input className='border border-gray-400 py-1 px-2 w-full rounded-md' type="text" placeholder='Search' />
                    </div>




                    <div>
                        <div className=''>
                            <div >
                                <div className="container mx-auto ">
                                    <div className="flex mb-4 border-b ">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                className={`px-4 py-2 mx-1 cursor-pointer ${activeTab === tab.id
                                                    ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "
                                                    : "text-gray-500 rounded-full border-1"
                                                    }`}
                                                onClick={() => setActiveTab(tab.id)}>
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-4">{tabContent[activeTab]}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlipPayents
