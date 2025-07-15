import React, { useState } from 'react';
import { useSidebar } from '../context/SidebarContext';

const Dashboard = () => {

  const { isOpen } = useSidebar();

  return (
    <div className='bg-slate-100'>
    <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
      
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Stats Cards */}
        {['Total Users', 'Revenue', 'Orders', 'Products'].map((title, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-semibold mt-2">1,234</p>
            <p className="text-green-500 text-xs mt-2">+12% from last month</p>
          </div>
        ))}
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
              {[1, 2, 3, 4, 5].map((item) => (
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
              {[1, 2, 3, 4, 5].map((item) => (
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
  );
};

export default Dashboard;