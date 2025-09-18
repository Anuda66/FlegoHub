<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { ImCross } from "react-icons/im";
import AddProduct from '../components/Forms/AddProduct';
import { Link } from 'react-router-dom';
import { backendUrl } from '../App';
import { useSidebar } from '../context/SidebarContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiFillProduct } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import UpdateProduct from '../components/Forms/UpdateProduct';

const Products = ({ aToken }) => {

  const { isOpen } = useSidebar();
  const [open, setOpen] = useState(false);
  const [openDelet, setOpenDelet] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productList, setProductList] = useState([]);
  const [stats, setStats] = useState([])
  const [selectProcut, setSelectProduct] = useState(null)

  const fetchProductList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      //console.log(response.data);

      if (response.data.success) {
        setProductList(response.data.product)
        setStats(response.data.stats)
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

  // get product Id when click icon and pass product Id to popup model
  const handelProductClick = (priductId) => {
    setOpenUpdate(true)
    setSelectProduct(priductId)
    console.log(selectProcut);
  }

  const removeProduct = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id: selectedProductId }, { headers: { aToken } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchProductList()
        setOpenDelet(false)
        setSelectedProductId(null)
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

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setOpenDelet(true);
  }

  const handleCancelDelete = () => {
    setOpenDelet(false);
    setSelectedProductId(null);
  }

  useEffect(() => {
    fetchProductList()
  }, [])

  return (
    <div className='bg-slate-50 min-h-screen'>
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
        <h1 className="text-2xl font-bold mb-6">Products Management</h1>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Product</h2>
            <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
              <AiFillProduct /> Add Product
            </button>
          </div>

          <div className='bg-green-100 px-3 py-3 rounded-md border border-green-300'>
            <p className='text-lg text-gray-700 font-semibold'>Total Product : {stats.totalProduct}</p>
          </div>

          <div className='my-8'>
            <input className='border border-gray-400 py-1 px-2 w-full rounded-md' type="text" placeholder='Search' />
          </div>

          {/* Add Product form popup modal---------------------------------------------- */}
          {open && (
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
=======
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
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
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
          )}

          {/* Update Product popup modal---------------------------------------------- */}
          {openUpdate && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 bg-opacity-75">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
                <div className=" ">
                  <div className="ml-4">
                    <div className='flex justify-between items-center'>
                      <h3 className="text-lg font-medium text-gray-900">Update Product</h3>
                      <button className='cursor-pointer hover:text-red-700' onClick={() => setOpenUpdate(false)}><ImCross /></button>
                    </div>
                    <div>
                      <UpdateProduct aToken={aToken} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete product popup modal - moved outside of product loop----------------- */}
          {openDelet && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-opacity-75 bg-black/30">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex items-start">
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Delete product</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Are you sure, you want to delete this product?
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button onClick={removeProduct} className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer">
                    Delete
                  </button>
                  <button onClick={handleCancelDelete} className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-100 cursor-pointer">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {productList.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Link to={`/products/${item._id}`} className="h-48 bg-gray-200 flex items-center justify-center">
                  <img className='max-h-48' src={item.images[0]} alt="" />
                </Link>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{item.productName}</h3>
                  <div className="flex justify-end items-center mt-4">
                    <div className='flex gap-4'>
                      <button onClick={() => handelProductClick(item._id)} ><FaEdit className='text-blue-600 cursor-pointer' /></button>
                      <button onClick={() => handleDeleteClick(item._id)} ><ImBin2 className='text-red-600 cursor-pointer' /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;