import React, { useEffect, useState } from 'react';
import { useSidebar } from '../context/SidebarContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Dashboard = ({ aToken }) => {

  const { isOpen } = useSidebar();
  const [statusCounts, setStatusCounts] = useState([])
  const [userCount, setUserCount] = useState([])
  const [productCount, setProductCount] = useState([]);
  const [previousMonthIncome, setPreviousMonthIncome] = useState({});
  const [incomeDetails, setIncomeDetails] = useState({});
  const [currentMonthIncome, setCurrentMonthIncome] = useState({});

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

  //get totoal users-----------------------------------------------------------
  const fetchUserCount = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/userList')
      //console.log(response.data);

      if (response.data.success) {
        setUserCount(response.data.stats);
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
  useEffect(() => {
    fetchUserCount()
  }, [])
  //get totoal products-----------------------------------------------------------
  const fetchProductCount = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      //console.log(response.data);

      if (response.data.success) {

        setProductCount(response.data.stats)
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
  useEffect(() => {
    fetchProductCount()
  }, [])

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

  // get Income details---------------------------------------------------------]
  const getIncomeDetails = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/income/total')
      setIncomeDetails(data);
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
      //console.log(data);
    }
    catch (error) {
      console.error(error);
      toast.error(error.massage);
    }
  }

  useEffect(() => {
    getCurrentMonthIncomeDetails();
  }, []);


  return (
    <div className='bg-slate-50 min-h-screen'>
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        <div className="bg-white p-6 rounded-lg shadow-sm">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Overview  </h2>
          </div>
          <hr className='mb-5 border-gray-300' />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 ">

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
              <p className="text-2xl font-semibold mt-2">{userCount.totalUsers}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium">Total Product</h3>
              <p className="text-2xl font-semibold mt-2">{productCount.totalProduct}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Last Month Total Income </h2>
          </div>
          <hr className='mb-5 border-gray-300' />

          {/* pending payment status------------------------------------------------------------- */}
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

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Pending Payment </h2>
          </div>
          <hr className='mb-5 border-gray-300' />

          {/* pending payment status------------------------------------------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 ">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium">Pending Payment</h3>
              <p className="text-2xl font-semibold mt-2">{statusCounts.pending}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;