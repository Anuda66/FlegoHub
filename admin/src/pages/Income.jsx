import React, { useEffect, useState } from 'react'
import { useSidebar } from '../context/SidebarContext';
import { MdBookmarkAdd } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';

function Income() {

    const { isOpen } = useSidebar();

    const [incomeDetails, setIncomeDetails] = useState({});
    const [productWiseData, setProductWiseData] = useState([]);
    const [monthlyIncomeData, setMonthlyIncomeData] = useState([]);
    const [previousMonthIncome, setPreviousMonthIncome] = useState({});
    const [currentMonthIncome, setCurrentMonthIncome] = useState({});

    // get Income details---------------------------------------------------------]
    const getIncomeDetails = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/income/total')
            setIncomeDetails(data);
            setProductWiseData(data.productWise);
            // console.log(data);
            // console.log(data.productWise);
        }
        catch (error) {
            console.error(error);
            toast.error(error.massage);
        }
    }
    useEffect(() => {
        getIncomeDetails();
    }, []);

    // get current month income details---------------------------------------------------------]
    const getCurrentMonthIncomeDetails = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/income/currentMonth')
            setCurrentMonthIncome(data);
            console.log(data);
        }
        catch (error) {
            console.error(error);
            toast.error(error.massage);
        }
    }

    useEffect(() => {
        getCurrentMonthIncomeDetails();
    }, []);

    // get monthly income details---------------------------------------------------------]
    const getMonthlyIncomeDetails = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/income/monthlyIncome')
            setMonthlyIncomeData(data.data);
            // console.log(monthlyIncomeData);
        }
        catch (error) {
            console.error(error);
            toast.error(error.massage);
        }
    }
    useEffect(() => {
        getMonthlyIncomeDetails();
    }, []);

    // get previous month income details---------------------------------------------------------]
    const getPreviousMonthIncomeDetails = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/income/previousMonth')
            setPreviousMonthIncome(data);
            //console.log(previousMonthIncome);

        }
        catch (error) {
            console.error(error);
            toast.error(error.massage);
        }
    }
    useEffect(() => {
        getPreviousMonthIncomeDetails();
    }, []);

    return (
        <div className='bg-slate-50 min-h-screen'>
            <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
                <h1 className="text-2xl font-bold mb-6">Income Management</h1>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                        <h2 className="text-xl font-semibold">This Month Total Income</h2>
                    </div>
                    <hr className="border-gray-300 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 ">
                        {/* Stats Cards----------------------------------------------------------------------- */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-gray-500 text-sm font-medium">This Month Income</h3>
                            <p className="text-green-500 text-sm font-medium mt-2">
                                Grand Total for <span className='text-gray-700'> {
                                    currentMonthIncome?.period?.month && currentMonthIncome?.period?.year
                                        ? `${new Date(currentMonthIncome.period.year, currentMonthIncome.period.month - 1).toLocaleString('default', { month: 'long' })} ${currentMonthIncome.period.year}`
                                        : 'N/A'
                                } </span>
                            </p>
                            <div className='flex flex-row gap-3 justify-between'>
                                <p className="text-2xl font-semibold mt-2">RS {currentMonthIncome.grandTotal}</p>
                                <p className="text-xl font-semibold mt-2 text-green-500"> <span className='text-sm text-gray-400 '> Users  </span>{currentMonthIncome.totalPayments} </p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-gray-500 text-sm font-medium">Last Month Income</h3>
                            <p className="text-green-500 text-sm font-medium mt-2">
                                Grand Total for <span className='text-gray-700'> {
                                    previousMonthIncome?.period?.month && previousMonthIncome?.period?.year
                                        ? `${new Date(previousMonthIncome.period.year, previousMonthIncome.period.month - 1).toLocaleString('default', { month: 'long' })} ${previousMonthIncome.period.year}`
                                        : 'N/A'
                                } </span>
                            </p>
                            <div className='flex flex-row gap-3 justify-between'>
                                <p className="text-2xl font-semibold mt-2">RS {previousMonthIncome.totalIncome}</p>
                                <p className="text-xl font-semibold mt-2 text-green-500"> <span className='text-sm text-gray-400 '> Users  </span>{previousMonthIncome.totalPayments} </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center mb-4">
                        <h2 className="text-xl font-semibold">Product Wise Income</h2>
                    </div>
                    <hr className="border-gray-300 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 ">
                        {currentMonthIncome.productWise?.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
                                <h3 className="text-gray-500 text-sm font-medium mb-2">This Month Income</h3>
                                <h3 className=" text-sm font-medium text-green-500">
                                    {item.product.productName}
                                </h3>
                                <div className='flex flex-row gap-3 justify-between'>
                                    <p className="text-2xl font-semibold mt-2">
                                        RS {item.totalAmount}
                                    </p>
                                    <p className="text-xl font-semibold mt-2 text-green-500">
                                        <span className='text-sm text-gray-400 font-light'>Users</span> {item.paymentCount}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center mb-4">
                        <h2 className="text-sm font-semibold">All Time Product Wise Ernings</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 ">
                        {productWiseData.map((item, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-4">
                                <h3 className="text-gray-500 text-sm font-medium"> {item.product.productName}</h3>
                                <div className='flex flex-row gap-3 justify-between'>
                                    <p className="text-sm font-semibold mt-2">RS {item.totalAmount}</p>
                                    <p className="text-sm font-semibold mt-2 text-green-500"> <samp className='text-sm text-gray-400 font-light'>Users</samp> {item.paymentCount}</p>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    <div className="flex items-center mb-4">
                        <h2 className="text-xl font-semibold">Monthly Income For All Product</h2>
                    </div>
                    <hr className="border-gray-300 mb-6" />

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">payment Count</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    monthlyIncomeData.map((item, index) => {
                                        // Get month name from month number
                                        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                        const monthName = monthNames[item._id.month - 1];
                                        return (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{monthName} {item._id.year}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">RS {item.totalAmount.toLocaleString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">{item.paymentCount}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Income
