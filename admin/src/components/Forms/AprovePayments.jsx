import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { backendUrl } from '../../App'
import axios from 'axios';

function AprovePayments({ selectPaymentID, aToken }) {

    const [status, setStatus] = useState({});

    const updatePaymentStatus = async () => {
        try {

            const updates = {
                status: status.status,
                notes: status.notes,
            }
            const response = await axios.post(backendUrl + `/api/bankSlipPayment/spayments/${selectPaymentID}`, updates, { headers: { aToken } })

            if (response.data.success) {
                toast.success(response.data.message)
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

    return (
        <div>
            <h1 className='mt-2'>Aprove / Rejecte Payments : </h1>
            <select className="w-full p-1 border rounded border-zinc-300 mt-2" onChange={(e) => setStatus(e.target.value)} value={status.notes} required >
                <option value=""> Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>
            <p>Note : (If reject) </p>
            <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" onChange={(e) => setStatus(e.target.value)} value={status.notes} placeholder='Enter reason of rejection payment' />
            <div className='flex justify-end space-x-2'>
                <button className='mt-5 px-8 py-2 rounded-md cursor-pointer  bg-accent hover:bg-yellow-400  hover:shadow-md ' onClick={updatePaymentStatus}>Update  </button>
            </div>
        </div>
    )
}

export default AprovePayments
