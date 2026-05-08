import React, { useContext, useEffect, useState } from 'react'
import { useSidebar } from '../../context/SidebarContext';
import { AppContext } from '../../context/appContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ImCross } from "react-icons/im";

function PaymentHistory() {

  const { isOpen, setIsOpen } = useSidebar();
  const { token, backendUrl } = useContext(AppContext)
  const [paymentHistory, setPaymentHistory] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);

  // Get user payment history--------------------------------------
  const fetchPaymentHistory = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/paymentHistory', { headers: { token } })
      setPaymentHistory(data.data)
      console.log(data);
    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchPaymentHistory()
  }, [])

  return (
    <div className='bg-slate-50 min-h-screen'>
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
        <h1 className="text-2xl font-bold mb-6"> Payment History</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl">Payment Details</h2>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Cycle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slip</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    paymentHistory.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(item.paymentDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.productId.productName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.planId.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.billingCycle}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">RS {item.paymentAmount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'pending' || item.status === 'rejected' ? 'bg-red-100 text-red-800'  : 'bg-green-100 text-green-800'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
                          <img src={item.image} alt="Subscription Image" className="h-10 w-10 object-cover rounded cursor-pointer" onClick={() => setSelectedImage(item.image)} />
                        </td>
                      </tr>
                    ))
                  }
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

    </div>
  )
}

export default PaymentHistory
