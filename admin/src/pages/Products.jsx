import React, { useContext, useState } from 'react';
import { FaUserPlus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import AddProduct from '../components/Forms/AddProduct';


const Products = ({aToken}) => {

  const [open, setOpen] = useState(false);
  const [openDelet, setOpenDelet] = useState(false)

  return (
    <div className="ml-64 mt-16 p-6">
      <h1 className="text-2xl font-bold mb-6">Products Management</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Product</h2>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
          <FaUserPlus /> Add Product
        </button>
      </div>

      {/* Add Product form popup model ---------------------------------------------------------------------------*/}
      {
        open && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
              <div className=" ">
                <div className="ml-4">
                  <div className='flex justify-between items-center'>
                    <h3 className="text-lg font-medium text-gray-900">Add new Product</h3>
                    <button className='cursor-pointer hover:text-red-700' onClick={() => setOpen(false)}><ImCross /></button>
                  </div>
                  <div>
                     <AddProduct aToken={aToken} /> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[1, 2].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Product Image {item}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Product {item}</h3>
              <p className="text-gray-600 mt-1">$ {(item * 19.99).toFixed(2)}</p>
              <div className="flex justify-end items-center mt-4">
                <div>
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button onClick={() => setOpenDelet(true)} className="text-red-600 hover:text-red-800">Delete</button>
                </div>
                {/* Delete user popup model ---------------------------------------------------------------------------*/}
                {
                  openDelet && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
                      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <div className="flex items-start">

                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">Delete product</h3>
                            <p className="mt-2 text-sm text-gray-600">
                              Are you sure you want to delete product?
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;