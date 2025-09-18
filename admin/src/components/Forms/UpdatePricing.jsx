import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify'
import { IoIosRemoveCircle } from "react-icons/io";
import { MdCheckBox } from "react-icons/md";
import { ImCross } from "react-icons/im";

function UpdatePricing({ selectPlan, aToken }) {

    const [isEdit, setIsEdit] = useState(false)
    const [planData, setPlanData] = useState({})

    const getSinglePlan = async () => {
        try {
            const response = await axios.get(backendUrl + `/api/plan/singlePlan/${selectPlan}`)
            if (response.data.success) {
                setPlanData(response.data.data)
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
        getSinglePlan()
    }, [selectPlan])

    const updatePlanData = async () => {
        try {
            const updates = {
                name: planData.name,
                description: planData.description,
                pricing: planData.pricing,
                currency: planData.currency,
                features: planData.features.filter(feature => feature.trim() !== ''),
                isPopular: planData.isPopular,
                isVisible: planData.isVisible
            };

            const response = await axios.post(backendUrl + `/api/plan/update/${selectPlan}`, updates, { headers: { aToken } })

            if (response.data.success) {
                toast.success(response.data.message)
                await getSinglePlan()
                setIsEdit(false)
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
        <div className='overflow-y-auto' style={{ maxHeight: '80vh' }}>
            <div className='grid grid-cols-[1fr_3fr] gap-y-5 mt-3 '>
                <p>Plan Name :</p>
                {
                    isEdit
                        ? <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" onChange={e => setPlanData(prev => ({ ...prev, name: e.target.value }))} value={planData.name || ''} />
                        : <p className='p-1 mt-1 border rounded border-zinc-300'>{planData.name}</p>
                }

                <p> Description :</p>
                {
                    isEdit
                        ? <textarea className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" onChange={e => setPlanData(prev => ({ ...prev, description: e.target.value }))} value={planData.description || ''} />
                        : <p className='p-1 mt-1 border rounded border-zinc-300'>{planData.description}</p>
                }

                <p>Monthly Price : </p>
                {
                    isEdit
                        ? <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="number" onChange={e => setPlanData(prev => ({ ...prev, pricing: { ...prev.pricing, monthly: { ...prev.pricing?.monthly || {}, price: parseFloat(e.target.value) || 0 } } }))}
                            value={planData.pricing?.monthly?.price || 0} />
                        : <p className='p-1 mt-1 border rounded border-zinc-300'><span>{planData.currency}</span> {planData.pricing?.monthly?.price?.toLocaleString() || 'N/A'} </p>
                }

                <p>Yearly Price : </p>
                {
                    isEdit
                        ? <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="number" onChange={e => setPlanData(prev => ({ ...prev, pricing: { ...prev.pricing, yearly: { ...prev.pricing?.yearly || {}, price: parseFloat(e.target.value) || 0 } } }))}
                            value={planData.pricing?.yearly?.price || 0} />
                        : <p className='p-1 mt-1 border rounded border-zinc-300'><span>{planData.currency}</span> {planData.pricing?.yearly?.price?.toLocaleString() || 'N/A'}</p>
                }

                <p>Features : </p>
                {
                    isEdit
                        ? <div>
                            {planData.features?.map((feature, index) => (
                                <div key={index} className="flex mb-2">
                                    <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" value={feature} onChange={e => setPlanData(prev => ({ ...prev, features: prev.features.map((f, i) => (i === index ? e.target.value : f)), }))} placeholder="Enter a feature" />
                                    {planData.features.length > 1 && (
                                        <button type="button" onClick={() => setPlanData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index), }))}>
                                            <IoIosRemoveCircle className="text-red-500 text-lg cursor-pointer mx-2" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" className="mt-2 px-4 py-1 bg-blue-800 hover:bg-blue-700 text-white rounded cursor-pointer" onClick={() => setPlanData(prev => ({ ...prev, features: [...prev.features, ''], }))}>
                                Add Feature
                            </button>
                        </div>
                        : <ul className='p-1 mt-1 border rounded border-zinc-300'>
                            {planData.features && planData.features.length > 0 ? (
                                planData.features.map((feature, index) => (
                                    <li className='' key={index}>✓ {feature}</li>
                                ))
                            ) : (
                                <li className='text-red-600'>No features available</li>
                            )}
                        </ul>
                }

                <p>Popular Plan : </p>
                {
                    isEdit
                        ? <div>
                            <input type="checkbox" className="mr-2" checked={planData.isPopular || false} onChange={e => setPlanData(prev => ({ ...prev, isPopular: e.target.checked }))} />
                        </div>
                        : <p className=''>{planData.isPopular ? <MdCheckBox className='text-blue-800' /> : <ImCross className='text-blue-800 text-sm' />}</p>
                }

                <p>Plan Visible : </p>
                {
                    isEdit
                        ? <div>
                            <input type="checkbox" className="mr-2" checked={planData.isVisible || false} onChange={e => setPlanData(prev => ({ ...prev, isVisible: e.target.checked }))} />
                        </div>

                        : <p className=''>{planData.isVisible ? <MdCheckBox className='text-blue-800' /> : <ImCross className='text-blue-800 text-sm' />}</p>
                }

            </div>
            <div className='flex justify-end space-x-2'>
                {
                    isEdit
                        ? <div className=''>
                            <button className='mt-5  bg-gray-400 hover:bg-gray-500 text-white  px-8 py-2 rounded-md cursor-pointer hover:shadow-md mr-3 ' onClick={() => setIsEdit(false)}>Cancel</button>
                            <button className='mt-5 px-8 py-2 rounded-md cursor-pointer  bg-accent hover:bg-yellow-400  hover:shadow-md ' onClick={updatePlanData}>Save </button>
                        </div>
                        : <button className='mt-5  bg-primary hover:bg-blue-800 text-white  px-8 py-2 rounded-md cursor-pointer hover:shadow-md ' onClick={() => setIsEdit(true)}>Edit</button>
                }
            </div>

        </div>
    )
}

export default UpdatePricing