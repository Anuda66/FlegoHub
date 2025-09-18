import React from 'react'
import { useSidebar } from '../context/SidebarContext';
import { MdBookmarkAdd } from "react-icons/md";

function Subscriptions() {

    const { isOpen } = useSidebar();

    return (
        <div className='bg-slate-50 min-h-screen'>
            <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
                <h1 className="text-2xl font-bold mb-6">Subscriptions Management</h1>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">All Subscriptions</h2>
                        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
                            <MdBookmarkAdd />Add Subscriptions
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Subscriptions
