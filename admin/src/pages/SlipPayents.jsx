import React, { useEffect, useState } from 'react'
import { useSidebar } from '../context/SidebarContext';
import { MdBookmarkAdd } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';
import { ImCross } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import AprovePayments from '../components/Forms/AprovePayments';


function SlipPayents({ aToken }) {

    const { isOpen } = useSidebar();
    const [pendingPayments, setPendingPayments] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectPaymentID, setSelectPaymentID] = useState(null);

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

    const handelPaymentClick = (paymentID) => {
        //console.log(paymentID);
        setOpenUpdate(true);
        setSelectPaymentID(paymentID)
    }

    return (
        <div className='bg-slate-50 min-h-screen'>
            <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
                <h1 className="text-2xl font-bold mb-6">Slip Payment Management</h1>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">All Pending Payment </h2>
                    </div>

                    <div className='my-8'>
                        <input className='border border-gray-400 py-1 px-2 w-full rounded-md' type="text" placeholder='Search' />
                    </div>


                    {/*  update paln form popup modal---------------------------------------------- */}
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{item.productId.productName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.planId.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.billingCycle}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm "><samp className='bg-orange-100 text-orange-500 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'>{item.status}</samp></td>
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
        </div>
    )
}

export default SlipPayents
