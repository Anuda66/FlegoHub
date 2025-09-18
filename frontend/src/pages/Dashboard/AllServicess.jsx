<<<<<<< HEAD
import React, { useContext } from 'react'
import { useSidebar } from '../../context/SidebarContext';
import { AppContext } from '../../context/appContext';
import { Link } from 'react-router-dom';

function AllServicess() {

  const { productAndPalan } = useContext(AppContext)
  const { isOpen } = useSidebar();

  return (
    <div className='bg-slate-100 min-h-screen'>
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
        <h1 className="text-2xl font-bold mb-6">All Servicess</h1>

        <div className="bg-white p-6 rounded-lg shadow-sm">

          <div className='my-8'>
            <input className='border border-gray-400 py-1 px-2 w-full rounded-md' type="text" placeholder='Search' />
          </div>


          {/* render product-----------------------------------------------------------------------------------  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {
              productAndPalan.map((item, index) => (
                <div key={index} className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200'>
                  <div className="p-6">
                    <img className="max-h-48" src={item.images[0]} alt='' />
                    <h3 className="font-semibold text-lg py-2">{item.productName}</h3>
                    <div className="mt-6 flex justify-end">
                      <Link to={`/allservicess/${item._id}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-800">
                        Visit App
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
=======
import React from 'react'
import { useSidebar } from '../../context/SidebarContext';


function AllServicess() {

    const { isOpen } = useSidebar();

  return (
    <div  className='bg-slate-100'>
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
        <h1 className="text-2xl font-bold mb-6">All Servicess</h1>
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
      </div>
    </div>
  )
}

export default AllServicess
