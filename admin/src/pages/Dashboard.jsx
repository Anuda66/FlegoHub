import React, { useState } from 'react';
import { useSidebar } from '../context/SidebarContext';

const Dashboard = () => {

  const { isOpen } = useSidebar();



  return (
    <div className='bg-slate-50 min-h-screen'>
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 ">
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-500 cursor-pointer hover:shadow-xl ">
              <h3 className="text-blue-500 text-sm font-medium">Total Users</h3>
              <p className="text-blue-600 text-2xl font-semibold mt-2 ">1,234</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-500 cursor-pointer hover:shadow-xl">
              <h3 className="text-green-500 text-sm font-medium">Total Users</h3>
              <p className="text-green-600 text-2xl font-semibold mt-2 ">1,234</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg shadow-lg border border-purple-500 cursor-pointer hover:shadow-xl">
              <h3 className="text-purple-500 text-sm font-medium">Total Users</h3>
              <p className="text-purple-600 text-2xl font-semibold mt-2 ">1,234</p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg shadow-lg border border-red-500 cursor-pointer hover:shadow-xl">
              <h3 className="text-red-500 text-sm font-medium">Total Users</h3>
              <p className="text-red-600 text-2xl font-semibold mt-2 ">1,234</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2,].map((item) => (
                    <tr key={item}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">User logged in</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">user{item}@example.com</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item} hour ago</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;