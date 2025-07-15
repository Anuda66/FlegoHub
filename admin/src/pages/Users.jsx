import React, { useState } from 'react';
import { useSidebar } from '../context/SidebarContext';
import { FaUserPlus } from "react-icons/fa6";


const Users = () => {

  const { isOpen } = useSidebar();
  const [open, setOpen] = useState(false);

  return (
    <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6`}>
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Users</h2>
          <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
            <FaUserPlus /> Add User
          </button>
        </div>

        {/* Add user form ---------------------------------------------------------------------------*/}
        {
          open && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Add new user</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Are you sure you want to deactivate your account? All of your data will be permanently removed.
                      This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                  <button onClick={() => setOpen(false)} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 cursor-pointer">
                    Deactivate
                  </button>
                  <button onClick={() => setOpen(false)} className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-100 cursor-pointer">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )
        }



        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIC</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicess</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">User {item}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">user{item}@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item === 1 ? 'Admin' : 'User'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item % 2 === 0 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;