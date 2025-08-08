import React, { useContext, useState } from 'react';
import { useSidebar } from '../context/SidebarContext';
import { FaUserPlus } from "react-icons/fa6";
import AddUser from '../components/Forms/AddUser';
import { ImCross } from "react-icons/im";
import { AppContext } from '../context/AppContext';

const Users = () => {

  const { users } = useContext(AppContext)

  const { isOpen } = useSidebar();
  const [open, setOpen] = useState(false);
  const [openDelet, setOpenDelet] = useState(false)


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

        {/* Add user form popup model ---------------------------------------------------------------------------*/}
        {
          open && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className=" ">
                  <div className="ml-4">
                    <div className='flex justify-between items-center'>
                      <h3 className="text-lg font-medium text-gray-900">Add new user</h3>
                      <button className='cursor-pointer hover:text-red-700' onClick={() => setOpen(false)}><ImCross /></button>
                    </div>
                    <div>
                      <AddUser />
                    </div>
                  </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.NIC}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                    <button className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer hover:bg-blue-50 px-2 py-1 rounded-sm">Edit</button>
                    <button onClick={() => setOpenDelet(true)} className="text-red-600 hover:text-red-500 cursor-pointer hover:bg-red-50 px-2 py-1 rounded-sm">Delete</button>
                  </td>
                </tr>

              ))}
            </tbody>
            {/* Delete user popup model ---------------------------------------------------------------------------*/}
            {
              openDelet && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                    <div className="flex items-start">

                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Delete user</h3>
                        <p className="mt-2 text-sm text-gray-600">
                          Are you sure you want to delete user account?
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-2">
                      <button onClick={() => setOpenDelet(false)} className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer">
                        Delete User
                      </button>
                      <button onClick={() => setOpenDelet(false)} className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-100 cursor-pointer">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;